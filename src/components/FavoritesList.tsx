'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import FavoriteButton from './FavoriteButton';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  publishedDate: string;
  slug: string;
  addedAt?: string;
}

export default function FavoritesList() {
  const [favorites, setFavorites] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkLoginStatus();
    loadFavorites();
    
    // Listen for favorites updates
    const handleFavoritesUpdate = () => {
      loadFavorites();
    };
    
    window.addEventListener('favorites-updated', handleFavoritesUpdate);
    window.addEventListener('storage', handleFavoritesUpdate);
    
    return () => {
      window.removeEventListener('favorites-updated', handleFavoritesUpdate);
      window.removeEventListener('storage', handleFavoritesUpdate);
    };
  }, []);

  const checkLoginStatus = () => {
    if (typeof window === 'undefined') return;
    
    // Check if user is logged in (you can modify this logic based on your auth system)
    const userToken = localStorage.getItem('userToken');
    const userSession = localStorage.getItem('userSession');
    
    setIsLoggedIn(!!(userToken || userSession));
  };

  const loadFavorites = () => {
    if (typeof window === 'undefined') return;
    
    try {
      const stored = localStorage.getItem('favorites');
      if (stored) {
        const parsedFavorites = JSON.parse(stored);
        setFavorites(parsedFavorites);
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromFavorites = (articleId: string) => {
    const updatedFavorites = favorites.filter(fav => fav.id !== articleId);
    setFavorites(updatedFavorites);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      window.dispatchEvent(new Event('favorites-updated'));
    }
  };

  const clearAllFavorites = () => {
    setFavorites([]);
    
    if (typeof window !== 'undefined') {
      localStorage.removeItem('favorites');
      window.dispatchEvent(new Event('favorites-updated'));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // If not logged in, show login message
  if (!isLoggedIn) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto h-20 w-20 bg-blue-100 rounded-full flex items-center justify-center mb-6">
          <svg className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Login to Access Your Favorites</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Sign in to your account to save articles, create reading lists, and never lose track of the stories that matter to you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/login"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            Create Account
          </Link>
        </div>
      </div>
    );
  }

  // If no favorites, show empty state
  if (favorites.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto h-20 w-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <svg className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">No Favorites Yet</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Start building your reading list by saving articles that interest you. Click the heart icon on any article to add it to your favorites.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
        >
          Browse Articles
        </Link>
      </div>
    );
  }

  // Show favorites list
  return (
    <div className="space-y-6">
      {/* Header with clear all button */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          {favorites.length} {favorites.length === 1 ? 'article' : 'articles'} saved
        </p>
        {favorites.length > 0 && (
          <button
            onClick={clearAllFavorites}
            className="text-sm text-red-600 hover:text-red-700 font-medium transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Favorites grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {favorites.map((article) => (
          <div key={article.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="relative">
              <img
                src={article.image || '/og-image.jpg'}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2">
                <FavoriteButton articleId={article.id} article={article} />
              </div>
              <div className="absolute top-2 left-2">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {article.category}
                </span>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <span>{article.publishedDate}</span>
                {article.addedAt && (
                  <>
                    <span className="mx-2">•</span>
                    <span>Saved {new Date(article.addedAt).toLocaleDateString()}</span>
                  </>
                )}
              </div>
              
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                {article.title}
              </h3>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {article.excerpt}
              </p>
              
              <div className="flex items-center justify-between">
                <Link
                  href={`/article/${article.slug}`}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
                >
                  Read More →
                </Link>
                
                <button
                  onClick={() => removeFromFavorites(article.id)}
                  className="text-gray-400 hover:text-red-500 text-sm transition-colors"
                  title="Remove from favorites"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
