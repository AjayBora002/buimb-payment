import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { apiClient, API_BASE, setUnauthorizedHandler } from './api-client.js';
import { clearTokens, getAccessToken, setTokens } from './token-storage.js';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
    const [status, setStatus] = useState('checking'); // 'checking' | 'authenticated' | 'unauthenticated'
    const [user, setUser] = useState(null);
    const [authError, setAuthError] = useState(null);

    const logout = useCallback(() => {
        clearTokens();
        setUser(null);
        setStatus('unauthenticated');
        setAuthError(null);
    }, []);

    useEffect(() => {
        setUnauthorizedHandler(logout);
        return () => setUnauthorizedHandler(null);
    }, [logout]);

    // Validate active token on initial app load
    useEffect(() => {
        const existingToken = getAccessToken();
        if (!existingToken) {
            setStatus('unauthenticated');
            return;
        }

        apiClient
            .get('/v1/auth/me')
            .then((profile) => {
                setUser(profile);
                setStatus('authenticated');
            })
            .catch(() => {
                // If token is expired or invalid, require authentic sign-in
                clearTokens();
                setUser(null);
                setStatus('unauthenticated');
            });
    }, []);

    const login = useCallback(async (email, password) => {
        setAuthError(null);
        try {
            const res = await fetch(`${API_BASE}/v1/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
            });

            if (!res.ok) {
                const body = await res.json().catch(() => ({}));
                const msg = body.message || 'Invalid email or password. Please verify your credentials.';
                throw new Error(msg);
            }

            const data = await res.json();
            setTokens({ accessToken: data.accessToken, refreshToken: data.refreshToken });

            const profile = await apiClient.get('/v1/auth/me');
            setUser(profile);
            setStatus('authenticated');
            return profile;
        } catch (err) {
            setAuthError(err.message);
            throw err;
        }
    }, []);

    const register = useCallback(async (data) => {
        setAuthError(null);
        const res = await fetch(`${API_BASE}/v1/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: data.email.trim().toLowerCase(),
                password: data.password,
                firstName: data.firstName.trim(),
                lastName: data.lastName.trim(),
                ...(data.organisationName ? { organisationName: data.organisationName.trim() } : {}),
            }),
        });

        if (!res.ok) {
            const body = await res.json().catch(() => ({}));
            const msg = body.message || 'Registration failed. Please check your information and try again.';
            throw new Error(msg);
        }

        // Immediately authenticate with the new credentials
        return login(data.email, data.password);
    }, [login]);

    const value = useMemo(
        () => ({
            status,
            user,
            authError,
            login,
            register,
            logout,
        }),
        [status, user, authError, login, register, logout]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return ctx;
}
