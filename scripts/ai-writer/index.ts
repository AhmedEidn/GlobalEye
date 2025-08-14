import { createClient } from '@supabase/supabase-js';
import axios from 'axios';
import crypto from 'crypto';
import dotenv from 'dotenv';
import fsSync from 'fs';
import fs from 'fs/promises';
import cron from 'node-cron';
import path from 'path';

// Load environment variables from .env.local only
dotenv.config({ path: '.env.local' });

// Configuration

const PEXELS_API_KEY = process.env.PEXELS_API_KEY;
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
const SITE_URL = process.env.SITE_URL || 'https://globaleye.live';
const DATA_ROOT = path.join(process.cwd(), 'src', 'data');

// Supabase Configuration
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl!, supabaseKey!);

// Categories to generate articles for
const CATEGORIES = [
  'world', 'technology', 'health', 'business', 
  'entertainment', 'science', 'lifestyle', 'celebrities'
];

// Import Google Trends functionality
import { getTrendingTopicsWithFallback } from '../../src/lib/google-trends';

// Real author names for articles (English and International only)
const AUTHOR_NAMES = [
  // English names
  'Sarah Johnson', 'Michael Chen', 'Emily Rodriguez', 'David Thompson', 'Lisa Wang',
  'James Wilson', 'Maria Garcia', 'Robert Brown', 'Jennifer Lee', 'Christopher Davis',
  'Amanda Martinez', 'Daniel Anderson', 'Jessica Taylor', 'Matthew White', 'Nicole Clark',
  'Andrew Lewis', 'Stephanie Hall', 'Kevin Young', 'Rachel Green', 'Steven King',
  'Elizabeth Taylor', 'William Smith', 'Olivia Davis', 'Benjamin Wilson', 'Sophia Brown',
  'Alexander Johnson', 'Isabella Garcia', 'Ethan Martinez', 'Mia Anderson', 'Noah Thompson',
  
  // International names
  'Sofia Ivanova', 'Hiroshi Tanaka', 'Priya Patel', 'Carlos Silva', 'Yuki Yamamoto',
  'Rajesh Kumar', 'Isabella Rossi', 'Lucas Schmidt', 'Aisha Rahman', 'Marcus Johnson',
  'Elena Popov', 'Kenji Watanabe', 'Fatima Zahra', 'Alexander Petrov', 'Mei Ling',
  'Viktor Novak', 'Anastasia Petrova', 'Lars Andersen', 'Ingrid Bergman', 'Pierre Dubois',
  'Marie Laurent', 'Giuseppe Rossi', 'Valentina Bianchi', 'Hans Mueller', 'Greta Schmidt',
  'Miguel Rodriguez', 'Carmen Lopez', 'Fernando Santos', 'Ana Costa', 'João Silva'
];

// Article structure interface
interface AIArticle {
  id: string;
  title: string;
  slug: string;
  summary: string[];
  body: string;
  metaDescription: string;
  seoKeyword: string;
  publishDate: string;
  category: string;
  image?: {
    url: string;
    alt: string;
    prompt: string;
  };
}

