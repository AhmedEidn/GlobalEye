'use client';

import { useAuth } from '@/lib/hooks/useAuth';
import { useSession } from 'next-auth/react';

export default function TestAuthPage() {
  const { user, isLoggedIn, isLoading, session, status } = useAuth();
  const nextAuthSession = useSession();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Authentication Test Page</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* useAuth Hook Results */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">useAuth Hook Results</h2>
            <div className="space-y-2 text-sm">
              <p><strong>isLoading:</strong> {isLoading ? '✅ Yes' : '❌ No'}</p>
              <p><strong>isLoggedIn:</strong> {isLoggedIn ? '✅ Yes' : '❌ No'}</p>
              <p><strong>User:</strong> {user ? '✅ Available' : '❌ Not available'}</p>
              <p><strong>User Name:</strong> {user?.name || 'N/A'}</p>
              <p><strong>User Email:</strong> {user?.email || 'N/A'}</p>
              <p><strong>User ID:</strong> {user?.id || 'N/A'}</p>
            </div>
          </div>

          {/* NextAuth useSession Results */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">NextAuth useSession Results</h2>
            <div className="space-y-2 text-sm">
              <p><strong>Status:</strong> {status}</p>
              <p><strong>Session:</strong> {nextAuthSession.data ? '✅ Available' : '❌ Not available'}</p>
              <p><strong>Session User:</strong> {nextAuthSession.data?.user ? '✅ Available' : '❌ Not available'}</p>
              <p><strong>Session User Name:</strong> {nextAuthSession.data?.user?.name || 'N/A'}</p>
              <p><strong>Session User Email:</strong> {nextAuthSession.data?.user?.email || 'N/A'}</p>
            </div>
          </div>

          {/* Raw Data */}
          <div className="bg-white p-6 rounded-lg shadow md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Raw Data</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">useAuth User Object:</h3>
                <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto">
                  {JSON.stringify(user, null, 2)}
                </pre>
              </div>
              <div>
                <h3 className="font-medium mb-2">NextAuth Session:</h3>
                <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto">
                  {JSON.stringify(nextAuthSession, null, 2)}
                </pre>
              </div>
            </div>
          </div>

          {/* Environment Variables Check */}
          <div className="bg-white p-6 rounded-lg shadow md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Environment Variables Check</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium mb-2">Required Variables:</h3>
                <div className="space-y-2 text-sm">
                  <p><strong>NEXTAUTH_URL:</strong> {process.env.NEXT_PUBLIC_NEXTAUTH_URL ? '✅ Set' : '❌ Missing'}</p>
                  <p><strong>NEXTAUTH_SECRET:</strong> {process.env.NEXTAUTH_SECRET ? '✅ Set' : '❌ Missing'}</p>
                  <p><strong>GOOGLE_CLIENT_ID:</strong> {process.env.GOOGLE_CLIENT_ID ? '✅ Set' : '❌ Missing'}</p>
                  <p><strong>GOOGLE_CLIENT_SECRET:</strong> {process.env.GOOGLE_CLIENT_SECRET ? '✅ Set' : '❌ Missing'}</p>
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-2">Supabase Variables:</h3>
                <div className="space-y-2 text-sm">
                  <p><strong>SUPABASE_URL:</strong> {process.env.SUPABASE_URL ? '✅ Set' : '❌ Missing'}</p>
                  <p><strong>SUPABASE_SERVICE_ROLE_KEY:</strong> {process.env.SUPABASE_SERVICE_ROLE_KEY ? '✅ Set' : '❌ Missing'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
