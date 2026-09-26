import bcrypt from 'bcryptjs';

const BCRYPT_ROUNDS = 12;

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, BCRYPT_ROUNDS);
}

export async function verifyPassword(
  password: string,
  hash: string,
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function validatePasswordStrength(password: string): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  if (password.length < 12) errors.push('Must be at least 12 characters');
  if (!/[A-Z]/.test(password)) errors.push('Must contain an uppercase letter');
  if (!/[a-z]/.test(password)) errors.push('Must contain a lowercase letter');
  if (!/[0-9]/.test(password)) errors.push('Must contain a number');
  if (!/[^A-Za-z0-9]/.test(password)) errors.push('Must contain a special character');
  return { valid: errors.length === 0, errors };
}
