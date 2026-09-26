import jwt from 'jsonwebtoken';
import { randomBytes } from 'crypto';

export interface AccessTokenPayload {
  sub: string;       // user ID
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

const ACCESS_TOKEN_EXPIRY = '15m';
const REFRESH_TOKEN_EXPIRY = '7d';

function getSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET environment variable is not set');
  if (secret.length < 32) throw new Error('JWT_SECRET must be at least 32 characters');
  return secret;
}

export function signAccessToken(payload: Omit<AccessTokenPayload, 'type'>): string {
  return jwt.sign(
    { ...payload, type: 'access' },
    getSecret(),
    { expiresIn: ACCESS_TOKEN_EXPIRY, algorithm: 'HS256' },
  );
}

export function signRefreshToken(payload: Omit<RefreshTokenPayload, 'type'>): string {
  return jwt.sign(
    { ...payload, type: 'refresh' },
    getSecret(),
    { expiresIn: REFRESH_TOKEN_EXPIRY, algorithm: 'HS256' },
  );
}

export function verifyAccessToken(token: string): AccessTokenPayload {
  const decoded = jwt.verify(token, getSecret(), { algorithms: ['HS256'] });
  if (typeof decoded === 'string' || decoded.type !== 'access') {
    throw new Error('Invalid access token');
  }
  return decoded as AccessTokenPayload;
}

export function verifyRefreshToken(token: string): RefreshTokenPayload {
  const decoded = jwt.verify(token, getSecret(), { algorithms: ['HS256'] });
  if (typeof decoded === 'string' || decoded.type !== 'refresh') {
    throw new Error('Invalid refresh token');
  }
  return decoded as RefreshTokenPayload;
}

export function generateSessionToken(): string {
  return randomBytes(48).toString('hex');
}