// Get trending topics from various sources
async function getTrendingTopics(category: string): Promise<string[]> {
  try {
    // Try Google Trends first (most reliable and free)
    try {
      const googleTrends = await getTrendingTopicsWithFallback(category);
      if (googleTrends.length > 0) {
        console.log(`📈 Found ${googleTrends.length} trending topics from Google Trends for ${category}`);
        return googleTrends;
      }
    } catch (error) {
      console.log(`⚠️ Google Trends not available for ${category}`);
    }
    
    // Fallback to News API
    const newsApiUrl = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${process.env.NEWS_API_KEY || 'demo'}`;
    
    try {
      const response = await axios.get(newsApiUrl, { timeout: 10000 });
      if (response.data && response.data.articles) {
        const trendingTopics = response.data.articles
          .slice(0, 5)
          .map((article: any) => article.title)
          .filter((title: string) => title && title.length > 20 && title.length < 100);
        
        if (trendingTopics.length > 0) {
          console.log(`📰 Found ${trendingTopics.length} news topics for ${category}`);
          return trendingTopics;
        }
      }
    } catch (error) {
      console.log(`⚠️ News API not available for ${category}`);
    }
    
    // Final fallback to predefined trending topics
    console.log(`⚠️ Using predefined trending topics for ${category}`);
    return getCategoryTrendingTopics(category);
  } catch (error) {
    console.log(`⚠️ Error getting trending topics, using predefined for ${category}`);
    return getCategoryTrendingTopics(category);
  }
}

// Helper function for predefined topics
function getCategoryTrendingTopics(category: string): string[] {
  const allTrendingTopics = {
    world: [
      'climate change action', 'global economic recovery', 'international diplomacy',
      'sustainable development goals', 'global health initiatives', 'cultural exchange programs',
      'ocean conservation efforts', 'indigenous rights movements', 'cross-border collaboration',
      'global education reform', 'international trade agreements', 'world peace initiatives',
      'refugee crisis solutions', 'global vaccine distribution', 'international space cooperation'
    ],
    technology: [
      'Quantum computing enables breakthrough discoveries',
      'Sustainable tech solutions address environmental challenges',
      'Digital transformation accelerates across all sectors',
      'Innovation hubs drive regional economic development'
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
      'virtual concerts', 'gaming accessibility'
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

  return allTrendingTopics[category as keyof typeof allTrendingTopics] || allTrendingTopics.world;
}

// Call Ollama API for text generation
async function callOllamaAPI(prompt: string, maxLength: number = 1000): Promise<string> {
  try {
    const response = await axios.post(
      'http://localhost:11434/api/generate',
      {
        model: 'qwen2.5:0.5b',
        prompt: prompt,
        stream: false,
        options: {
          num_predict: maxLength,
          temperature: 0.7,
          top_p: 0.9,
          repeat_penalty: 1.1
        }
      },
      {
        timeout: 120000 // 2 minutes
      }
    );

    if (response.data && response.data.response) {
      return response.data.response;
    } else {
      throw new Error('Invalid response format from Ollama API');
    }
  } catch (error: any) {
    if (error.code === 'ECONNREFUSED') {
      throw new Error('Ollama is not running. Please start Ollama with: ollama serve');
    } else if (error.response?.status === 404) {
      throw new Error('Model not found. Please download with: ollama pull llama3.1');
    } else {
      throw new Error(`Ollama API error: ${error.message}`);
    }
  }
}

// Generate article using Ollama API
async function generateArticleWithOllama(category: string, headline: string): Promise<AIArticle> {
  try {
    console.log(`🤖 Generating article for ${category}: ${headline}`);
    
    // Generate article content with human-like quality - NO AI PATTERNS
    const articlePrompt = `Write a professional news article about "${headline}" in the ${category} category. 

Write this exactly as a human journalist would - natural, engaging, and informative.

IMPORTANT REQUIREMENTS:
- Start directly with the article content - NO introductions or explanations
- Write 800-1200 words with natural flow
- Use varied sentence structures and natural transitions
- Include relevant insights and real-world examples
- Write in active voice with engaging storytelling
- Make it sound like it was written by a human who cares about the topic
- Avoid any robotic or formulaic patterns

FORBIDDEN PHRASES (DO NOT USE):
- "in todays" or "in today's"
- "The Future of" at the beginning
- "Here are some key insights"
- "Certainly" or "Here's"
- "Let me" or "Allow me"
- "I'll create" or "I will create"
- Any AI-like patterns or explanations

Write the article directly in plain text format without any formatting or special characters.`;

    const articleContent = await callOllamaAPI(articlePrompt, 1200);
    
    // Generate image prompt
    const imagePrompt = `A professional news photo for an article about ${headline} in the ${category} category. The image should be relevant and engaging.`;

    const imagePromptResponse = await callOllamaAPI(imagePrompt, 100);

    // Parse and structure the content
    const article = parseGeneratedContent(articleContent, category, headline);
    article.image = {
      url: '', // Will be filled by image fetching
      alt: `${headline} - ${category} news`,
      prompt: imagePromptResponse.trim()
    };

    return article;
  } catch (error) {
    console.error(`❌ Error generating article for ${category}:`, error);
    throw error;
  }
}

// Parse content into structured article
function parseGeneratedContent(content: string, category: string, headline: string): AIArticle {
  // Extract title from content or use headline
  const title = extractTitle(content, headline) || headline;
  
  // Generate slug from title
  const slug = generateSlug(title);
  
  // Extract summary (first 2-3 sentences)
  const summary = extractSummary(content);
  
  // Extract body content
  const body = extractBody(content);
  
  // Generate meta description
  const metaDescription = generateMetaDescription(summary, title);
  
  // Extract or generate SEO keyword
  const seoKeyword = extractSEOKeyword(content, title);
  
  return {
    id: crypto.randomUUID(),
    title,
    slug,
    summary,
    body,
    metaDescription,
    seoKeyword,
    publishDate: new Date().toISOString(),
    category
  };
}

// Enhanced content cleaning function - NO SYMBOLS ALLOWED
function cleanMarkdownContent(content: string): string {
  return content
    // Remove ALL Markdown headers (any number of #)
    .replace(/^#{1,10}\s+/gm, '')
    // Remove ALL bold formatting
    .replace(/\*\*(.*?)\*\*/g, '$1')
    // Remove ALL italic formatting
    .replace(/\*(.*?)\*/g, '$1')
    // Remove ALL code formatting
    .replace(/`(.*?)`/g, '$1')
    // Remove ALL quotes
    .replace(/^["']|["']$/gm, '')
    // Remove ALL bullet points and dashes
    .replace(/^- .*$/gm, '')
    .replace(/^— .*$/gm, '')
    .replace(/^– .*$/gm, '')
    // Remove ALL brackets and special characters
    .replace(/^\[.*?\]$/gm, '')
    .replace(/^\(.*?\)$/gm, '')
    .replace(/^\{.*?\}$/gm, '')
    // Remove ALL specific instruction lines
    .replace(/^(Title|Headline|Meta Description|Summary|Body|Requirements|IMPORTANT|Write exactly|Avoid any|Use natural|Include real-world|Write in active|Avoid repetitive|Make it sound|Include proper|Write the article|This article|Crafted|Human-like|Professional):.*$/gm, '')
    // Remove ALL remaining special characters that might be used for formatting
    .replace(/^[~!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?].*$/gm, '')
    // Remove ALL empty lines and clean up
    .replace(/\n\s*\n/g, '\n\n')
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .trim();
}

// Helper functions for content parsing
function extractTitle(content: string, headline: string): string | null {
  // Clean markdown formatting and extract clean title
  const lines = content.split('\n').filter(line => line.trim().length > 0);
  
  // Look for the best title candidate
  let bestTitle = '';
  
  for (const line of lines.slice(0, 15)) {
    const trimmed = line.trim();
    
    // Skip lines that are clearly not titles
    if (trimmed.startsWith('Title:') || 
        trimmed.startsWith('Headline:') ||
        trimmed.startsWith('Meta Description:') ||
        trimmed.startsWith('Summary:') ||
        trimmed.startsWith('Requirements:') ||
        trimmed.startsWith('- ') ||
        trimmed.startsWith('Write the article') ||
        trimmed.startsWith('IMPORTANT:') ||
        trimmed.startsWith('Write exactly') ||
        trimmed.startsWith('Avoid any') ||
        trimmed.startsWith('Use natural') ||
        trimmed.startsWith('Include real-world') ||
        trimmed.startsWith('Write in active') ||
        trimmed.startsWith('Avoid repetitive') ||
        trimmed.startsWith('Make it sound') ||
        trimmed.startsWith('Include proper') ||
        trimmed.startsWith('FORBIDDEN') ||
        trimmed.startsWith('DO NOT')) {
      continue;
    }
    
    // Clean the potential title - remove ALL symbols and formatting
    let cleanTitle = trimmed
      // Remove ALL headers (any number of #)
      .replace(/^#{1,10}\s*/, '')
      // Remove ALL bold formatting
      .replace(/^\*\*(.*?)\*\*$/, '$1')
      // Remove ALL italic formatting
      .replace(/^\*(.*?)\*$/, '$1')
      // Remove ALL code formatting
      .replace(/^`(.*?)`$/, '$1')
      // Remove ALL quotes
      .replace(/^["']|["']$/g, '')
      // Remove ALL prefixes and unwanted text
      .replace(/^Title:.*$/g, '')
      .replace(/^Headline:.*$/g, '')
      .replace(/^News Article:.*$/g, '')
      .replace(/^Update.*$/g, '')
      .replace(/^Meta Description:.*$/g, '')
      .replace(/^Feel free.*$/g, '')
      .replace(/^Why This Research Matters:.*$/g, '')
      .replace(/^A Personal Example.*$/g, '')
      .replace(/^The Power of.*$/g, '')
      .replace(/^Data-Driven.*$/g, '')
      .replace(/^A Celeb-Driven.*$/g, '')
      .replace(/^New Science Guide:.*$/g, '')
      .replace(/^Embracing.*$/g, '')
      .replace(/^Discover Why.*$/g, '')
      .replace(/^Are Gaining.*$/g, '')
      .replace(/^The Future of.*$/g, '')
      .replace(/^Addressing.*$/g, '')
      .replace(/^World News:.*$/g, '')
      .replace(/^Diplomatic.*$/g, '')
      .replace(/^Signals.*$/g, '')
      .replace(/^New Era.*$/g, '')
      .replace(/^Fintech.*$/g, '')
      .replace(/^Innovations.*$/g, '')
      .replace(/^Democratize.*$/g, '')
      .replace(/^Financial.*$/g, '')
      .replace(/^Services.*$/g, '')
      .replace(/^Streaming.*$/g, '')
      .replace(/^Platforms.*$/g, '')
      .replace(/^Revolutionize.*$/g, '')
      .replace(/^Content.*$/g, '')
      .replace(/^Consumption.*$/g, '')
      .replace(/^Environmental.*$/g, '')
      .replace(/^Science.*$/g, '')
      .replace(/^Guides.*$/g, '')
      .replace(/^Policy.*$/g, '')
      .replace(/^Decisions.*$/g, '')
      .replace(/^Sustainable.*$/g, '')
      .replace(/^Living.*$/g, '')
      .replace(/^Practices.*$/g, '')
      .replace(/^Gaining.*$/g, '')
      .replace(/^Mainstream.*$/g, '')
      .replace(/^Appeal.*$/g, '')
      .replace(/^Celebrity.*$/g, '')
      .replace(/^Influence.*$/g, '')
      .replace(/^Drives.*$/g, '')
      .replace(/^Positive.*$/g, '')
      .replace(/^Social.*$/g, '')
      .replace(/^Change.*$/g, '')
      // Remove AI patterns and unwanted phrases
      .replace(/^Here are some.*$/g, '')
      .replace(/^Certainly.*$/g, '')
      .replace(/^Here's.*$/g, '')
      .replace(/^Here is.*$/g, '')
      .replace(/^I'd write.*$/g, '')
      .replace(/^I would write.*$/g, '')
      .replace(/^This is.*$/g, '')
      .replace(/^Let me.*$/g, '')
      .replace(/^Allow me.*$/g, '')
      .replace(/^I'll create.*$/g, '')
      .replace(/^I will create.*$/g, '')
      .replace(/^Making Memories.*$/g, '')
      .replace(/^The Future of Your.*$/g, '')
      .replace(/^The Future of.*$/g, '')
      .replace(/^in todays.*$/gi, '')
      .replace(/^in today's.*$/gi, '')
      // Remove ALL non-English characters and symbols
      .replace(/[^\x00-\x7F]/g, '') // Keep only ASCII characters
      // Remove ALL remaining special characters that might be used for formatting
      .replace(/^[~!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?].*$/g, '')
      .trim();
    
    // If this looks like a good title, use it
    if (cleanTitle.length >= 20 && cleanTitle.length <= 100 && 
        !cleanTitle.includes('###') && 
        !cleanTitle.includes('Title:') &&
        !cleanTitle.includes('Headline:') &&
        !cleanTitle.includes('Requirements:') &&
        !cleanTitle.includes('- ') &&
        !cleanTitle.includes('IMPORTANT:') &&
        !cleanTitle.includes('Write exactly') &&
        !cleanTitle.includes('Avoid any') &&
        !cleanTitle.includes('Use natural') &&
        !cleanTitle.includes('Include real-world') &&
        !cleanTitle.includes('Write in active') &&
        !cleanTitle.includes('Avoid repetitive') &&
        !cleanTitle.includes('Make it sound') &&
        !cleanTitle.includes('Include proper') &&
        !cleanTitle.includes('FORBIDDEN') &&
        !cleanTitle.includes('DO NOT')) {
      bestTitle = cleanTitle;
      break;
    }
  }
  
  // If no good title found, try to create one from the first meaningful line
  if (!bestTitle) {
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.length > 30 && trimmed.length < 80 &&
          !trimmed.startsWith('#') && 
          !trimmed.startsWith('Title:') &&
          !trimmed.startsWith('Headline:') &&
          !trimmed.startsWith('Meta Description:') &&
          !trimmed.startsWith('Summary:') &&
          !trimmed.startsWith('Requirements:') &&
          !trimmed.startsWith('- ') &&
          !trimmed.startsWith('IMPORTANT:') &&
          !trimmed.startsWith('Write exactly') &&
          !trimmed.startsWith('Avoid any') &&
          !trimmed.startsWith('Use natural') &&
          !trimmed.startsWith('Include real-world') &&
          !trimmed.startsWith('Write in active') &&
          !trimmed.startsWith('Avoid repetitive') &&
          !trimmed.startsWith('Make it sound') &&
          !trimmed.startsWith('Include proper')) {
        bestTitle = trimmed
          .replace(/^#{1,6}\s*/, '')
          .replace(/^["']|["']$/g, '')
          .replace(/^\*\*|\*\*$/g, '')
          .replace(/^\*|\*$/g, '')
          .replace(/^`|`$/g, '')
          .trim();
        break;
      }
    }
  }
  
  // If still no title, create one from the headline
  if (!bestTitle) {
    bestTitle = headline;
  }
  
  return bestTitle;
}

function extractSummary(content: string): string[] {
  // Clean content and extract meaningful summary
  const cleanContent = content
    .replace(/^#{1,6}\s*.*?\n/g, '') // Remove headers
    .replace(/^\*\*.*?\*\*/gm, '') // Remove bold text
    .replace(/^\*.*?\*/gm, '') // Remove italic text
    .replace(/^`.*?`/gm, '') // Remove code blocks
    .replace(/^Title:.*?\n/g, '') // Remove Title: lines
    .replace(/^Headline:.*?\n/g, '') // Remove Headline: lines
    .replace(/^Meta Description:.*?\n/g, '') // Remove Meta Description: lines
    .replace(/^Summary:.*?\n/g, '') // Remove Summary: lines
    .replace(/^News Article:.*?\n/g, '') // Remove News Article lines
    .replace(/^Update.*?\n/g, '') // Remove Update lines
    .replace(/^Feel free.*?\n/g, '') // Remove Feel free lines
    .replace(/^Requirements:.*$/gm, '') // Remove requirements
    .replace(/^- .*$/gm, '') // Remove bullet points
    .replace(/^IMPORTANT:.*$/gm, '') // Remove important notes
    .replace(/^Write exactly.*$/gm, '') // Remove instructions
    .replace(/^Avoid any.*$/gm, '') // Remove instructions
    .replace(/^Use natural.*$/gm, '') // Remove instructions
    .replace(/^Include real-world.*$/gm, '') // Remove instructions
    .replace(/^Write in active.*$/gm, '') // Remove instructions
    .replace(/^Avoid repetitive.*$/gm, '') // Remove instructions
    .replace(/^Make it sound.*$/gm, '') // Remove instructions
    .replace(/^Include proper.*$/gm, '') // Remove instructions
    .replace(/^Write the article.*$/gm, '') // Remove instructions
    .replace(/^This article is crafted.*$/gm, '') // Remove article notes
    .replace(/^---.*$/gm, '') // Remove separators
    // Remove ALL emojis and special symbols
    .replace(/[🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀]/g, '')
    .replace(/[•→]/g, '')
    // Remove ALL non-English characters and symbols
    .replace(/[^\x00-\x7F]/g, '') // Keep only ASCII characters
    .trim();
  
  const sentences = cleanContent
    .split(/[.!?]+/)
    .filter(s => {
      const trimmed = s.trim();
      return trimmed.length > 20 && 
             trimmed.length < 200 &&
             !trimmed.startsWith('Title:') &&
             !trimmed.startsWith('Headline:') &&
             !trimmed.startsWith('Meta Description:') &&
             !trimmed.startsWith('Summary:') &&
             !trimmed.startsWith('Requirements:') &&
             !trimmed.startsWith('- ') &&
             !trimmed.startsWith('IMPORTANT:') &&
             !trimmed.startsWith('Write exactly') &&
             !trimmed.startsWith('Avoid any') &&
             !trimmed.startsWith('Use natural') &&
             !trimmed.startsWith('Include real-world') &&
             !trimmed.startsWith('Write in active') &&
             !trimmed.startsWith('Avoid repetitive') &&
             !trimmed.startsWith('Make it sound') &&
             !trimmed.startsWith('Include proper') &&
             !trimmed.startsWith('Write the article') &&
             !trimmed.startsWith('This article is crafted');
    })
    .map(s => s.trim());
  
  return sentences.slice(0, 3);
}

function extractBody(content: string): string {
  // Clean and extract main content
  const lines = content.split('\n').filter(line => line.trim().length > 0);
  
  // Find where the actual content starts (skip headers and formatting)
  let bodyStart = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.length > 30 && 
        !line.startsWith('#') && 
        !line.startsWith('###') &&
        !line.startsWith('Title:') && 
        !line.startsWith('Headline:') &&
        !line.startsWith('Meta Description:') &&
        !line.startsWith('Summary:') &&
        !line.startsWith('####') &&
        !line.startsWith('Requirements:') &&
        !line.startsWith('- Title:') &&
        !line.startsWith('- Meta Description:') &&
        !line.startsWith('- Summary:') &&
        !line.startsWith('- Body:') &&
        !line.startsWith('- Use natural') &&
        !line.startsWith('- Include real-world') &&
        !line.startsWith('- Write in active') &&
        !line.startsWith('- Avoid repetitive') &&
        !line.startsWith('- Make it sound') &&
        !line.startsWith('- Include proper') &&
        !line.startsWith('Write the article') &&
        !line.startsWith('IMPORTANT:') &&
        !line.startsWith('Requirements:') &&
        !line.startsWith('Write exactly') &&
        !line.startsWith('Avoid any') &&
        !line.startsWith('Use natural') &&
        !line.startsWith('Include real-world') &&
        !line.startsWith('Write in active') &&
        !line.startsWith('Avoid repetitive') &&
        !line.startsWith('Make it sound') &&
        !line.startsWith('Include proper') &&
        !line.startsWith('Write the article')) {
      bodyStart = i;
      break;
    }
  }
  
  const bodyLines = lines.slice(bodyStart);
  
  // Clean markdown formatting from body - NO SYMBOLS ALLOWED
  const cleanBody = bodyLines
    .map(line => line
      // Remove ALL headers (any number of #)
      .replace(/^#+\s*/, '')
      // Remove ALL bold formatting
      .replace(/^\*\*|\*\*$/g, '')
      // Remove ALL italic formatting
      .replace(/^\*|\*$/g, '')
      // Remove ALL code formatting
      .replace(/^`|`$/g, '')
      // Remove ALL bullet points and dashes
      .replace(/^- .*$/g, '')
      .replace(/^— .*$/g, '')
      .replace(/^– .*$/g, '')
      // Remove ALL brackets and special characters
      .replace(/^\[.*?\]$/g, '')
      .replace(/^\(.*?\)$/g, '')
      .replace(/^\{.*?\}$/g, '')
      // Remove ALL instruction lines and non-English text
      .replace(/^(Requirements|IMPORTANT|Write exactly|Avoid any|Use natural|Include real-world|Write in active|Avoid repetitive|Make it sound|Include proper|Write the article|This article|Crafted|Human-like|Professional|News Article|Meta Description|Feel free|Update|🚀|•|→):.*$/g, '')
      // Remove ALL separators
      .replace(/^---.*$/g, '')
      .replace(/^___.*$/g, '')
      .replace(/^===.*$/g, '')
      // Remove ALL remaining special characters that might be used for formatting
      .replace(/^[~!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?].*$/g, '')
      // Remove ALL emojis and special symbols
      .replace(/[🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀]/g, '')
      .replace(/[•→]/g, '')
      // Remove ALL non-English characters and symbols
      .replace(/[^\x00-\x7F]/g, '') // Keep only ASCII characters
      .trim()
    )
    .filter(line => {
      const cleanLine = line.trim();
      // Filter out lines that are too short or contain unwanted content
      return cleanLine.length > 10 && 
             cleanLine.length < 1000 &&
             !cleanLine.includes('🚀') &&
             !cleanLine.includes('•') &&
             !cleanLine.includes('→') &&
             !cleanLine.includes('Update') &&
             !cleanLine.includes('News Article') &&
             !cleanLine.includes('Meta Description') &&
             !cleanLine.includes('Feel free');
    })
    .join('\n\n');
  
  return cleanBody;
}

function generateMetaDescription(summary: string[], title: string): string {
  // Clean summary text and create meta description
  const cleanSummary = summary
    .map(s => s
      .replace(/^#+\s*/, '') // Remove headers
      .replace(/^\*\*|\*\*$/g, '') // Remove bold
      .replace(/^\*|\*$/g, '') // Remove italic
      .replace(/^`|`$/g, '') // Remove code
      .replace(/^Title:.*?\n/g, '') // Remove Title: lines
      .replace(/^Headline:.*?\n/g, '') // Remove Headline: lines
      .replace(/^Meta Description:.*?\n/g, '') // Remove Meta Description: lines
      .replace(/^Summary:.*?\n/g, '') // Remove Summary: lines
      .replace(/^Requirements:.*$/g, '') // Remove requirements
      .replace(/^- .*$/g, '') // Remove bullet points
      .replace(/^IMPORTANT:.*$/g, '') // Remove important notes
      .replace(/^Write exactly.*$/g, '') // Remove instructions
      .replace(/^Avoid any.*$/g, '') // Remove instructions
      .replace(/^Use natural.*$/g, '') // Remove instructions
      .replace(/^Include real-world.*$/g, '') // Remove instructions
      .replace(/^Write in active.*$/g, '') // Remove instructions
      .replace(/^Avoid repetitive.*$/g, '') // Remove instructions
      .replace(/^Make it sound.*$/g, '') // Remove instructions
      .replace(/^Include proper.*$/g, '') // Remove instructions
      .replace(/^Write the article.*$/g, '') // Remove instructions
      .replace(/^This article is crafted.*$/g, '') // Remove article notes
      .replace(/^---.*$/g, '') // Remove separators
      .trim()
    )
    .filter(s => s.length > 0 && s.length > 20)
    .join(' ');
  
  // Create meta description (130-140 characters for SEO)
  let desc = cleanSummary.substring(0, 137);
  if (desc.length >= 137) {
    desc = desc.substring(0, desc.lastIndexOf(' ')) + '...';
  }
  
  // Ensure minimum length and quality
  if (desc.length < 50) {
    const cleanTitle = title
      .replace(/^#{1,6}\s*/, '')
      .replace(/^\*\*|\*\*$/g, '')
      .replace(/^\*|\*$/g, '')
      .replace(/^`|`$/g, '')
      .replace(/^["']|["']$/g, '')
      .replace(/^Title:.*$/g, '')
      .replace(/^Headline:.*$/g, '')
      .trim();
    
    desc = `Discover the latest insights about ${cleanTitle}. ${desc}`;
  }
  
  return desc;
}

function extractSEOKeyword(content: string, title: string): string {
  // Clean content and extract meaningful keywords
  const cleanContent = (title + ' ' + content)
    .replace(/^#{1,6}\s*.*?\n/g, '') // Remove headers
    .replace(/^\*\*.*?\*\*/gm, '') // Remove bold text
    .replace(/^\*.*?\*/gm, '') // Remove italic text
    .replace(/^`.*?`/gm, '') // Remove code blocks
    .replace(/^Title:.*?\n/g, '') // Remove Title: lines
    .replace(/^Headline:.*?\n/g, '') // Remove Headline: lines
    .replace(/^Meta Description:.*?\n/g, '') // Remove Meta Description: lines
    .replace(/^Summary:.*?\n/g, '') // Remove Summary: lines
    .replace(/^Requirements:.*$/gm, '') // Remove requirements
    .replace(/^- .*$/gm, '') // Remove bullet points
    .replace(/^IMPORTANT:.*$/gm, '') // Remove important notes
    .replace(/^Write exactly.*$/gm, '') // Remove instructions
    .replace(/^Avoid any.*$/gm, '') // Remove instructions
    .replace(/^Use natural.*$/gm, '') // Remove instructions
    .replace(/^Include real-world.*$/gm, '') // Remove instructions
    .replace(/^Write in active.*$/gm, '') // Remove instructions
    .replace(/^Avoid repetitive.*$/gm, '') // Remove instructions
    .replace(/^Make it sound.*$/gm, '') // Remove instructions
    .replace(/^Include proper.*$/gm, '') // Remove instructions
    .replace(/^Write the article.*$/gm, '') // Remove instructions
    .replace(/^This article is crafted.*$/gm, '') // Remove article notes
    .replace(/^---.*$/gm, '') // Remove separators
    .toLowerCase();
  
  const words = cleanContent.match(/\b\w+\b/g) || [];
  const wordCount = words.reduce((acc: any, word) => {
    acc[word] = (acc[word] || 0) + 1;
    return acc;
  }, {});
  
  // Enhanced common words filter
  const commonWords = [
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by',
    'this', 'that', 'these', 'those', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
    'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may',
    'might', 'can', 'must', 'shall', 'from', 'into', 'during', 'including', 'until', 'against',
    'among', 'throughout', 'despite', 'towards', 'upon', 'within', 'without', 'about', 'above',
    'below', 'across', 'after', 'before', 'behind', 'beneath', 'beside', 'beyond', 'inside',
    'outside', 'under', 'over', 'through', 'around', 'along', 'down', 'up', 'out', 'off'
  ];
  
  const relevantWords = Object.entries(wordCount)
    .filter(([word, count]) => 
      !commonWords.includes(word) && 
      word.length > 3 && 
      word.length < 15 &&
      !word.includes('title') &&
      !word.includes('headline') &&
      !word.includes('meta') &&
      !word.includes('summary') &&
      !word.includes('requirements') &&
      !word.includes('language') &&
      !word.includes('variations') &&
      !word.includes('synonyms') &&
      !word.includes('human') &&
      !word.includes('writing') &&
      !word.includes('patterns') &&
      !word.includes('examples') &&
      !word.includes('statistics') &&
      !word.includes('expert') &&
      !word.includes('quotes') &&
      !word.includes('voice') &&
      !word.includes('varied') &&
      !word.includes('sentence') &&
      !word.includes('structures') &&
      !word.includes('phrases') &&
      !word.includes('written') &&
      !word.includes('journalist') &&
      !word.includes('headings') &&
      !word.includes('flowing') &&
      !word.includes('style') &&
      !word.includes('actually') &&
      !word.includes('read') &&
      !word.includes('enjoy') &&
      !word.includes('important') &&
      !word.includes('write') &&
      !word.includes('exactly') &&
      !word.includes('avoid') &&
      !word.includes('any') &&
      !word.includes('use') &&
      !word.includes('natural') &&
      !word.includes('include') &&
      !word.includes('real') &&
      !word.includes('world') &&
      !word.includes('active') &&
      !word.includes('repetitive') &&
      !word.includes('make') &&
      !word.includes('sound') &&
      !word.includes('proper') &&
      !word.includes('article') &&
      !word.includes('title') &&
      !word.includes('headline') &&
      !word.includes('meta') &&
      !word.includes('summary') &&
      !word.includes('requirements') &&
      !word.includes('language') &&
      !word.includes('variations') &&
      !word.includes('synonyms') &&
      !word.includes('human') &&
      !word.includes('writing') &&
      !word.includes('patterns') &&
      !word.includes('examples') &&
      !word.includes('statistics') &&
      !word.includes('expert') &&
      !word.includes('quotes') &&
      !word.includes('voice') &&
      !word.includes('varied') &&
      !word.includes('sentence') &&
      !word.includes('structures') &&
      !word.includes('phrases') &&
      !word.includes('written') &&
      !word.includes('journalist') &&
      !word.includes('headings') &&
      !word.includes('flowing') &&
      !word.includes('style') &&
      !word.includes('actually') &&
      !word.includes('read') &&
      !word.includes('enjoy') &&
      !word.includes('important') &&
      !word.includes('write') &&
      !word.includes('exactly') &&
      !word.includes('avoid') &&
      !word.includes('any') &&
      !word.includes('use') &&
      !word.includes('natural') &&
      !word.includes('include') &&
      !word.includes('real') &&
      !word.includes('world') &&
      !word.includes('active') &&
      !word.includes('repetitive') &&
      !word.includes('make') &&
      !word.includes('sound') &&
      !word.includes('proper') &&
      !word.includes('article')
    )
    .sort(([,a]: any, [,b]: any) => b - a);
  
  return relevantWords[0]?.[0] || 'news';
}

function generateSlug(title: string): string {
  // Clean title and generate SEO-friendly slug
  const cleanTitle = title
    .replace(/^#+\s*/, '') // Remove markdown headers
    .replace(/^\*\*|\*\*$/g, '') // Remove bold
    .replace(/^\*|\*$/g, '') // Remove italic
    .replace(/^`|`$/g, '') // Remove code
    .replace(/^["']|["']$/g, '') // Remove quotes
    .replace(/^Title:.*$/g, '') // Remove Title: prefix
    .replace(/^Headline:.*$/g, '') // Remove Headline: prefix
    .replace(/^News Article:.*$/g, '') // Remove News Article prefix
    .replace(/^Update.*$/g, '') // Remove Update suffix
    .replace(/^Meta Description:.*$/g, '') // Remove Meta Description prefix
    .replace(/^Feel free.*$/g, '') // Remove Feel free prefix
    .replace(/[🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀]/g, '') // Remove emojis
    .replace(/[•→]/g, '') // Remove special symbols
    .replace(/[^\x00-\x7F]/g, '') // Keep only ASCII characters
    .trim();
  
  // If title is still too long or contains artifacts, truncate it
  let finalTitle = cleanTitle;
  if (finalTitle.length > 60) {
    const words = finalTitle.split(' ').slice(0, 8);
    finalTitle = words.join(' ');
  }
  
  // Ensure we have a valid title
  if (!finalTitle || finalTitle.length < 5) {
    finalTitle = 'news-article-' + Date.now();
  }
  
  return finalTitle
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80);
}

function ensureDirSync(dir: string) {
  if (!fsSync.existsSync(dir)) fsSync.mkdirSync(dir, { recursive: true });
}

async function readJsonSafe<T>(filePath: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(filePath, 'utf8');
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

async function writeJson(filePath: string, data: unknown) {
  ensureDirSync(path.dirname(filePath));
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
}

// Get category UUID by slug
async function getCategoryUUID(categorySlug: string): Promise<string | null> {
  try {
    // First try to find by slug
    let { data, error } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', categorySlug)
      .single();

    if (error || !data) {
      // If not found by slug, try to find by name
      const { data: nameData, error: nameError } = await supabase
        .from('categories')
        .select('id')
        .eq('name', categorySlug)
        .single();
      
      if (nameError || !nameData) {
        // If still not found, try to create the category
        console.warn(`⚠️ Category not found: ${categorySlug}, attempting to create...`);
        
        const { data: newCategory, error: createError } = await supabase
          .from('categories')
          .insert({
            name: categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1),
            slug: categorySlug,
            description: `Articles about ${categorySlug} topics`,
            color: '#6B7280',
            is_active: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
          .select('id')
          .single();
        
        if (createError || !newCategory) {
          console.error(`❌ Failed to create category: ${categorySlug}`, createError);
          return null;
        }
        
        console.log(`✅ Created new category: ${categorySlug}`);
        return newCategory.id;
      }
      
      return nameData.id;
    }

    return data.id;
  } catch (error) {
    console.error(`❌ Error getting category UUID for ${categorySlug}:`, error);
    return null;
  }
}

// Create or get random author profile
async function getOrCreateRandomAuthor(category: string): Promise<string> {
  try {
    // Select random author name
    const randomAuthorName = AUTHOR_NAMES[Math.floor(Math.random() * AUTHOR_NAMES.length)];
    
    // Check if author already exists
    const { data: existingAuthor, error: searchError } = await supabase
      .from('profiles')
      .select('id')
      .eq('full_name', randomAuthorName)
      .single();
    
    if (existingAuthor && !searchError) {
      return existingAuthor.id;
    }
    
    // Create new author profile
    const username = randomAuthorName.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    const { data: newAuthor, error: createError } = await supabase
      .from('profiles')
      .insert({
        username: username,
        full_name: randomAuthorName,
        avatar_url: null,
        bio: `Professional journalist and writer covering ${category} topics.`,
        website: null,
        location: null,
        date_of_birth: null,
        is_verified: true,
        role: 'user',
        preferences: {},
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select('id')
      .single();
    
    if (createError) {
      console.error('❌ Error creating author profile:', createError);
      // Fallback to existing Writer ID
      return '00000000-0000-0000-0000-000000000001';
    }
    
    console.log(`✅ Created new author profile: ${randomAuthorName}`);
    return newAuthor.id;
    
  } catch (error) {
    console.error('❌ Error in getOrCreateRandomAuthor:', error);
    // Fallback to existing Writer ID
    return '00000000-0000-0000-0000-000000000001';
  }
}

// Save article to Supabase database
async function saveArticleToDatabase(article: AIArticle): Promise<boolean> {
  try {
    // Get category UUID
    const categoryUUID = await getCategoryUUID(article.category);
    if (!categoryUUID) {
      console.warn(`⚠️ Skipping database save for ${article.category} - category not found`);
      return false;
    }

    // Get or create random author
    const authorId = await getOrCreateRandomAuthor(article.category);

    const { data, error } = await supabase
      .from('articles')
      .insert({
        title: article.title,
        slug: article.slug,
        excerpt: article.summary.join(' '),
        content: article.body,
        featured_image_url: article.image?.url || null,
        status: 'published',
        author_id: authorId, // Random author ID
        category_id: categoryUUID,
        published_at: article.publishDate,
        reading_time: Math.ceil((article.body?.split(/\s+/).length || 0) / 200),
        word_count: article.body?.split(/\s+/).length || 0,
        meta_title: article.title,
        meta_description: article.metaDescription,
        is_featured: false,
        is_pinned: false,
        allow_comments: true,
        seo_score: 85,
        created_at: article.publishDate,
        updated_at: article.publishDate
      });

    if (error) {
      console.error('❌ Error saving to database:', error);
      return false;
    }

    console.log('✅ Article saved to database successfully');
    return true;
  } catch (error) {
    console.error('❌ Database error:', error);
    return false;
  }
}

async function getRecentTopics(category: string) {
  const filePath = path.join(DATA_ROOT, category, '_recent-topics.json');
  const recent = await readJsonSafe<string[]>(filePath, []);
  return {
    filePath,
    recent,
    async add(topic: string) {
      const list = [topic, ...recent.filter((t) => t !== topic)].slice(0, 50);
      await writeJson(filePath, list);
    },
  };
}

async function updateCategoryIndex(category: string, record: Omit<AIArticle, 'body'>) {
  const indexPath = path.join(DATA_ROOT, category, 'index.json');
  const existingIndex = await readJsonSafe<any>(indexPath, { articles: [], lastUpdated: new Date().toISOString() });
  
  // Ensure articles array exists
  if (!Array.isArray(existingIndex.articles)) {
    existingIndex.articles = [];
  }
  
  // Add or update the article
  const articleIndex = existingIndex.articles.findIndex((x: any) => x.id === record.id);
  const articleRecord = {
    id: record.id,
    title: record.title,
    metaDescription: record.metaDescription,
    summary: record.summary,
    slug: record.slug,
    category: record.category,
    publishDate: record.publishDate,
    image: record.image || null,
    seoKeyword: record.seoKeyword,
  };
  
  if (articleIndex >= 0) {
    existingIndex.articles[articleIndex] = articleRecord;
  } else {
    existingIndex.articles.unshift(articleRecord);
  }
  
  // Sort by publish date (newest first)
  existingIndex.articles.sort((a: any, b: any) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
  
  // Update metadata
  existingIndex.lastUpdated = new Date().toISOString();
  existingIndex.articleCount = existingIndex.articles.length;
  
  await writeJson(indexPath, existingIndex);
}

async function fetchPexelsImage(query: string): Promise<AIArticle['image'] | undefined> {
  if (!PEXELS_API_KEY) {
    console.warn('⚠️ Pexels API key not provided, skipping Pexels image search');
    return undefined;
  }

  try {
    console.log(`🖼️ Searching Pexels for: "${query}"`);
    const response = await axios.get('https://api.pexels.com/v1/search', {
      params: {
        query: query,
        per_page: 10, // Get more options to choose the best
        orientation: 'landscape',
        size: 'large'
      },
      headers: {
        'Authorization': PEXELS_API_KEY
      },
      timeout: 10000
    });

    const photos = response.data?.photos;
    if (photos && photos.length > 0) {
      // Choose the best image based on quality and relevance
      const bestPhoto = photos.find((photo: any) => 
        photo.width >= 1920 && photo.height >= 1080 && // High resolution
        !usedImages.has(photo.src?.large || '') // Not used before
      ) || photos[0];
      
      console.log(`✅ Found Pexels image: ${bestPhoto.url}`);
      return {
        url: bestPhoto.src?.large || bestPhoto.src?.medium || bestPhoto.src?.small,
        alt: `${query} - Photo by ${bestPhoto.photographer} on Pexels`,
        prompt: `Professional news photo for: ${query}`
      };
    }
    
    console.log('ℹ️ No Pexels images found for query');
    return undefined;
  } catch (error: any) {
    if (error.response?.status === 401) {
      console.warn('⚠️ Pexels API key invalid or expired');
    } else if (error.response?.status === 429) {
      console.warn('⚠️ Pexels API rate limit exceeded');
    } else {
      console.warn(`⚠️ Pexels API error: ${error.message}`);
    }
    return undefined;
  }
}

async function fetchUnsplashImage(query: string): Promise<AIArticle['image'] | undefined> {
  if (!UNSPLASH_ACCESS_KEY) {
    console.warn('⚠️ Unsplash API key not provided, skipping Unsplash image search');
    return undefined;
  }

  try {
    console.log(`🖼️ Searching Unsplash for: "${query}"`);
    const response = await axios.get('https://api.unsplash.com/search/photos', {
      params: {
        query: query,
        per_page: 10, // Get more options to choose the best
        orientation: 'landscape',
        order_by: 'relevant'
      },
      headers: {
        'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`
      },
      timeout: 10000
    });

    const photos = response.data?.results;
    if (photos && photos.length > 0) {
      // Choose the best image based on quality and relevance
      const bestPhoto = photos.find((photo: any) => 
        photo.width >= 1920 && photo.height >= 1080 && // High resolution
        !usedImages.has(photo.urls?.regular || '') // Not used before
      ) || photos[0];
      
      console.log(`✅ Found Unsplash image: ${bestPhoto.urls?.regular}`);
      return {
        url: bestPhoto.urls?.regular || bestPhoto.urls?.small || bestPhoto.urls?.thumb,
        alt: `${query} - Photo by ${bestPhoto.user?.name} on Unsplash`,
        prompt: `Professional news photo for: ${query}`
      };
    }
    
    console.log('ℹ️ No Unsplash images found for query');
    return undefined;
  } catch (error: any) {
    if (error.response?.status === 401) {
      console.warn('⚠️ Unsplash API key invalid or expired');
    } else if (error.response?.status === 429) {
      console.warn('⚠️ Unsplash API rate limit exceeded');
    } else {
      console.warn(`⚠️ Unsplash API error: ${error.message}`);
    }
    return undefined;
  }
}

