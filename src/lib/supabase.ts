import { createClient } from '@supabase/supabase-js';

// Server-side Supabase client
// Environment variables should be defined in .env.local
export const createServerSupabaseClient = () => {
  const supabaseUrl = process.env.SUPABASE_URL!;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
};

// Client-side Supabase client (for use in client components)
export const createClientSupabaseClient = () => {
  const supabaseUrl = process.env.SUPABASE_URL!;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!;
  
  return createClient(supabaseUrl, supabaseAnonKey);
};

// Default exports for backward compatibility
export const supabaseAdmin = createServerSupabaseClient();
export const supabase = createClientSupabaseClient(); 