import { getArticles } from '@/lib/utils';
import { NextResponse } from 'next/server';

export async function GET() {
  const articles = await getArticles();
  const baseUrl = 'https://globaleye.live';

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  ${articles
    .map(
      (article) => `
  <url>
    <loc>${baseUrl}/article/${article.slug}</loc>
    <news:news>
      <news:publication>
        <news:name>GlobalEye News</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${new Date((article as any).published_at || (article as any).created_at).toISOString()}</news:publication_date>
      <news:title><![CDATA[${article.title}]]></news:title>
      <news:keywords>${(article as any).category || ''}, news, ${((article as any).tags || []).join(', ')}</news:keywords>
    </news:news>
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
