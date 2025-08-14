import type { Metadata } from 'next';

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  
  return {
    title: `Article - GlobalEye News`,
    description: 'Article description',
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  
  return (
    <article className="min-h-screen">
      <div className="bg-white border-b border-gray-200">
        <div className="container-custom py-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Article Title
            </h1>
            <p className="text-gray-600 mt-4">
              This is a placeholder article page for build time.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
