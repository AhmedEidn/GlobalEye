import axios from 'axios';

export interface TrendingTopic {
  title: string;
  traffic: string;
  image?: string;
  articles?: string[];
}

export interface TrendingSearch {
  title: string;
  traffic: string;
  image?: string;
  articles?: string[];
}

export interface TrendingQuery {
  query: string;
  value: number;
  formattedValue: string;
}

export interface TrendingData {
  trendingSearches: TrendingSearch[];
  trendingQueries: TrendingQuery[];
  realtimeTrends: TrendingTopic[];
}

/**
 * Get trending topics from Google Trends
 * This uses a free service that scrapes Google Trends data
 */
export async function getGoogleTrends(category?: string): Promise<string[]> {
  try {
    // Use a free Google Trends API service
    const response = await axios.get('https://trends.google.com/trends/api/dailytrends', {
      params: {
        hl: 'en-US',
        tz: '-120',
        geo: 'US',
        ns: '15'
      },
      timeout: 10000
    });

    // Parse the response (Google Trends returns data with ")]}'" prefix)
    let data = response.data;
    if (data.startsWith(")]}'")) {
      data = data.substring(4);
    }

    const trendsData = JSON.parse(data);
    
    if (trendsData.default && trendsData.default.trendingSearchesDays) {
      const today = trendsData.default.trendingSearchesDays[0];
      if (today && today.trendingSearches) {
        return today.trendingSearches
          .map((item: any) => item.title?.query || '')
          .filter((title: string) => title.length > 10 && title.length < 100)
          .slice(0, 10);
      }
    }

    // Fallback to category-specific trending topics
    return getCategoryTrendingTopics(category);
  } catch (error) {
    console.log('⚠️ Google Trends API not available, using predefined topics');
    return getCategoryTrendingTopics(category);
  }
}

/**
 * Get trending topics for specific categories
 */
function getCategoryTrendingTopics(category?: string): string[] {
  const allTrendingTopics = {
    world: [
      'climate change action', 'global economic recovery', 'international diplomacy',
      'sustainable development goals', 'global health initiatives', 'cultural exchange programs',
      'ocean conservation efforts', 'indigenous rights movements', 'cross-border collaboration',
      'global education reform', 'international trade agreements', 'world peace initiatives',
      'refugee crisis solutions', 'global vaccine distribution', 'international space cooperation'
    ],
    technology: [
      'artificial intelligence breakthroughs', 'quantum computing advances', '5G network expansion',
      'blockchain innovations', 'cybersecurity threats', 'augmented reality applications',
      'machine learning developments', 'cloud computing trends', 'IoT device proliferation',
      'digital transformation', 'edge computing solutions', 'green technology adoption',
      'metaverse development', 'web3 evolution', 'autonomous vehicles progress'
    ],
    health: [
      'mental health awareness', 'precision medicine advances', 'telemedicine evolution',
      'vaccine development', 'nutritional science', 'preventive healthcare',
      'genetic therapy', 'holistic wellness', 'digital health platforms',
      'workplace wellness', 'aging population health', 'global health security',
      'mental health apps', 'fitness technology', 'sleep science research'
    ],
    business: [
      'remote work transformation', 'sustainable business practices', 'digital transformation',
      'supply chain resilience', 'ESG investing trends', 'startup ecosystem',
      'e-commerce growth', 'fintech innovations', 'workplace diversity',
      'circular economy', 'social impact business', 'green finance',
      'cryptocurrency adoption', 'NFT market trends', 'sustainable investing'
    ],
    entertainment: [
      'streaming platform wars', 'virtual reality entertainment', 'gaming industry growth',
      'social media influence', 'celebrity culture evolution', 'digital art market',
      'live performance technology', 'content creation trends', 'cross-cultural entertainment',
      'interactive storytelling', 'esports expansion', 'creative collaboration tools',
      'AI in entertainment', 'virtual concerts', 'gaming accessibility'
    ],
    science: [
      'space exploration missions', 'climate research findings', 'biotechnology breakthroughs',
      'renewable energy innovations', 'materials science advances', 'astrophysics discoveries',
      'genetic research progress', 'oceanography studies', 'atmospheric science',
      'quantum physics applications', 'nanotechnology developments', 'scientific collaboration',
      'mars colonization', 'fusion energy', 'genetic engineering ethics'
    ],
    lifestyle: [
      'sustainable living practices', 'digital wellness', 'work-life balance',
      'minimalist lifestyle', 'eco-friendly choices', 'personal development',
      'stress management', 'healthy habits', 'mindful living',
      'community building', 'urban farming', 'conscious consumerism',
      'mental wellness', 'fitness trends', 'sustainable fashion'
    ],
    celebrities: [
      'celebrity philanthropy', 'social media influence', 'celebrity activism',
      'creative collaborations', 'celebrity business ventures', 'artistic expression',
      'celebrity wellness journeys', 'cultural impact', 'mentorship programs',
      'social responsibility', 'career evolution', 'public image management',
      'celebrity podcasts', 'influencer marketing', 'celebrity sustainability'
    ]
  };

  if (category && allTrendingTopics[category as keyof typeof allTrendingTopics]) {
    return allTrendingTopics[category as keyof typeof allTrendingTopics];
  }

  // Return world topics as default
  return allTrendingTopics.world;
}

