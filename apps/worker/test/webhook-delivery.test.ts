import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import { signPayload, processWebhookDelivery } from '../src/webhook-delivery.js';

describe('Webhook Delivery Worker', () => {
  const mockSecret = 'whsec_test_secret_1234567890abcdef';
  const mockEndpointId = '11111111-1111-1111-1111-111111111111';
  const mockEventId = '22222222-2222-2222-2222-222222222222';
  const mockDeliveryId = '33333333-3333-3333-3333-333333333333';

  describe('HMAC-SHA256 Signature', () => {
    it('computes correct HMAC signature and formats header with timestamp', () => {
      const timestamp = 1758897000;
      const payload = {
        id: 'pi_test_123',
        amount: 50000,
        currency: 'INR',
        status: 'CAPTURED',
      };

      const result = signPayload(mockSecret, timestamp, payload);

      // Verify header structure: t=<ts>,v1=<sig>
      assert.match(result.headerValue, /^t=1758897000,v1=[a-f0-9]{64}$/);
      assert.equal(result.timestamp, timestamp);

      // Verify signature independently
      const expectedPayloadString = JSON.stringify(payload);
      const expectedHmac = createHmac('sha256', mockSecret)
        .update(`${timestamp}.${expectedPayloadString}`)
        .digest('hex');

      assert.equal(result.signature, expectedHmac);
      assert.equal(result.headerValue, `t=${timestamp},v1=${expectedHmac}`);
    });
  });

  describe('Webhook Processing Lifecycle', () => {
    function createMockPrisma(deliveryRecord: any) {
      let currentRecord = { ...deliveryRecord };
      const updates: any[] = [];

      return {
        getRecord: () => currentRecord,
        getUpdates: () => updates,
        webhookDelivery: {
          findUnique: async ({ where }: any) => {
            if (where.id === currentRecord.id) {
              return currentRecord;
            }
            return null;
          },
          update: async ({ where, data }: any) => {
            if (where.id === currentRecord.id) {
              currentRecord = { ...currentRecord, ...data };
              updates.push(data);
              return currentRecord;
            }
            throw new Error(`Record not found for id ${where.id}`);
          },
        },
      };
    }

    const baseDelivery = {
      id: mockDeliveryId,
      endpointId: mockEndpointId,
      webhookEventId: mockEventId,
      status: 'PENDING',
      attemptNumber: 1,
      endpoint: {
        id: mockEndpointId,
        url: 'https://example.com/webhook',
        secret: mockSecret,
        isActive: true,
      },
      webhookEvent: {
        id: mockEventId,
        eventType: 'payment_intent.captured',
        payload: {
          id: 'pi_12345',
          amount: 250000,
          currency: 'INR',
          status: 'CAPTURED',
        },
      },
    };

    it('successfully delivers webhook, verifies headers, updates DB to DELIVERED with real status and latency', async () => {
      const mockPrisma = createMockPrisma(baseDelivery);
      let capturedRequest: { url: string; headers: Record<string, string>; body: string } | null = null;

      const mockFetch: typeof fetch = async (input, init) => {
        const headers = (init?.headers as Record<string, string>) || {};
        capturedRequest = {
          url: input.toString(),
          headers,
          body: (init?.body as string) || '',
        };

        return new Response(JSON.stringify({ received: true }), {
          status: 200,
          statusText: 'OK',
          headers: { 'Content-Type': 'application/json' },
        });
      };

      const result = await processWebhookDelivery(mockDeliveryId, {
        prismaClient: mockPrisma,
        fetchFn: mockFetch,
      });

      assert.equal(result.status, 'delivered');
      assert.equal(result.httpStatus, 200);
      assert.ok(result.latencyMs >= 1);

      // Verify request sent to target
      assert.ok(capturedRequest);
      assert.equal(capturedRequest!.url, 'https://example.com/webhook');
      assert.equal(capturedRequest!.headers['Content-Type'], 'application/json');
      assert.equal(capturedRequest!.headers['User-Agent'], 'BuimbPay-Webhook/1.0');
      assert.equal(capturedRequest!.headers['X-BuimbPay-Delivery-Id'], mockDeliveryId);
      assert.equal(capturedRequest!.headers['X-BuimbPay-Event'], 'payment_intent.captured');

      // Verify signature in header
      const sigHeader = capturedRequest!.headers['X-BuimbPay-Signature'];
      assert.ok(sigHeader, 'X-BuimbPay-Signature header must be present');
      assert.match(sigHeader, /^t=\d+,v1=[a-f0-9]{64}$/);

      // Verify DB update
      const updated = mockPrisma.getRecord();
      assert.equal(updated.status, 'DELIVERED');
      assert.equal(updated.httpStatus, 200);
      assert.ok(updated.deliveredAt instanceof Date);
      assert.ok(updated.latencyMs >= 1);
      assert.equal(updated.responseBody, JSON.stringify({ received: true }));
      assert.equal(updated.errorMessage, null);
    });

    it('marks WebhookDelivery as FAILED and throws when endpoint returns non-2xx (HTTP 500)', async () => {
      const mockPrisma = createMockPrisma(baseDelivery);

      const mockFetch: typeof fetch = async () => {
        return new Response('Internal Server Error', {
          status: 500,
          statusText: 'Internal Server Error',
        });
      };

      await assert.rejects(
        async () => {
          await processWebhookDelivery(mockDeliveryId, {
            prismaClient: mockPrisma,
            fetchFn: mockFetch,
          });
        },
        (err: Error) => {
          assert.match(err.message, /Webhook delivery received non-2xx status 500/);
          return true;
        },
      );

      const updated = mockPrisma.getRecord();
      assert.equal(updated.status, 'FAILED');
      assert.equal(updated.httpStatus, 500);
      assert.equal(updated.responseBody, 'Internal Server Error');
      assert.match(updated.errorMessage, /500/);
      assert.ok(updated.latencyMs >= 1);
    });

    it('marks WebhookDelivery as FAILED and re-throws a retry-eligible error on network failure', async () => {
      const mockPrisma = createMockPrisma(baseDelivery);

      const mockFetch: typeof fetch = async () => {
        throw new TypeError('fetch failed: ECONNREFUSED 127.0.0.1:8080');
      };

      await assert.rejects(
        async () => {
          await processWebhookDelivery(mockDeliveryId, {
            prismaClient: mockPrisma,
            fetchFn: mockFetch,
          });
        },
        (err: Error) => {
          assert.match(err.message, /ECONNREFUSED/);
          return true;
        },
      );

      const updated = mockPrisma.getRecord();
      assert.equal(updated.status, 'FAILED');
      assert.match(updated.errorMessage, /ECONNREFUSED/);
      assert.ok(updated.latencyMs >= 1);
    });

    it('decrypts encrypted endpoint secret before signing and verifies signature', async () => {
      const { encryptSecret } = await import('@buimbpay/auth');
      const rawSecret = 'whsec_custom_secret_for_decryption_test';
      const encryptedSecret = encryptSecret(rawSecret);

      const deliveryWithEncryptedSecret = {
        ...baseDelivery,
        endpoint: {
          ...baseDelivery.endpoint,
          secret: encryptedSecret,
        },
      };

      const mockPrisma = createMockPrisma(deliveryWithEncryptedSecret);
      let capturedSig = '';

      const mockFetch: typeof fetch = async (_input, init) => {
        const headers = (init?.headers as Record<string, string>) || {};
        capturedSig = headers['X-BuimbPay-Signature'];
        return new Response('{}', { status: 200 });
      };

      await processWebhookDelivery(mockDeliveryId, {
        prismaClient: mockPrisma,
        fetchFn: mockFetch,
      });

      assert.ok(capturedSig);
      const match = capturedSig.match(/^t=(\d+),v1=([a-f0-9]{64})$/);
      assert.ok(match);
      const [, ts, sig] = match;

      const expectedSig = createHmac('sha256', rawSecret)
        .update(`${ts}.${JSON.stringify(baseDelivery.webhookEvent.payload)}`)
        .digest('hex');

      assert.equal(sig, expectedSig);
    });
  });
});
