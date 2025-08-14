import { createClient } from '@supabase/supabase-js';

// Server-side Supabase client
// Environment variables should be defined in .env.local
export const createServerSupabaseClient = () => {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing Supabase environment variables for server client');
  }
  
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
};

// Client-side Supabase client (for use in client components)
export const createClientSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables for client');
  }
  
  return createClient(supabaseUrl, supabaseAnonKey);
};

// Default exports for backward compatibility
export const supabaseAdmin = createServerSupabaseClient();
export const supabase = createClientSupabaseClient(); 