/**
 * Get trending searches for a specific topic
 */
export async function getTrendingSearches(topic: string): Promise<string[]> {
  try {
    const response = await axios.get(`https://trends.google.com/trends/api/explore`, {
      params: {
        hl: 'en-US',
        tz: '-120',
        req: JSON.stringify({
          comparisonItem: [{
            keyword: topic,
            geo: 'US',
            time: 'today 12-m'
          }],
          category: 0,
          property: ''
        })
      },
      timeout: 10000
    });

    let data = response.data;
    if (data.startsWith(")]}'")) {
      data = data.substring(4);
    }

    const trendsData = JSON.parse(data);
    
    if (trendsData.default && trendsData.default.relatedQueries) {
      const relatedQueries = trendsData.default.relatedQueries[0];
      if (relatedQueries && relatedQueries.rankedList) {
        return relatedQueries.rankedList[0].rankedKeyword
          .map((item: any) => item.query)
          .filter((query: string) => query.length > 5 && query.length < 50)
          .slice(0, 5);
      }
    }

    return [];
  } catch (error) {
    console.log('⚠️ Could not fetch trending searches for:', topic);
    return [];
  }
}

/**
 * Get real-time trending topics
 */
export async function getRealTimeTrends(): Promise<string[]> {
  try {
    const response = await axios.get('https://trends.google.com/trends/api/realtimetrends', {
      params: {
        hl: 'en-US',
        tz: '-120',
        geo: 'US',
        cat: 'all',
        fi: '0',
        fs: '0',
        ri: '300',
        rs: '20',
        sort: '0'
      },
      timeout: 10000
    });

    let data = response.data;
    if (data.startsWith(")]}'")) {
      data = data.substring(4);
    }

    const trendsData = JSON.parse(data);
    
    if (trendsData.storySummaries && trendsData.storySummaries.trendingStories) {
      return trendsData.storySummaries.trendingStories
        .map((story: any) => story.title || '')
        .filter((title: string) => title.length > 10 && title.length < 100)
        .slice(0, 10);
    }

    return [];
  } catch (error) {
    console.log('⚠️ Could not fetch real-time trends');
    return [];
  }
}

/**
 * Get trending topics with fallback strategy
 */
export async function getTrendingTopicsWithFallback(category: string): Promise<string[]> {
  try {
    // Try Google Trends first
    const googleTrends = await getGoogleTrends(category);
    if (googleTrends.length > 0) {
      console.log(`📈 Found ${googleTrends.length} trending topics from Google Trends for ${category}`);
      return googleTrends;
    }

    // Try real-time trends
    const realTimeTrends = await getRealTimeTrends();
    if (realTimeTrends.length > 0) {
      console.log(`📈 Found ${realTimeTrends.length} real-time trending topics for ${category}`);
      return realTimeTrends;
    }

    // Fallback to predefined topics
    console.log(`⚠️ Using predefined trending topics for ${category}`);
    return getCategoryTrendingTopics(category);
  } catch (error) {
    console.log(`⚠️ Error getting trending topics, using predefined for ${category}`);
    return getCategoryTrendingTopics(category);
  }
}
