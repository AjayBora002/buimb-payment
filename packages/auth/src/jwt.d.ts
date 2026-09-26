export interface AccessTokenPayload {
    sub: string;
    merchantId?: string;
    role?: string;
    env: 'SANDBOX' | 'PRODUCTION';
    type: 'access';
}
export interface RefreshTokenPayload {
    sub: string;
    sessionId: string;
    type: 'refresh';
}
export declare function signAccessToken(payload: Omit<AccessTokenPayload, 'type'>): string;
export declare function signRefreshToken(payload: Omit<RefreshTokenPayload, 'type'>): string;
export declare function verifyAccessToken(token: string): AccessTokenPayload;
export declare function verifyRefreshToken(token: string): RefreshTokenPayload;
export declare function generateSessionToken(): string;
//# sourceMappingURL=jwt.d.ts.map