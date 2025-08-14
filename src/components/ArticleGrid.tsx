"use client";

import type { Article } from "@/lib/types";
import { useEffect, useRef, useState } from "react";
import ArticleCard from "./ArticleCard";

interface ArticleGridProps {
  articles: Article[];
}

const INITIAL_DESKTOP_COUNT = 9; // 3x3 grid
const INITIAL_MOBILE_COUNT = 6;  // 1x6 grid
const LOAD_INCREMENT = 9;        // Load in balanced chunks

export default function ArticleGrid({ articles }: ArticleGridProps) {
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_DESKTOP_COUNT);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Adjust initial count based on viewport once on mount
    if (typeof window !== "undefined") {
      const isMobile = window.innerWidth < 768; // md breakpoint
      setVisibleCount(isMobile ? INITIAL_MOBILE_COUNT : INITIAL_DESKTOP_COUNT);
    }
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + LOAD_INCREMENT, articles.length));
  };

  const visibleArticles = articles.slice(0, visibleCount);
  const hasMore = visibleCount < articles.length;

  useEffect(() => {
    if (!hasMore) return;
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    let isThrottled = false;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !isThrottled) {
          isThrottled = true;
          setIsLoadingMore(true);
          handleLoadMore();
          // Small throttle window to avoid rapid consecutive triggers
          setTimeout(() => {
            setIsLoadingMore(false);
            isThrottled = false;
          }, 300);
        }
      },
      { root: null, rootMargin: "200px", threshold: 0 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {visibleArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      {hasMore && (
        <div className="text-center mt-4">
          <div ref={sentinelRef} className="h-6" />
          {isLoadingMore && (
            <div className="flex items-center justify-center mt-2">
              <span className="sr-only">Loading</span>
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}


