export declare function generateMfaSecret(): string;
export declare function generateMfaQrUri(email: string, secret: string): string;
export declare function verifyMfaToken(token: string, secret: string): boolean;
/** Generate backup codes — store hashed, show plaintext once */
export declare function generateBackupCodes(count?: number): string[];
//# sourceMappingURL=mfa.d.ts.map