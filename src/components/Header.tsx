'use client';

import { useAuth } from '@/lib/hooks/useAuth';
import { useCategories } from './CategoriesProvider';
import Link from 'next/link';
import { useState } from 'react';
import FavoritesCounter from './FavoritesCounter';
import UserDropdown from './UserDropdown';

export default function Header() {
  const { categories, loading } = useCategories();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, user } = useAuth();
  
  // Get featured categories (first 3 active categories)
  const featuredCategories = categories.slice(0, 3);
  const remainingCategories = categories.slice(3);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          {/* Mobile menu button - Left side */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
          >
            <span className="sr-only">Open main menu</span>
            {isMenuOpen ? (
              <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          {/* Logo - Center on mobile, left on desktop */}
          <Link href="/" className="flex items-center space-x-2 md:mr-8 lg:mr-12">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">G</span>
            </div>
            <span className="text-xl font-bold text-gray-900">GlobalEye</span>
          </Link>

          {/* Desktop Navigation - Optimized spacing */}
          <nav className="hidden md:flex flex-1 justify-center space-x-1 lg:space-x-2 xl:space-x-3">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-blue-600 px-2 py-2 text-base font-medium transition-colors whitespace-nowrap"
            >
              Home
            </Link>
            {loading ? (
              <div className="text-gray-500 px-2 py-2">Loading...</div>
            ) : (
              <>
                {featuredCategories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/category/${category.slug}`}
                    className="text-gray-700 hover:text-blue-600 px-2 py-2 text-base font-medium transition-colors whitespace-nowrap"
                  >
                    {category.name}
                  </Link>
                ))}
                {remainingCategories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/category/${category.slug}`}
                    className="text-gray-700 hover:text-blue-600 px-2 py-2 text-base font-medium transition-colors whitespace-nowrap"
                  >
                    {category.name}
                  </Link>
                ))}
              </>
            )}
          </nav>

          {/* Favorites and User Dropdown - Right side */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <FavoritesCounter />
            </div>
            <UserDropdown isLoggedIn={isLoggedIn} userName={user?.name || undefined} />
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              <Link
                href="/"
                className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              {loading ? (
                <div className="text-gray-500 px-3 py-2 text-base">Loading categories...</div>
              ) : (
                <>
                  {featuredCategories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/category/${category.slug}`}
                      className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {category.name}
                    </Link>
                  ))}
                  {remainingCategories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/category/${category.slug}`}
                      className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {category.name}
                    </Link>
                  ))}
                </>
              )}
              
              {/* Mobile Favorites and User Dropdown */}
              <div className="pt-4 border-t border-gray-200 space-y-2">
                <div className="relative">
                  <FavoritesCounter />
                </div>
                <div className="w-full">
                  <UserDropdown isLoggedIn={isLoggedIn} userName={user?.name || undefined} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
