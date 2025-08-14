/** @type {import('next').NextConfig} */
const nextConfig = {
  // External packages allowed on the server (alternative to the old experimental key)
  serverExternalPackages: ['@supabase/supabase-js'],
  
  // Image settings
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'your-project.supabase.co', // Replace with your Supabase project
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
  },
  
  // TypeScript settings
  typescript: {
    ignoreBuildErrors: false,
  },
  
  // ESLint settings
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Additional settings
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  
  // Redirect settings
  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/login',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
