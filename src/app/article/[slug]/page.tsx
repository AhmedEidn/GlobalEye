import ArticleAnalytics from '@/components/ArticleAnalytics';
import ArticleCard from '@/components/ArticleCard';
import FavoriteButton from '@/components/FavoriteButton';
import ShareButtons from '@/components/ShareButtons';
import { categoryColors, generateSEOProps, getArticleBySlug, getArticles } from '@/lib/utils';
import { formatDate } from '@/lib/date-utils';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  
  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  const seoProps = generateSEOProps(
    article.title,
    article.excerpt ?? undefined,
    article.featured_image_url ?? undefined,
    `https://globaleye-news.com/article/${article.slug}`,
    'article'
  );

  return {
    title: seoProps.title,
    description: seoProps.description,
    openGraph: {
      title: seoProps.title,
      description: seoProps.description,
      images: [{ url: seoProps.image }],
      type: 'article',
      publishedTime: article.published_at ?? article.created_at,
    },
    twitter: {
      card: 'summary_large_image',
      title: seoProps.title,
      description: seoProps.description,
      images: [seoProps.image],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  
  if (!article) {
    notFound();
  }

  const allArticles = await getArticles();
  const relatedArticles = allArticles
    .filter(a => a.category_id === article.category_id && a.id !== article.id)
    .slice(0, 3);

  // Get category name from the article's category field or use a default
  const categoryName = (article as any).category || 'world';
  const categoryKey = categoryName;
  const categoryColor = categoryColors[categoryName] || 'bg-gray-100 text-gray-800';
  const tags: string[] = (article as any).tags ?? [];

  return (
    <article className="min-h-screen">
      {/* Google Analytics Tracking */}
      <ArticleAnalytics 
        articleTitle={article.title}
        category={categoryName}
        author={(article as any).author_name || 'Unknown Author'}
      />
      
      {/* Article Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-custom py-8">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="mb-6">
              <ol className="flex items-center space-x-2 text-sm text-gray-500">
                <li>
                  <Link href="/" className="hover:text-blue-600">Home</Link>
                </li>
                <li>/</li>
                <li>
                  <Link href={`/category/${categoryKey}`} className="hover:text-blue-600 capitalize">
                    {categoryKey}
                  </Link>
                </li>
                <li>/</li>
                <li className="text-gray-900 truncate">{article.title}</li>
              </ol>
            </nav>



            {/* Article Title and Favorite Button */}
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight flex-1">
                {article.title}
              </h1>
              <div className="ml-4 mt-2">
                <FavoriteButton 
                  articleId={article.id} 
                  article={{
                    id: article.id,
                    title: article.title,
                    excerpt: article.excerpt || '',
                    image: article.featured_image_url || '',
                    category: categoryName,
                    publishedDate: article.published_at || article.created_at,
                    slug: article.slug,
                  }}
                />
              </div>
            </div>


          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="bg-white">
        <div className="container-custom py-4">
          <div className="max-w-4xl mx-auto">
            {/* Featured Image */}
            <div className="relative h-64 md:h-96 mb-4 rounded-lg overflow-hidden">
              <Image
                src={article.featured_image_url || '/og-image.jpg'}
                alt={article.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>

            {/* Article Body */}
            <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-strong:text-gray-900 prose-blockquote:border-l-blue-600 prose-blockquote:bg-gray-50 prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:rounded-r-lg">
              {article.content ? (
                article.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-6 leading-relaxed">
                    {paragraph}
                  </p>
                ))
              ) : (
                <p className="text-gray-500 italic">Content not available</p>
              )}
            </div>

            {/* Article Tags */}
            {tags.length > 0 && (
              <div className="mt-8 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Author and Date Info */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center space-x-4">
                  <span>By <span className="font-medium text-gray-900">{(article as any).author_name || 'Unknown Author'}</span></span>
                  <span>•</span>
                  <span>{formatDate(article.published_at || article.created_at)}</span>
                </div>
                <div className="text-gray-400">
                  Reading time: {Math.ceil((article.content?.split(/\s+/).length || 0) / 200)} min read
                </div>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="mt-3">
              <ShareButtons title={article.title} slug={article.slug} />
            </div>
          </div>
        </div>
      </div>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Related Articles</h2>
              <p className="text-gray-600">More stories you might be interested in</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedArticles.map((relatedArticle) => (
                <ArticleCard key={relatedArticle.id} article={relatedArticle} />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
