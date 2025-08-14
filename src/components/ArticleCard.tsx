import type { Article } from '@/lib/types';
import { formatDate } from '@/lib/date-utils';
import Image from 'next/image';
import Link from 'next/link';
import FavoriteButton from './FavoriteButton';

interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'featured' | 'compact';
}

export default function ArticleCard({ article, variant = 'default' }: ArticleCardProps) {
  const favoriteArticle = {
    id: article.id,
    title: article.title,
    excerpt: (article as any).excerpt ?? '',
    image: (article as any).image || (article as any).featured_image_url || '/og-image.jpg',
    category: (article as any).category || (article as any).category_id || 'general',
    publishedDate: (article as any).publishedDate || (article as any).published_at || (article as any).created_at,
    slug: article.slug,
  };

  if (variant === 'featured') {
    return (
      <article className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
        <Link href={`/article/${article.slug}`}>
          <div className="relative h-64 md:h-80">
            <Image
              src={article.featured_image_url || '/og-image.jpg'}
              alt={article.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
            <h2 className="text-xl md:text-2xl font-bold line-clamp-2 group-hover:text-blue-300 transition-colors">
              {article.title}
            </h2>
            <p className="text-gray-200 line-clamp-2 mt-2">
              {article.excerpt}
            </p>
          </div>
        </Link>
        <div className="absolute top-4 right-4">
          <FavoriteButton articleId={article.id} article={favoriteArticle} />
        </div>
      </article>
    );
  }

  if (variant === 'compact') {
    return (
      <article className="group flex space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
        <div className="relative w-20 h-20 flex-shrink-0">
          <Image
            src={article.featured_image_url || '/og-image.jpg'}
            alt={article.title}
            fill
            className="object-cover rounded-md"
            sizes="80px"
            priority
          />
        </div>
        <div className="flex-1 min-w-0">
          <Link href={`/article/${article.slug}`}>
            <h3 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
              {article.title}
            </h3>
          </Link>
          <p className="text-xs text-gray-600 line-clamp-2 mt-1">
            {article.excerpt}
          </p>
        </div>
        <div className="flex-shrink-0">
          <FavoriteButton articleId={article.id} article={favoriteArticle} />
        </div>
      </article>
    );
  }

  // Default variant
  return (
    <article className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="relative">
        <Link href={`/article/${article.slug}`}>
          <div className="relative h-48">
            <Image
              src={article.featured_image_url || '/og-image.jpg'}
              alt={article.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
          </div>
        </Link>
        <div className="absolute top-3 right-3">
          <FavoriteButton articleId={article.id} article={favoriteArticle} />
        </div>
      </div>
      <div className="p-4">
        <Link href={`/article/${article.slug}`}>
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
            {article.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-3 mt-2">
            {article.excerpt}
          </p>
        </Link>
        
        {/* Author and Date */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>By {(article as any).author_name || 'Unknown Author'}</span>
            <span>{formatDate((article as any).published_at || (article as any).created_at)}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
