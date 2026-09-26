/**
 * Encrypts a string using AES-256-GCM.
 * Output format: enc:<iv_hex>:<auth_tag_hex>:<ciphertext_hex>
 */
export declare function encryptSecret(plainText: string, keyHex?: string): string;
/**
 * Decrypts an AES-256-GCM encrypted string.
 * Falls back to returning plainText if not prefixed with "enc:" (for backward compatibility in tests/seeds).
 */
export declare function decryptSecret(cipherText: string, keyHex?: string): string;
//# sourceMappingURL=encryption.d.ts.map