'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { useEffect } from 'react';

export function useAuth() {
  const { data: session, status } = useSession();

  // Debug logging in development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('useAuth - Session:', session);
      console.log('useAuth - Status:', status);
    }
  }, [session, status]);

  const login = async (provider: string = 'google') => {
    try {
      console.log('useAuth - Attempting login with provider:', provider);
      await signIn(provider, { callbackUrl: '/profile' });
    } catch (error) {
      console.error('useAuth - Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      console.log('useAuth - Attempting logout');
      await signOut({ callbackUrl: '/' });
    } catch (error) {
      console.error('useAuth - Logout error:', error);
      throw error;
    }
  };

  const authState = {
    user: session?.user || null,
    isLoggedIn: !!session?.user,
    isLoading: status === 'loading',
    session,
    status,
  };

  if (process.env.NODE_ENV === 'development') {
    console.log('useAuth - Auth State:', authState);
  }

  return {
    ...authState,
    login,
    logout,
  };
}
