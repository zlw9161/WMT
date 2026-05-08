import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

import { apiRequest } from '@/services/api';

const ACCESS_TOKEN_KEY = 'wmt_access_token';
const REFRESH_TOKEN_KEY = 'wmt_refresh_token';

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  avatar_url?: string | null;
  bio?: string | null;
  role: string;
  is_active: boolean;
}

interface AuthContextValue {
  user: AuthUser | null;
  accessToken: string | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (payload: { username: string; email: string; password: string }) => Promise<void>;
  logout: () => void;
  refreshMe: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  user: AuthUser;
}

function saveTokens(accessToken: string, refreshToken: string): void {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem(ACCESS_TOKEN_KEY));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bootstrap = async () => {
      if (!accessToken) {
        setLoading(false);
        return;
      }
      try {
        const me = await apiRequest<AuthUser>('/users/me', {
          method: 'GET',
          token: accessToken,
        });
        setUser(me);
      } catch {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
        setAccessToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    void bootstrap();
  }, [accessToken]);

  const refreshMe = useCallback(async () => {
    if (!accessToken) {
      setUser(null);
      return;
    }
    const me = await apiRequest<AuthUser>('/users/me', { method: 'GET', token: accessToken });
    setUser(me);
  }, [accessToken]);

  const login = useCallback(async (username: string, password: string) => {
    const body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);

    const data = await apiRequest<AuthResponse>('/auth/login', {
      method: 'POST',
      body,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    saveTokens(data.access_token, data.refresh_token);
    setAccessToken(data.access_token);
    setUser(data.user);
  }, []);

  const register = useCallback(async (payload: { username: string; email: string; password: string }) => {
    const data = await apiRequest<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    saveTokens(data.access_token, data.refresh_token);
    setAccessToken(data.access_token);
    setUser(data.user);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    setAccessToken(null);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, accessToken, loading, login, register, logout, refreshMe }),
    [user, accessToken, loading, login, register, logout, refreshMe],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
