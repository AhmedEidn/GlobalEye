'use client';

import { useEffect } from 'react';

interface ArticleAnalyticsProps {
  articleTitle: string;
  category: string;
  author: string;
}

export default function ArticleAnalytics({ articleTitle, category, author }: ArticleAnalyticsProps) {
  useEffect(() => {
    // Track article view when component mounts
    if (typeof window !== 'undefined' && (window as any).trackArticleView) {
      (window as any).trackArticleView(articleTitle, category, author);
      
      // Track page view
      (window as any).gtag('event', 'page_view', {
        page_title: articleTitle,
        page_location: window.location.href,
        page_category: category
      });
    }
  }, [articleTitle, category, author]);

  return null; // This component doesn't render anything
}
