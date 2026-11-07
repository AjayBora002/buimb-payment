// Single place that owns the localStorage token keys, matching the convention
// PaymentLinksView.tsx already established (bp_access_token) before this task existed.
const ACCESS_TOKEN_KEY = 'bp_access_token';
const REFRESH_TOKEN_KEY = 'bp_refresh_token';
export function getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
}
export function getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
}
export function setTokens(tokens) {
    localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
}
export function setAccessToken(accessToken) {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
}
export function clearTokens() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
}
