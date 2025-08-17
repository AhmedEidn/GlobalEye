'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
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

  const login = async (provider: string = 'google', credentials?: { email: string; password: string }) => {
    try {
      console.log('useAuth - Attempting login with provider:', provider);
      
      if (provider === 'credentials' && credentials) {
        // Email/password login
        const result = await signIn('credentials', {
          email: credentials.email,
          password: credentials.password,
          redirect: false,
        });
        
        if (result?.error) {
          throw new Error(result.error);
        }
        
        // Wait a bit for the session to update, then redirect
        setTimeout(() => {
          window.location.href = '/profile';
        }, 1000);
      } else {
        // OAuth login (Google)
        await signIn(provider, { callbackUrl: '/profile' });
      }
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
