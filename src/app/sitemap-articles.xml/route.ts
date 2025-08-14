import { getArticles } from '@/lib/utils';
import { NextResponse } from 'next/server';

export async function GET() {
  const articles = await getArticles();
  const baseUrl = 'https://globaleye.live';

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${articles
    .map(
      (article) => `
  <url>
    <loc>${baseUrl}/article/${article.slug}</loc>
    <lastmod>${new Date((article as any).published_at || (article as any).created_at).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`
    )
    .join('')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
