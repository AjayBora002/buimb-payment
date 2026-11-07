import { ApiError } from '../types/auth.js';
import { clearTokens, getAccessToken, getRefreshToken, setAccessToken } from './token-storage.js';
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';
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
async function request(method, path, options = {}) {
    const token = getAccessToken();
    const headers = {
        ...(options.body !== undefined ? { 'Content-Type': 'application/json' } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
    };
    const res = await fetch(`${API_BASE}${path}`, {
        method,
        headers,
        body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
    });
    if (res.status === 401 && !options._isRetry) {
        const newToken = await refreshAccessToken();
        if (newToken) {
            return request(method, path, { ...options, _isRetry: true });
        }
        // Refresh failed (or there was no refresh token to begin with): the
        // session is dead. Clear storage and hand control back to the app
        // shell rather than resolving into an empty-list / broken UI.
        clearTokens();
        unauthorizedHandler?.();
        throw new ApiError('Session expired', 401);
    }
    if (!res.ok) {
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
