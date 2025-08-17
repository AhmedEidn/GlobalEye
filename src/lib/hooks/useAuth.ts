'use client';

import { useSession, signIn, signOut } from 'next-auth/react';

export function useAuth() {
  const { data: session, status } = useSession();

  const login = async (provider: string = 'google') => {
    try {
      await signIn(provider, { callbackUrl: '/profile' });
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const logout = async () => {
    try {
      await signOut({ callbackUrl: '/' });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return {
    user: session?.user || null,
    isLoggedIn: !!session?.user,
    isLoading: status === 'loading',
    login,
    logout,
  };
}
