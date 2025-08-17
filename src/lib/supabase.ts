import { createClient } from '@supabase/supabase-js';

// Server-side Supabase client
// Environment variables should be defined in .env.local
export const createServerSupabaseClient = () => {
  console.log('🔧 Creating server Supabase client...');
  console.log('🔧 SUPABASE_URL:', process.env.SUPABASE_URL ? '✅ Set' : '❌ Missing');
  console.log('🔧 SUPABASE_SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? '✅ Set' : '❌ Missing');
  
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Missing Supabase environment variables for server client');
    throw new Error('Missing Supabase environment variables for server client');
  }
  
  console.log('🔧 Creating Supabase client with URL:', supabaseUrl);
  const client = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
  
  console.log('🔧 Supabase client created successfully');
  return client;
};

// Client-side Supabase client (for use in client components)
export const createClientSupabaseClient = () => {
  console.log('🔧 Creating client Supabase client...');
  console.log('🔧 NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Missing');
  console.log('🔧 NEXT_PUBLIC_SUPABASE_ANON_KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing');
  console.log('🔧 NEXT_PUBLIC_SUPABASE_URL value:', process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log('🔧 NEXT_PUBLIC_SUPABASE_ANON_KEY length:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length || 0);
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('❌ Missing Supabase environment variables for client');
    console.error('❌ supabaseUrl:', supabaseUrl);
    console.error('❌ supabaseAnonKey:', supabaseAnonKey ? 'Present' : 'Missing');
    throw new Error('Missing Supabase environment variables for client');
  }
  
  console.log('🔧 Creating client Supabase client with URL:', supabaseUrl);
  const client = createClient(supabaseUrl, supabaseAnonKey);
  console.log('🔧 Client Supabase client created successfully');
  
  return client;
};

// Default export for client-side usage
// Don't create client at import time - let components create it when needed
// export const supabase = createClientSupabaseClient(); 