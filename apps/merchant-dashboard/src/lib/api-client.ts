import { ApiError, type RefreshResponse } from '../types/auth.js';
import { clearTokens, getAccessToken, getRefreshToken, setAccessToken } from './token-storage.js';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';

type UnauthorizedHandler = () => void;

// The API client has no React context of its own, so it exposes a single
// escape hatch the AuthProvider registers on mount: "the session is dead,
// send the user back to the login screen." This is how a 401 that survives
// a refresh attempt turns into a real navigation instead of a silently
// broken dashboard.
let unauthorizedHandler: UnauthorizedHandler | null = null;

export function setUnauthorizedHandler(handler: UnauthorizedHandler | null): void {
  unauthorizedHandler = handler;
}

// Concurrent requests that all hit a 401 at once must not each fire their
// own /auth/refresh call — share a single in-flight refresh.
let refreshPromise: Promise<string | null> | null = null;

async function performRefresh(): Promise<string | null> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return null;

  try {
    const res = await fetch(`${API_BASE}/v1/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as RefreshResponse;
    if (!data.accessToken) return null;
    setAccessToken(data.accessToken);
    return data.accessToken;
  } catch {
    return null;
  }
}

function refreshAccessToken(): Promise<string | null> {
  if (!refreshPromise) {
    refreshPromise = performRefresh().finally(() => {
      refreshPromise = null;
    });
  }
  return refreshPromise;
}

interface RequestOptions {
  body?: unknown;
  headers?: Record<string, string>;
  /** Internal: set on the retry attempt so we never loop refresh -> 401 -> refresh forever. */
  _isRetry?: boolean;
}

async function request<T>(method: string, path: string, options: RequestOptions = {}): Promise<T> {
  const token = getAccessToken();
  const headers: Record<string, string> = {
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
      return request<T>(method, path, { ...options, _isRetry: true });
    }
    // Refresh failed (or there was no refresh token to begin with): the
    // session is dead. Clear storage and hand control back to the app
    // shell rather than resolving into an empty-list / broken UI.
    clearTokens();
    unauthorizedHandler?.();
    throw new ApiError('Session expired', 401);
  }

  if (!res.ok) {
    let body: unknown;
    try {
      body = await res.json();
    } catch {
      body = undefined;
    }
    const message =
      (body && typeof body === 'object' && 'message' in body && typeof (body as any).message === 'string'
        ? (body as any).message
        : `Request failed with status ${res.status}`);
    throw new ApiError(message, res.status, body);
  }

  if (res.status === 204) {
    return undefined as T;
  }
  return (await res.json()) as T;
}

export const apiClient = {
  get: <T>(path: string, options?: Omit<RequestOptions, 'body'>) => request<T>('GET', path, options),
  post: <T>(path: string, body?: unknown, options?: Omit<RequestOptions, 'body'>) =>
    request<T>('POST', path, { ...options, body }),
  patch: <T>(path: string, body?: unknown, options?: Omit<RequestOptions, 'body'>) =>
    request<T>('PATCH', path, { ...options, body }),
  delete: <T>(path: string, options?: Omit<RequestOptions, 'body'>) => request<T>('DELETE', path, options),
};

// Exported for tests / advanced callers that need the raw base URL.
export { API_BASE };
