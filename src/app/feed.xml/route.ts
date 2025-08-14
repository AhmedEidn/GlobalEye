import { NextResponse } from 'next/server';

export async function GET() {
  // Return empty RSS feed for build time
  const emptyRss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>GlobalEye News</title>
    <description>Latest news and insights from around the world</description>
    <link>https://globaleye.live</link>
    <atom:link href="https://globaleye.live/feed.xml" rel="self" type="application/rss+xml" />
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  </channel>
</rss>`;

  return new NextResponse(emptyRss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
