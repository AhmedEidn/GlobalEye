'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface FavoriteArticle {
  id: string;
  title?: string;
  excerpt?: string;
  image?: string;
  category?: string;
  publishedDate?: string;
  slug?: string;
  addedAt: string;
}

interface FavoriteButtonProps {
  articleId: string;
  article?: {
    id: string;
    title: string;
    excerpt: string;
    image: string;
    category: string;
    publishedDate: string;
    slug: string;
  };
}

export default function FavoriteButton({ articleId, article }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if article is already in favorites
    const favorites = getFavorites();
    setIsFavorite(favorites.some((fav: FavoriteArticle) => fav.id === articleId));
  }, [articleId]);

  const getFavorites = (): FavoriteArticle[] => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem('favorites');
    return stored ? JSON.parse(stored) : [];
  };

  const saveFavorites = (favorites: FavoriteArticle[]): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('favorites', JSON.stringify(favorites));
  };

  const checkLoginStatus = (): boolean => {
    // Check if user is logged in (you can modify this logic based on your auth system)
    if (typeof window === 'undefined') return false;
    
    // For now, we'll check if there's a user token or session
    // You can replace this with your actual authentication check
    const userToken = localStorage.getItem('userToken');
    const userSession = localStorage.getItem('userSession');
    
    return !!(userToken || userSession);
  };

  const toggleFavorite = (): void => {
    // Check if user is logged in
    if (!checkLoginStatus()) {
      // Redirect to login page
      router.push('/login');
      return;
    }

    const favorites = getFavorites();
    
    if (isFavorite) {
      // Remove from favorites
      const updatedFavorites = favorites.filter((fav: FavoriteArticle) => fav.id !== articleId);
      saveFavorites(updatedFavorites);
      setIsFavorite(false);
    } else {
      // Add to favorites - we need the article data
      if (article) {
        const newFavorite: FavoriteArticle = {
          ...article,
          addedAt: new Date().toISOString()
        };
        saveFavorites([...favorites, newFavorite]);
        setIsFavorite(true);
      } else {
        // If no article data, create a minimal favorite entry
        const newFavorite: FavoriteArticle = {
          id: articleId,
          addedAt: new Date().toISOString()
        };
        saveFavorites([...favorites, newFavorite]);
        setIsFavorite(true);
      }
    }

    // Dispatch custom event to update counters
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('favorites-updated'));
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      className={`p-3 rounded-full transition-all duration-200 hover:scale-110 ${
        isFavorite 
          ? 'text-red-500 hover:text-red-600' 
          : 'text-gray-400 hover:text-red-500'
      }`}
      title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <svg
        className="w-6 h-6"
        fill={isFavorite ? 'currentColor' : 'none'}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
        />
      </svg>
    </button>
  );
}
