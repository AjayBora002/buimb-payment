import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { apiClient, API_BASE, setUnauthorizedHandler } from './api-client.js';
import { clearTokens, getAccessToken, setTokens } from './token-storage.js';
import type { AuthUser, LoginResponse } from '../types/auth.js';

type AuthStatus = 'checking' | 'authenticated' | 'unauthenticated';

interface AuthContextValue {
  status: AuthStatus;
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [status, setStatus] = useState<AuthStatus>('checking');
  const [user, setUser] = useState<AuthUser | null>(null);

  const logout = useCallback(() => {
    clearTokens();
    setUser(null);
    setStatus('unauthenticated');
  }, []);

  useEffect(() => {
    setUnauthorizedHandler(logout);
    return () => setUnauthorizedHandler(null);
  }, [logout]);

  useEffect(() => {
    const existingToken = getAccessToken();
    if (!existingToken) {
      setStatus('unauthenticated');
      return;
    }
    apiClient
      .get<AuthUser>('/v1/auth/me')
      .then((profile) => {
        setUser(profile);
        setStatus('authenticated');
      })
      .catch(() => {
        clearTokens();
        setUser(null);
        setStatus('unauthenticated');
      });
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await fetch(`${API_BASE}/v1/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body.message || 'Unable to sign in. Please try again.');
    }

    const data = (await res.json()) as LoginResponse;
    setTokens({ accessToken: data.accessToken, refreshToken: data.refreshToken });

    const profile = await apiClient.get<AuthUser>('/v1/auth/me');
    setUser(profile);
    setStatus('authenticated');
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ status, user, login, logout }),
    [status, user, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
