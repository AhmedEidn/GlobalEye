import AuthProvider from '@/components/AuthProvider';
import CategoriesProvider from '@/components/CategoriesProvider';
import Footer from '@/components/Footer';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import Header from '@/components/Header';
import PerformanceAnalytics from '@/components/PerformanceAnalytics';
import UserInteractionAnalytics from '@/components/UserInteractionAnalytics';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GlobalEye News - Latest Breaking News and Updates',
  description: 'Stay informed with the latest breaking news, in-depth analysis, and real-time updates from around the world. GlobalEye News brings you comprehensive coverage of world events, business, technology, science, and more.',
  keywords: 'news, breaking news, world news, business news, technology news, science news, health news, entertainment news',
  authors: [{ name: 'GlobalEye News Team' }],
  creator: 'GlobalEye News',
  publisher: 'GlobalEye News',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://globaleye.news'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'GlobalEye News - Latest Breaking News and Updates',
    description: 'Stay informed with the latest breaking news, in-depth analysis, and real-time updates from around the world.',
    url: 'https://globaleye.news',
    siteName: 'GlobalEye News',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'GlobalEye News',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GlobalEye News - Latest Breaking News and Updates',
    description: 'Stay informed with the latest breaking news, in-depth analysis, and real-time updates from around the world.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <body className={`${inter.className} bg-gray-50 text-gray-900 antialiased`}>
        {/* Google Analytics */}
        <GoogleAnalytics GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX'} />
        <PerformanceAnalytics />
        <UserInteractionAnalytics />
        
        <AuthProvider>
          <CategoriesProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
          </CategoriesProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
