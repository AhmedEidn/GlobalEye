import { getArticles } from '@/lib/utils';
import { NextResponse } from 'next/server';

export async function GET() {
  const articles = await getArticles();
  const baseUrl = 'https://globaleye.live';

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>GlobalEye News</title>
    <description>Latest news and insights from around the world</description>
    <link>${baseUrl}</link>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${articles
      .map(
        (article) => `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <description><![CDATA[${article.excerpt}]]></description>
      <link>${baseUrl}/article/${article.slug}</link>
      <guid>${baseUrl}/article/${article.slug}</guid>
      <pubDate>${new Date((article as any).published_at || (article as any).created_at).toUTCString()}</pubDate>
      <category>${(article as any).category || (article as any).category_id || ''}</category>
      ${((article as any).tags || []).map((tag: string) => `<category>${tag}</category>`).join('')}
    </item>`
      )
      .join('')}
  </channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
