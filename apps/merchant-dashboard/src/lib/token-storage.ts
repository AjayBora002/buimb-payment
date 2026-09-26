// Single place that owns the localStorage token keys, matching the convention
// PaymentLinksView.tsx already established (bp_access_token) before this task existed.

const ACCESS_TOKEN_KEY = 'bp_access_token';
const REFRESH_TOKEN_KEY = 'bp_refresh_token';

export interface StoredTokens {
  accessToken: string;
  refreshToken: string;
}

export function getAccessToken(): string | null {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getRefreshToken(): string | null {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function setTokens(tokens: StoredTokens): void {
  localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
}

export function setAccessToken(accessToken: string): void {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
}

export function clearTokens(): void {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}
