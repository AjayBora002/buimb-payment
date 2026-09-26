import { randomBytes, createCipheriv, createDecipheriv } from 'node:crypto';

const DEFAULT_DEV_KEY = '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef';

function getEncryptionKey(keyHex?: string): Buffer {
  const hex = keyHex || process.env.ENCRYPTION_KEY || DEFAULT_DEV_KEY;
  if (hex.length !== 64) {
    throw new Error('ENCRYPTION_KEY must be a 64-character hex string (32 bytes).');
  }
  return Buffer.from(hex, 'hex');
}

/**
 * Encrypts a string using AES-256-GCM.
 * Output format: enc:<iv_hex>:<auth_tag_hex>:<ciphertext_hex>
 */
export function encryptSecret(plainText: string, keyHex?: string): string {
  const key = getEncryptionKey(keyHex);
  const iv = randomBytes(12); // Standard 96-bit IV for GCM
  const cipher = createCipheriv('aes-256-gcm', key, iv);

  const encrypted = Buffer.concat([
    cipher.update(plainText, 'utf8'),
    cipher.final(),
  ]);

  const authTag = cipher.getAuthTag();

  return `enc:${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted.toString('hex')}`;
}

/**
 * Decrypts an AES-256-GCM encrypted string.
 * Falls back to returning plainText if not prefixed with "enc:" (for backward compatibility in tests/seeds).
 */
export function decryptSecret(cipherText: string, keyHex?: string): string {
  if (!cipherText || !cipherText.startsWith('enc:')) {
    // Fallback: unencrypted or legacy secret
    return cipherText;
  }

  const parts = cipherText.split(':');
  if (parts.length !== 4) {
    throw new Error('Invalid encrypted secret format');
  }

  const [, ivHex, authTagHex, encryptedHex] = parts;
  const key = getEncryptionKey(keyHex);
  const iv = Buffer.from(ivHex, 'hex');
  const authTag = Buffer.from(authTagHex, 'hex');
  const encrypted = Buffer.from(encryptedHex, 'hex');

  const decipher = createDecipheriv('aes-256-gcm', key, iv);
  decipher.setAuthTag(authTag);

  const decrypted = Buffer.concat([
    decipher.update(encrypted),
    decipher.final(),
  ]);

  return decrypted.toString('utf8');
}
