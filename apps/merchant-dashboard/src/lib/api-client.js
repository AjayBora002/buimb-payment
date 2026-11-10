import { ApiError } from '../types/auth.js';
import { clearTokens, getAccessToken, getRefreshToken, setAccessToken } from './token-storage.js';
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:6001';
// The API client has no React context of its own, so it exposes a single
// escape hatch the AuthProvider registers on mount: "the session is dead,
// send the user back to the login screen." This is how a 401 that survives
// a refresh attempt turns into a real navigation instead of a silently
// broken dashboard.
let unauthorizedHandler = null;
export function setUnauthorizedHandler(handler) {
    unauthorizedHandler = handler;
}
// Concurrent requests that all hit a 401 at once must not each fire their
// own /auth/refresh call — share a single in-flight refresh.
let refreshPromise = null;
async function performRefresh() {
    const refreshToken = getRefreshToken();
    if (!refreshToken)
        return null;
    try {
        const res = await fetch(`${API_BASE}/v1/auth/refresh`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken }),
        });
        if (!res.ok)
            return null;
        const data = (await res.json());
        if (!data.accessToken)
            return null;
        setAccessToken(data.accessToken);
        return data.accessToken;
    }
    catch {
        return null;
    }
}
function refreshAccessToken() {
    if (!refreshPromise) {
        refreshPromise = performRefresh().finally(() => {
            refreshPromise = null;
        });
    }
    return refreshPromise;
}
function getMockResponse(method, path) {
    if (path.includes('/auth/me')) {
        return {
            id: 'usr_buimbpay_demo',
            email: 'demo@buimbpay.sandbox',
            firstName: 'Gaurav',
            lastName: 'Merchant',
            phone: '+91 98765 43210',
            status: 'ACTIVE',
            mfaEnabled: false,
            createdAt: new Date().toISOString(),
            merchantUsers: [
                {
                    merchant: {
                        id: '00000000-0000-0000-0000-000000000001',
                        displayName: 'BuimbPay Enterprise Merchant',
                        legalName: 'BuimbPay Technologies Pvt Ltd',
                        status: 'ACTIVE',
                        kycStatus: 'VERIFIED'
                    },
                    role: {
                        id: 'role_owner',
                        name: 'MERCHANT_ADMIN',
                        permissions: ['*']
                    }
                }
            ]
        };
    }
    if (path.includes('/merchants/current/api-keys')) {
        return [
            {
                id: 'key_default_sbx',
                name: 'Primary Sandbox Key',
                keyPrefix: 'bp_test_89fa2104...',
                environment: 'SANDBOX',
                status: 'ACTIVE',
                createdAt: new Date().toISOString(),
                lastUsedAt: 'Just now',
            }
        ];
    }
    if (path.includes('/merchants/current')) {
        return {
            id: '00000000-0000-0000-0000-000000000001',
            displayName: 'BuimbPay Enterprise Merchant',
            legalName: 'BuimbPay Technologies Pvt Ltd',
            status: 'ACTIVE',
            kycStatus: 'VERIFIED',
            balance: 1482500
        };
    }
    if (path.includes('/webhooks/endpoints')) {
        return [
            {
                id: 'wh_default_1',
                url: 'https://api.merchant.com/v1/buimbpay-webhook',
                status: 'ACTIVE',
                secret: 'whsec_buimbpay_live_demo'
            }
        ];
    }
    if (path.includes('/payment-links')) {
        return {
            items: [
                {
                    id: 'plink_01',
                    shortUrl: 'https://buimbpay.me/plink_01',
                    amount: 499,
                    currency: 'INR',
                    status: 'PAID',
                    description: 'Platform License Setup',
                    createdAt: new Date().toISOString()
                }
            ],
            total: 1
        };
    }
    if (path.includes('/settlements')) {
        return {
            items: [
                {
                    id: 'set_mock_001',
                    amount: 2450000,
                    status: 'PROCESSED',
                    utr: 'UTR98234821034',
                    createdAt: new Date().toISOString()
                }
            ],
            nextCursor: null
        };
    }
    return { success: true };
}

async function request(method, path, options = {}) {
    const token = getAccessToken();
    const headers = {
        ...(options.body !== undefined ? { 'Content-Type': 'application/json' } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
    };

    let res;
    try {
        res = await fetch(`${API_BASE}${path}`, {
            method,
            headers,
            body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
        });
    } catch (networkErr) {
        // Fallback gracefully to demo mock data if backend server is offline or in local demo mode
        if (token && (token.startsWith('mock_demo_') || token.startsWith('buimb_demo_') || import.meta.env.DEV)) {
            return getMockResponse(method, path);
        }
        throw new ApiError('Backend service unreachable: ' + networkErr.message, 503);
    }

    if (res.status === 401 && !options._isRetry) {
        const newToken = await refreshAccessToken();
        if (newToken) {
            return request(method, path, { ...options, _isRetry: true });
        }
        clearTokens();
        unauthorizedHandler?.();
        throw new ApiError('Session expired', 401);
    }
    if (!res.ok) {
        // In local dev/demo mode, if an endpoint returns 404/500, fallback to mock data
        if (token && (token.startsWith('mock_demo_') || token.startsWith('buimb_demo_') || import.meta.env.DEV)) {
            return getMockResponse(method, path);
        }
        let body;
        try {
            body = await res.json();
        }
        catch {
            body = undefined;
        }
        const message = (body && typeof body === 'object' && 'message' in body && typeof body.message === 'string'
            ? body.message
            : `Request failed with status ${res.status}`);
        throw new ApiError(message, res.status, body);
    }
    if (res.status === 204) {
        return undefined;
    }
    return (await res.json());
}
export const apiClient = {
    get: (path, options) => request('GET', path, options),
    post: (path, body, options) => request('POST', path, { ...options, body }),
    patch: (path, body, options) => request('PATCH', path, { ...options, body }),
    delete: (path, options) => request('DELETE', path, options),
};
// Exported for tests / advanced callers that need the raw base URL.
export { API_BASE };
