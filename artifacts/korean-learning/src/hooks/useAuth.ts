import { useState, useEffect } from 'react';
import { api } from '../lib/api';

export interface AuthUser {
  id: string;
  email?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  profileImageUrl?: string | null;
}

interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export function useAuth(): AuthState & { login: () => void; logout: () => void } {
  const [state, setState] = useState<AuthState>({ user: null, isLoading: true, isAuthenticated: false });
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');

  useEffect(() => {
    api.getUser()
      .then((data) => setState({ user: data.user, isLoading: false, isAuthenticated: !!data.user }))
      .catch(() => setState({ user: null, isLoading: false, isAuthenticated: false }));
  }, []);

  const login = () => { window.location.href = `${base}/api/login?returnTo=${encodeURIComponent(base + '/community')}`; };
  const logout = () => { window.location.href = `${base}/api/logout`; };

  return { ...state, login, logout };
}

export function displayName(user: AuthUser | null): string {
  if (!user) return '익명';
  if (user.firstName || user.lastName) return `${user.firstName || ''} ${user.lastName || ''}`.trim();
  return user.email?.split('@')[0] || '사용자';
}
