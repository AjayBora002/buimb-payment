import { createHmac } from 'node:crypto';
import { prisma as defaultPrisma } from '@buimbpay/database/client';
import { decryptSecret } from '@buimbpay/auth';

export interface WebhookSignatureResult {
  timestamp: number;
  signature: string;
  headerValue: string;
  payloadString: string;
}

/**
 * Sign payload with HMAC-SHA256 according to Stripe / modern webhook conventions.
 * Signature header format: X-BuimbPay-Signature: t=<timestamp>,v1=<signature>
 */
export function signPayload(
  secret: string,
  timestamp: number,
  payload: unknown,
): WebhookSignatureResult {
  const payloadString = typeof payload === 'string' ? payload : JSON.stringify(payload);
  const signedPayload = `${timestamp}.${payloadString}`;
  const signature = createHmac('sha256', secret)
    .update(signedPayload)
    .digest('hex');

  return {
    timestamp,
    signature,
    headerValue: `t=${timestamp},v1=${signature}`,
    payloadString,
  };
}

export interface WebhookHttpResult {
  status: number;
  statusText: string;
  bodyText: string;
  latencyMs: number;
}

/**
 * Dispatches the webhook payload via HTTP POST with a 10s timeout and at most 1 redirect.
 */
export async function postWebhook(
  url: string,
  payloadString: string,
  headers: Record<string, string>,
  options: {
    timeoutMs?: number;
    maxRedirects?: number;
    fetchFn?: typeof fetch;
  } = {},
): Promise<WebhookHttpResult> {
  const { timeoutMs = 10000, maxRedirects = 1, fetchFn = globalThis.fetch } = options;
  const startTime = Date.now();
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    let currentUrl = url;
    let redirectCount = 0;

    let response = await fetchFn(currentUrl, {
      method: 'POST',
      headers,
      body: payloadString,
      signal: controller.signal,
      redirect: 'manual',
    });

    while ([301, 302, 303, 307, 308].includes(response.status)) {
      if (redirectCount >= maxRedirects) {
        throw new Error(`Exceeded maximum allowed redirects (${maxRedirects})`);
      }

      const location = response.headers.get('location');
      if (!location) {
        throw new Error(`Redirect response (${response.status}) missing Location header`);
      }

      currentUrl = new URL(location, currentUrl).toString();
      redirectCount++;

      response = await fetchFn(currentUrl, {
        method: 'POST',
        headers,
        body: payloadString,
        signal: controller.signal,
        redirect: 'error',
      });
    }

    const latencyMs = Math.max(1, Date.now() - startTime);
    const bodyText = await response.text().catch(() => '');

    return {
      status: response.status,
      statusText: response.statusText,
      bodyText,
      latencyMs,
    };
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Core handler to process a single WebhookDelivery job.
 * Look up authoritative endpoint and event data from DB, signs payload, sends HTTP request,
 * and updates DB status accordingly.
 */
export async function processWebhookDelivery(
  deliveryId: string,
  options: {
    prismaClient?: any;
    fetchFn?: typeof fetch;
    timeoutMs?: number;
  } = {},
): Promise<{ status: 'delivered'; httpStatus: number; latencyMs: number }> {
  const prismaClient = options.prismaClient || defaultPrisma;
  const delivery = await prismaClient.webhookDelivery.findUnique({
    where: { id: deliveryId },
    include: {
      endpoint: true,
      webhookEvent: true,
    },
  });

  if (!delivery) {
    throw new Error(`WebhookDelivery not found for id: ${deliveryId}`);
  }

  if (!delivery.endpoint) {
    throw new Error(`WebhookEndpoint not found for delivery: ${deliveryId}`);
  }

  if (!delivery.webhookEvent) {
    throw new Error(`WebhookEvent not found for delivery: ${deliveryId}`);
  }

  const { endpoint, webhookEvent } = delivery;
  const signingKey = decryptSecret(endpoint.secret);
  const timestamp = Math.floor(Date.now() / 1000);
  const { headerValue, payloadString } = signPayload(
    signingKey,
    timestamp,
    webhookEvent.payload,
  );

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'User-Agent': 'BuimbPay-Webhook/1.0',
    'X-BuimbPay-Signature': headerValue,
    'X-BuimbPay-Delivery-Id': delivery.id,
    'X-BuimbPay-Event': webhookEvent.eventType,
  };

  const startTime = Date.now();

  try {
    const httpResult = await postWebhook(endpoint.url, payloadString, headers, {
      timeoutMs: options.timeoutMs ?? 10000,
      maxRedirects: 1,
      fetchFn: options.fetchFn,
    });

    const isSuccess = httpResult.status >= 200 && httpResult.status < 300;

    if (isSuccess) {
      await prismaClient.webhookDelivery.update({
        where: { id: deliveryId },
        data: {
          status: 'DELIVERED',
          httpStatus: httpResult.status,
          responseBody: httpResult.bodyText.slice(0, 4000),
          latencyMs: httpResult.latencyMs,
          deliveredAt: new Date(),
          errorMessage: null,
        },
      });

      return {
        status: 'delivered',
        httpStatus: httpResult.status,
        latencyMs: httpResult.latencyMs,
      };
    } else {
      const errMsg = `Webhook delivery received non-2xx status ${httpResult.status}: ${
        httpResult.bodyText.slice(0, 200) || httpResult.statusText
      }`;

      await prismaClient.webhookDelivery.update({
        where: { id: deliveryId },
        data: {
          status: 'FAILED',
          httpStatus: httpResult.status,
          responseBody: httpResult.bodyText.slice(0, 4000),
          latencyMs: httpResult.latencyMs,
          errorMessage: errMsg.slice(0, 1000),
        },
      });

      throw new Error(errMsg);
    }
  } catch (err: any) {
    // If it was already marked failed because of non-2xx above, avoid double update
    if (!err.message?.startsWith('Webhook delivery received non-2xx status')) {
      const latencyMs = Math.max(1, Date.now() - startTime);
      await prismaClient.webhookDelivery.update({
        where: { id: deliveryId },
        data: {
          status: 'FAILED',
          latencyMs,
          errorMessage: (err.message || 'Unknown network error').slice(0, 1000),
        },
      });
    }

    throw err;
  }
}
