import { authenticator } from 'otplib';
import { randomBytes } from 'crypto';

authenticator.options = { window: 1 }; // allow 1-step clock drift

export function generateMfaSecret(): string {
  return authenticator.generateSecret(20);
}

export function generateMfaQrUri(email: string, secret: string): string {
  return authenticator.keyuri(email, 'BuimbPay', secret);
}

export function verifyMfaToken(token: string, secret: string): boolean {
  try {
    return authenticator.verify({ token, secret });
  } catch {
    return false;
  }
}

/** Generate backup codes — store hashed, show plaintext once */
export function generateBackupCodes(count = 10): string[] {
  return Array.from({ length: count }, () =>
    randomBytes(5).toString('hex').toUpperCase().match(/.{1,5}/g)!.join('-'),
  );
}
