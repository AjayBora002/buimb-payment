import jwt from 'jsonwebtoken';
import { randomBytes } from 'crypto';
const ACCESS_TOKEN_EXPIRY = '15m';
const REFRESH_TOKEN_EXPIRY = '7d';
function getSecret() {
    const secret = process.env.JWT_SECRET;
    if (!secret)
        throw new Error('JWT_SECRET environment variable is not set');
    if (secret.length < 32)
        throw new Error('JWT_SECRET must be at least 32 characters');
    return secret;
}
export function signAccessToken(payload) {
    return jwt.sign({ ...payload, type: 'access' }, getSecret(), { expiresIn: ACCESS_TOKEN_EXPIRY, algorithm: 'HS256' });
}
export function signRefreshToken(payload) {
    return jwt.sign({ ...payload, type: 'refresh' }, getSecret(), { expiresIn: REFRESH_TOKEN_EXPIRY, algorithm: 'HS256' });
}
export function verifyAccessToken(token) {
    const decoded = jwt.verify(token, getSecret(), { algorithms: ['HS256'] });
    if (typeof decoded === 'string' || decoded.type !== 'access') {
        throw new Error('Invalid access token');
    }
    return decoded;
}
export function verifyRefreshToken(token) {
    const decoded = jwt.verify(token, getSecret(), { algorithms: ['HS256'] });
    if (typeof decoded === 'string' || decoded.type !== 'refresh') {
        throw new Error('Invalid refresh token');
    }
    return decoded;
}
export function generateSessionToken() {
    return randomBytes(48).toString('hex');
}
//# sourceMappingURL=jwt.js.map