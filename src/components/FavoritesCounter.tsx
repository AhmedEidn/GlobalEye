'use client';

import { useState, useEffect } from 'react';

export default function FavoritesCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      if (typeof window === 'undefined') return;
      
      try {
        const stored = localStorage.getItem('globaleye-favorites');
        if (stored) {
          const favorites = JSON.parse(stored);
          setCount(favorites.length);
        } else {
          setCount(0);
        }
      } catch (error) {
        setCount(0);
      }
    };

    // Update count on mount
    updateCount();

    // Listen for storage changes
    const handleStorageChange = () => {
      updateCount();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Custom event for when favorites change within the same tab
    window.addEventListener('favorites-updated', updateCount);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('favorites-updated', updateCount);
    };
  }, []);

  if (count === 0) return null;

  return (
    <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
      {count > 99 ? '99+' : count}
    </span>
  );
}
