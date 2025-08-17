import { SupabaseAdapter } from '@auth/supabase-adapter';
import { createClient } from '@supabase/supabase-js';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

// Check if required environment variables are available
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn('Missing Supabase environment variables. Auth will not work properly.');
  console.warn('SUPABASE_URL:', supabaseUrl ? '✅ Set' : '❌ Missing');
  console.warn('SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? '✅ Set' : '❌ Missing');
}

export const supabase = supabaseUrl && supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null;

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // Create Supabase client for auth
          const supabaseAuth = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
          );

          // Sign in with Supabase
          const { data, error } = await supabaseAuth.auth.signInWithPassword({
            email: credentials.email,
            password: credentials.password,
          });

          if (error || !data.user) {
            console.error('Supabase auth error:', error);
            return null;
          }

          // Return user data in NextAuth format
          return {
            id: data.user.id,
            email: data.user.email,
            name: data.user.user_metadata?.full_name || data.user.email?.split('@')[0],
            image: data.user.user_metadata?.avatar_url,
          };
        } catch (error) {
          console.error('Credentials auth error:', error);
          return null;
        }
      }
    }),
  ],
  adapter: supabaseUrl && process.env.NEXTAUTH_SECRET ? SupabaseAdapter({
    url: supabaseUrl,
    secret: process.env.NEXTAUTH_SECRET,
  }) : undefined,
  callbacks: {
    async session({ session, user }) {
      if (process.env.NODE_ENV === 'development') {
        console.log('NextAuth - Session callback:', { session, user });
      }
      
      // Only set user.id if user exists and has an id
      if (session.user && user?.id) {
        session.user.id = user.id;
      }
      return session;
    },
    async jwt({ token, user, account }) {
      if (process.env.NODE_ENV === 'development') {
        console.log('NextAuth - JWT callback:', { token, user, account });
      }
      
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async redirect({ url, baseUrl }) {
      if (process.env.NODE_ENV === 'development') {
        console.log('NextAuth - Redirect callback:', { url, baseUrl });
      }
      
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
  },
  pages: {
    signIn: '/login',
    error: '/login', // Redirect to login on error
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
};
