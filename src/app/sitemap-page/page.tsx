import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Sitemap - GlobalEye News',
  description: 'Complete sitemap of GlobalEye News website. Find all pages, categories, and articles organized for easy navigation.',
};

export default function SitemapPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Website Sitemap</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-8">
              Welcome to the GlobalEye News sitemap. This page provides a comprehensive overview of all 
              pages and content available on our website, organized by category for easy navigation.
            </p>

            {/* Main Pages */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b border-gray-200 pb-2">
                Main Pages
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-blue-800 mb-3">Home & Navigation</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/" className="text-blue-700 hover:text-blue-800 transition-colors">
                        🏠 Homepage
                      </Link>
                    </li>
                    <li>
                      <Link href="/about" className="text-blue-700 hover:text-blue-800 transition-colors">
                        ℹ️ About Us
                      </Link>
                    </li>
                    <li>
                      <Link href="/contact" className="text-blue-700 hover:text-blue-800 transition-colors">
                        📞 Contact
                      </Link>
                    </li>
                    <li>
                      <Link href="/feed.xml" className="text-blue-700 hover:text-blue-800 transition-colors">
                        📡 RSS Feed
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="bg-green-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-green-800 mb-3">User Account</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/login" className="text-green-700 hover:text-green-800 transition-colors">
                        🔐 Login
                      </Link>
                    </li>
                    <li>
                      <Link href="/signup" className="text-green-700 hover:text-green-800 transition-colors">
                        ✍️ Sign Up
                      </Link>
                    </li>
                    <li>
                      <Link href="/profile" className="text-green-700 hover:text-green-800 transition-colors">
                        👤 Profile
                      </Link>
                    </li>
                    <li>
                      <Link href="/favorites" className="text-green-700 hover:text-green-800 transition-colors">
                        ❤️ Favorites
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="bg-purple-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-purple-800 mb-3">Legal & Policies</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/privacy" className="text-purple-700 hover:text-purple-800 transition-colors">
                        🔒 Privacy Policy
                      </Link>
                    </li>
                    <li>
                      <Link href="/terms" className="text-purple-700 hover:text-purple-800 transition-colors">
                        📋 Terms of Service
                      </Link>
                    </li>
                    <li>
                      <Link href="/cookies" className="text-purple-700 hover:text-purple-800 transition-colors">
                        🍪 Cookie Policy
                      </Link>
                    </li>
                    <li>
                      <Link href="/dmca" className="text-purple-700 hover:text-purple-800 transition-colors">
                        ⚖️ DMCA Policy
                      </Link>
                    </li>
                    <li>
                      <Link href="/accessibility" className="text-purple-700 hover:text-purple-800 transition-colors">
                        ♿ Accessibility
                      </Link>
                    </li>
                    <li>
                      <Link href="/disclaimer" className="text-purple-700 hover:text-purple-800 transition-colors">
                        ⚠️ Disclaimer
                      </Link>
                    </li>
                    <li>
                      <Link href="/data-processing" className="text-purple-700 hover:text-purple-800 transition-colors">
                        📊 Data Processing
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* News Categories */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b border-gray-200 pb-2">
                News Categories
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-red-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-red-800 mb-3">Breaking News</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/category/breaking" className="text-red-700 hover:text-red-800 transition-colors">
                        🚨 Breaking News
                      </Link>
                    </li>
                    <li>
                      <Link href="/category/world" className="text-red-700 hover:text-red-800 transition-colors">
                        🌍 World News
                      </Link>
                    </li>
                    <li>
                      <Link href="/category/politics" className="text-red-700 hover:text-red-800 transition-colors">
                        🏛️ Politics
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-blue-800 mb-3">Technology</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/category/technology" className="text-blue-700 hover:text-blue-800 transition-colors">
                        💻 Technology
                      </Link>
                    </li>
                    <li>
                      <Link href="/category/science" className="text-blue-700 hover:text-blue-800 transition-colors">
                        🔬 Science
                      </Link>
                    </li>
                    <li>
                      <Link href="/category/innovation" className="text-blue-700 hover:text-blue-800 transition-colors">
                        🚀 Innovation
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="bg-green-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-green-800 mb-3">Business & Economy</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/category/business" className="text-green-700 hover:text-green-800 transition-colors">
                        💼 Business
                      </Link>
                    </li>
                    <li>
                      <Link href="/category/economy" className="text-green-700 hover:text-green-800 transition-colors">
                        📊 Economy
                      </Link>
                    </li>
                    <li>
                      <Link href="/category/markets" className="text-green-700 hover:text-green-800 transition-colors">
                        📈 Markets
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="bg-yellow-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-yellow-800 mb-3">Lifestyle & Culture</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/category/lifestyle" className="text-yellow-700 hover:text-yellow-800 transition-colors">
                        🌟 Lifestyle
                      </Link>
                    </li>
                    <li>
                      <Link href="/category/entertainment" className="text-yellow-700 hover:text-yellow-800 transition-colors">
                        🎬 Entertainment
                      </Link>
                    </li>
                    <li>
                      <Link href="/category/health" className="text-yellow-700 hover:text-yellow-800 transition-colors">
                        🏥 Health
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Technical Pages */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b border-gray-200 pb-2">
                Technical & SEO
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Search Engine Optimization</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/sitemap.xml" className="text-gray-700 hover:text-gray-800 transition-colors">
                        🗺️ Main Sitemap (XML)
                      </Link>
                    </li>
                    <li>
                      <Link href="/sitemap-index.xml" className="text-gray-700 hover:text-gray-800 transition-colors">
                        📑 Sitemap Index
                      </Link>
                    </li>
                    <li>
                      <Link href="/sitemap-articles.xml" className="text-gray-700 hover:text-gray-800 transition-colors">
                        📰 Articles Sitemap
                      </Link>
                    </li>
                    <li>
                      <Link href="/sitemap-categories.xml" className="text-gray-700 hover:text-gray-800 transition-colors">
                        📂 Categories Sitemap
                      </Link>
                    </li>
                    <li>
                      <Link href="/news-sitemap.xml" className="text-gray-700 hover:text-gray-800 transition-colors">
                        📢 News Sitemap
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="bg-indigo-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-indigo-800 mb-3">Analytics & Tracking</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/robots.txt" className="text-indigo-700 hover:text-indigo-800 transition-colors">
                        🤖 Robots.txt
                      </Link>
                    </li>
                    <li>
                      <span className="text-indigo-700">
                        📊 Google Analytics (GA4)
                      </span>
                    </li>
                    <li>
                      <span className="text-indigo-700">
                        📈 Performance Tracking
                      </span>
                    </li>
                    <li>
                      <span className="text-indigo-700">
                        🎯 User Interaction Analytics
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Search & Navigation */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b border-gray-200 pb-2">
                Search & Navigation Features
              </h2>
              
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Search Capabilities</h3>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                        Full-text search across all articles
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                        Category-based filtering
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                        Date range selection
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                        Author search functionality
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Navigation Features</h3>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                        Breadcrumb navigation
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                        Related articles suggestions
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                        Category browsing
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                        Mobile-responsive design
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Quick Actions */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b border-gray-200 pb-2">
                Quick Actions
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Link
                    href="/"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                  >
                    🏠 Go to Homepage
                  </Link>
                </div>
                
                <div className="text-center">
                  <Link
                    href="/contact"
                    className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                  >
                    📞 Contact Support
                  </Link>
                </div>
                
                <div className="text-center">
                  <Link
                    href="/feed.xml"
                    className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                  >
                    📡 RSS Feed
                  </Link>
                </div>
              </div>
            </section>

            {/* Footer Note */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="text-center">
                <p className="text-gray-600 mb-4">
                  This sitemap is automatically updated and provides a comprehensive overview of our website structure.
                </p>
                <p className="text-sm text-gray-500">
                  Last updated: {new Date().toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