// Track used images to prevent duplicates
const usedImages = new Set<string>();
const usedTopics = new Set<string>();

async function getImageForArticle(category: string, art: AIArticle): Promise<AIArticle['image']> {
  // Check if topic was already used
  if (usedTopics.has(art.title.toLowerCase())) {
    console.log(`⚠️ Topic already used: ${art.title}, generating variation`);
    art.title = `${art.title} - Latest Developments`;
  }
  usedTopics.add(art.title.toLowerCase());

  // Create multiple search queries for better image matching
  const searchQueries = [
    // Primary query with main keywords
    [art.seoKeyword, category].filter(Boolean).join(' '),
    // Secondary query with title keywords
    art.title.split(' ').slice(0, 4).join(' '),
    // Category-specific query
    `${category} news ${art.seoKeyword}`,
    // Alternative query
    `${art.seoKeyword} ${category} latest`
  ].filter(query => query.length > 10);

  console.log(`🖼️ Getting image for article: "${art.title}"`);
  console.log(`🔍 Image search queries: ${searchQueries.join(' | ')}`);

  // Try multiple queries with both APIs
  for (const query of searchQueries) {
    try {
      // Randomly choose between Pexels and Unsplash first
      const usePexelsFirst = Math.random() > 0.5;
      
      if (usePexelsFirst) {
        // Try Pexels first
        const pexels = await fetchPexelsImage(query);
        if (pexels?.url && !usedImages.has(pexels.url)) {
          console.log(`✅ Using Pexels image: ${pexels.url}`);
          usedImages.add(pexels.url);
          return pexels;
        }
        
        // Try Unsplash as backup
        const unsplash = await fetchUnsplashImage(query);
        if (unsplash?.url && !usedImages.has(unsplash.url)) {
          console.log(`✅ Using Unsplash image: ${unsplash.url}`);
          usedImages.add(unsplash.url);
          return unsplash;
        }
      } else {
        // Try Unsplash first
        const unsplash = await fetchUnsplashImage(query);
        if (unsplash?.url && !usedImages.has(unsplash.url)) {
          console.log(`✅ Using Unsplash image: ${unsplash.url}`);
          usedImages.add(unsplash.url);
          return unsplash;
        }
        
        // Try Pexels as backup
        const pexels = await fetchPexelsImage(query);
        if (pexels?.url && !usedImages.has(pexels.url)) {
          console.log(`✅ Using Pexels image: ${pexels.url}`);
          usedImages.add(pexels.url);
          return pexels;
        }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.log(`⚠️ Error with query "${query}":`, errorMessage);
      continue;
    }
  }

  console.log('⚠️ No unique images found, using placeholder');
  return { 
    url: '', 
    alt: `No image available for ${art.title}`, 
    prompt: `Professional news photo for: ${art.title}` 
  };
}

function seedHeadline(category: string): string {
  const bank: Record<string, string[]> = {
    world: [
      'Global economic shifts reshape international trade patterns',
      'Climate action accelerates as nations commit to ambitious targets',
      'Diplomatic breakthroughs signal new era of cooperation',
      'Emerging technologies transform traditional industries worldwide',
      'Cultural exchange programs bridge international understanding gaps'
    ],
    technology: [
      'Quantum computing enables breakthrough discoveries',
      'Sustainable tech solutions address environmental challenges',
      'Digital transformation accelerates across all sectors',
      'Innovation hubs drive regional economic development'
    ],
    health: [
      'Preventive medicine approaches gain widespread adoption',
      'Mental health awareness transforms workplace policies',
      'Telemedicine platforms expand healthcare accessibility',
      'Nutrition science reveals new dietary insights',
      'Fitness technology personalizes wellness journeys'
    ],
    business: [
      'Startup ecosystems flourish in emerging markets',
      'Corporate sustainability becomes competitive advantage',
      'Remote work models reshape organizational structures',
      'Fintech innovations democratize financial services',
      'Supply chain resilience strategies gain prominence'
    ],
    entertainment: [
      'streaming platform wars', 'virtual reality entertainment', 'gaming industry growth',
      'social media influence', 'celebrity culture evolution', 'digital art market',
      'live performance technology', 'content creation trends', 'cross-cultural entertainment',
      'interactive storytelling', 'esports expansion', 'creative collaboration tools',
      'virtual concerts', 'gaming accessibility'
    ],
    science: [
      'Breakthrough materials enable sustainable solutions',
      'Space exploration reveals new cosmic discoveries',
      'Medical research accelerates treatment development',
      'Environmental science guides policy decisions',
      'Quantum physics applications expand practical uses'
    ],
    lifestyle: [
      'Urban planning prioritizes community well-being',
      'Sustainable living practices gain mainstream appeal',
      'Digital wellness strategies balance technology use',
      'Mindfulness practices integrate into daily routines',
      'Community gardens foster neighborhood connections'
    ],
    celebrities: [
      'Public figures champion social responsibility causes',
      'Entertainment industry embraces diversity initiatives',
      'Celebrity influence drives positive social change',
      'Digital platforms reshape celebrity-fan relationships',
      'Artistic collaborations cross cultural boundaries'
    ]
  };
  
  const list = bank[category];
  return list[Math.floor(Math.random() * list.length)];
}

async function generateOneArticle(category: string): Promise<AIArticle | null> {
  try {
    // Get trending topics for this category
    const trendingTopics = await getTrendingTopics(category);
    
    // Select a random trending topic
    const randomTopic = trendingTopics[Math.floor(Math.random() * trendingTopics.length)];
    console.log(`📈 Using trending topic for ${category}: ${randomTopic}`);
    
    const recent = await getRecentTopics(category);
    const headline = recent.recent.includes(randomTopic) ? `${randomTopic} Update` : randomTopic;

    const draft = await generateArticleWithOllama(category, headline);
    
    if (!draft || !draft.title || !draft.body) {
      console.warn(`Failed to generate article for ${category}: Invalid response from Ollama API`);
      return null;
    }
    
    // Generate unique ID
    draft.id = crypto.randomUUID();

    // Prevent duplicate slug
    const dir = path.join(DATA_ROOT, category);
    ensureDirSync(dir);
    let filePath = path.join(dir, `${draft.slug}.json`);
    if (fsSync.existsSync(filePath)) {
      draft.slug = `${draft.slug}-${Date.now().toString(36).slice(3)}`;
      filePath = path.join(dir, `${draft.slug}.json`);
    }

    // Get image for the article
    draft.image = await getImageForArticle(category, draft);

    // Save to database first
    const dbSuccess = await saveArticleToDatabase(draft);
    
    // Also persist article file as backup
    await writeJson(filePath, draft);
    
    // Update category index
    const { body, ...rest } = draft;
    await updateCategoryIndex(category, rest);
    
    // Add to recent topics
    await recent.add(randomTopic);
    
    console.log(`Generated article for ${category}: ${draft.title}`);
    return draft;
  } catch (error) {
    console.error(`Error generating article for ${category}:`, error);
    return null;
  }
}

async function runAllCategoriesOnce() {
  console.log('Starting article generation for all categories...');
  ensureDirSync(DATA_ROOT);
  for (const cat of CATEGORIES) ensureDirSync(path.join(DATA_ROOT, cat));

  const results: { category: string; ok: boolean; slug?: string; error?: string }[] = [];
  
  for (const category of CATEGORIES) {
    try {
      console.log(`Generating article for ${category}...`);
      const res = await generateOneArticle(category);
      
      if (res) {
        results.push({ category, ok: true, slug: res.slug });
        console.log(`✅ Successfully generated article for ${category}: ${res.title}`);
      } else {
        results.push({ category, ok: false, error: 'Failed to generate article' });
        console.log(`❌ Failed to generate article for ${category}`);
      }
    } catch (e: any) {
      const errorMsg = e?.message || String(e);
      results.push({ category, ok: false, error: errorMsg });
      console.error(`❌ Error generating article for ${category}:`, errorMsg);
    }
  }
  
  const successCount = results.filter(r => r.ok).length;
  const totalCount = results.length;
  
  console.log(`\n📊 Article generation complete: ${successCount}/${totalCount} categories successful`);
  console.log(JSON.stringify({ runAt: new Date().toISOString(), results }, null, 2));
  
  return results;
}

async function main() {
  const mode = process.argv[2] || process.env.AI_WRITER_MODE || 'cron';
  
  try {
    if (mode === 'cron') {
      console.log('🚀 Starting AI Writer in cron mode (hourly execution)');
      console.log(`📅 Next run scheduled for: ${new Date().toISOString()}`);
      
      // Run immediately once
      console.log('\n🔄 Running initial article generation...');
      await runAllCategoriesOnce();
      
      // Schedule hourly runs
      cron.schedule('0 * * * *', async () => {
        console.log(`\n⏰ [Cron] Hourly tick: ${new Date().toISOString()}`);
        try {
          await runAllCategoriesOnce();
        } catch (error) {
          console.error('❌ Cron job failed:', error);
        }
      });
      
      console.log('✅ Cron job scheduled successfully. Press Ctrl+C to stop.');
      
      // Keep the process running
      process.on('SIGINT', () => {
        console.log('\n🛑 Shutting down AI Writer...');
        process.exit(0);
      });
      
    } else {
      console.log('🚀 Starting AI Writer in single-run mode');
      await runAllCategoriesOnce();
      console.log('✅ Single run completed. Exiting.');
    }
  } catch (error) {
    console.error('❌ Fatal error in AI Writer:', error);
    process.exit(1);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});



