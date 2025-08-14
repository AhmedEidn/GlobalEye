import { createClient } from '@supabase/supabase-js';
import axios from 'axios';
import crypto from 'crypto';
import dotenv from 'dotenv';
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
  author: string;
  image?: {
    url: string;
    alt: string;
    prompt: string;
  };
}

// Enhanced article generation with human-like patterns
async function generateHumanLikeArticle(category: string, headline: string): Promise<AIArticle> {
  try {
    console.log(`🤖 Generating human-like article for ${category}: ${headline}`);
    
    // Create a more natural, human-like prompt with shorter content
    const articlePrompt = `Write a concise news article about "${headline}" in the ${category} category. 

Write this as a professional journalist would - natural, engaging, and informative.

Requirements:
- Start directly with the article content
- Write 400-600 words (not 1200-1500)
- Use natural, varied sentence structures
- Include relevant insights and examples
- Write in active voice
- Make it sound human-written

Write the article directly without any introductions or explanations.`;

    const articleContent = await callOllamaAPI(articlePrompt, 800);
    
    // Generate a simple image prompt
    const imagePrompt = `A professional news photo for an article about ${headline} in the ${category} category.`;

    const imagePromptResponse = await callOllamaAPI(imagePrompt, 50);

    // Parse and structure the content with enhanced cleaning
    const article = parseAndCleanContent(articleContent, category, headline);
    article.image = {
      url: '', // Will be filled by image fetching
      alt: `${headline} - ${category} news`,
      prompt: imagePromptResponse.trim()
    };

    return article;
  } catch (error) {
    console.log(`⚠️ Ollama failed, using fallback article generation for ${category}: ${headline}`);
    
    // Fallback: Generate a simple article without AI
    const fallbackArticle = generateFallbackArticle(category, headline);
    
    // Get image for the article
    await getImageForArticle(category, fallbackArticle);
    
    return fallbackArticle;
  }
}

// Generate fallback article when Ollama fails
function generateFallbackArticle(category: string, headline: string): AIArticle {
  const author = AUTHOR_NAMES[Math.floor(Math.random() * AUTHOR_NAMES.length)];
  
  // Create a simple but professional article structure
  const title = headline.charAt(0).toUpperCase() + headline.slice(1);
  const slug = generateSlug(title);
  
  // Generate summary
  const summary = [
    `Recent developments in ${headline} are reshaping the landscape of ${category} sector.`,
    `Experts and industry leaders are closely monitoring these changes as they unfold.`,
    `This transformation represents a significant shift in how we approach ${headline.toLowerCase()}.`
  ];
  
  // Generate body content
  const body = `The ${category} industry is experiencing a remarkable transformation as ${headline} continues to evolve and adapt to modern challenges.

Industry experts have identified several key factors driving this change, including technological advancements, shifting consumer demands, and regulatory updates. These developments are creating new opportunities for businesses and organizations across the sector.

Companies that embrace these changes early are positioning themselves for long-term success. The integration of innovative approaches and sustainable practices is becoming increasingly important for maintaining competitive advantage.

As we move forward, it's clear that ${headline} will play a crucial role in shaping the future of ${category}. Stakeholders across the industry are investing in research and development to stay ahead of emerging trends.

The impact of these changes extends beyond immediate business concerns, affecting communities, economies, and future generations. This underscores the importance of thoughtful planning and responsible implementation.

Looking ahead, the ${category} sector is poised for continued growth and innovation. The lessons learned from current developments in ${headline} will inform future strategies and decision-making processes.`;
  
  // Generate meta description
  const metaDescription = `Discover how ${headline} is transforming the ${category} industry. Stay informed about the latest developments and their impact on the sector.`;
  
  // Extract SEO keyword
  const seoKeyword = extractSEOKeyword(body, title);
  
  return {
    id: crypto.randomUUID(),
    title,
    slug,
    summary,
    body,
    metaDescription,
    seoKeyword,
    publishDate: new Date().toISOString(),
    category,
    author,
    image: {
      url: '',
      alt: `${title} - ${category} news`,
      prompt: `A professional news photo for an article about ${headline} in the ${category} category.`
    }
  };
}

// Enhanced content parsing and cleaning
function parseAndCleanContent(content: string, category: string, headline: string): AIArticle {
  // Clean the content thoroughly
  const cleanContent = cleanContentCompletely(content);
  
  // Extract title intelligently
  const title = extractCleanTitle(cleanContent, headline);
  
  // Generate slug from title
  const slug = generateSlug(title);
  
  // Extract summary from first meaningful paragraphs
  const summary = extractCleanSummary(cleanContent);
  
  // Extract body content
  const body = extractCleanBody(cleanContent);
  
  // Generate meta description
  const metaDescription = generateMetaDescription(summary, title);
  
  // Extract or generate SEO keyword
  const seoKeyword = extractSEOKeyword(cleanContent, title);
  
  // Select random author
  const author = AUTHOR_NAMES[Math.floor(Math.random() * AUTHOR_NAMES.length)];
  
  return {
    id: crypto.randomUUID(),
    title,
    slug,
    summary,
    body,
    metaDescription,
    seoKeyword,
    publishDate: new Date().toISOString(),
    category,
    author
  };
}

// Comprehensive content cleaning
function cleanContentCompletely(content: string): string {
  return content
    // Remove all AI-like patterns and prefixes
    .replace(/^(Certainly!|Here's|Here is|I'd write|I would write|This is|Let me|Allow me|I'll create|I will create).*?\n/gm, '')
    .replace(/^(Title|Headline|Meta Description|Summary|Requirements|IMPORTANT|Write|Avoid|Use|Include|Make it|DO NOT).*?\n/gm, '')
    .replace(/^(News Article|Update|Feel free|Why This Research|A Personal Example|The Power of|Data-Driven|A Celeb-Driven|New Science Guide|Embracing|Discover Why|Are Gaining|The Future of|Addressing|World News|Diplomatic|Signals|New Era|Fintech|Innovations|Democratize|Financial|Services|Streaming|Platforms|Revolutionize|Content|Consumption|Environmental|Science|Guides|Policy|Decisions|Sustainable|Living|Practices|Gaining|Mainstream|Appeal|Celebrity|Influence|Drives|Positive|Social|Change).*?\n/gm, '')
    
    // Remove all markdown formatting
    .replace(/^#{1,10}\s*.*?\n/gm, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/`(.*?)`/g, '$1')
    .replace(/^["']|["']$/gm, '')
    .replace(/^- .*$/gm, '')
    .replace(/^— .*$/gm, '')
    .replace(/^– .*$/gm, '')
    .replace(/^\[.*?\]$/gm, '')
    .replace(/^\(.*?\)$/gm, '')
    .replace(/^\{.*?\}$/gm, '')
    
    // Remove all special characters and symbols
    .replace(/[🚀•→~!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g, '')
    .replace(/[^\x00-\x7F]/g, '') // Keep only ASCII characters
    
    // Remove empty lines and clean up spacing
    .replace(/\n\s*\n\s*\n/g, '\n\n')
    .replace(/^\s+|\s+$/gm, '')
    .trim();
}

// Extract clean title without AI patterns
function extractCleanTitle(content: string, headline: string): string {
  const lines = content.split('\n').filter(line => line.trim().length > 0);
  
  for (const line of lines.slice(0, 10)) {
    const trimmed = line.trim();
    
    // Skip lines that contain AI patterns
    if (trimmed.includes('Certainly') || 
        trimmed.includes("Here's") ||
        trimmed.includes('Here is') ||
        trimmed.includes("I'd write") ||
        trimmed.includes('I would write') ||
        trimmed.includes('This is') ||
        trimmed.includes('Let me') ||
        trimmed.includes('Allow me') ||
        trimmed.includes("I'll create") ||
        trimmed.includes('I will create') ||
        trimmed.includes('Title:') ||
        trimmed.includes('Headline:') ||
        trimmed.includes('Requirements:') ||
        trimmed.includes('IMPORTANT:') ||
        trimmed.includes('Write exactly') ||
        trimmed.includes('Avoid any') ||
        trimmed.includes('Use natural') ||
        trimmed.includes('Include real-world') ||
        trimmed.includes('Write in active') ||
        trimmed.includes('Avoid repetitive') ||
        trimmed.includes('Make it sound') ||
        trimmed.includes('Include proper')) {
      continue;
    }
    
    // Check if this line looks like a good title
    if (trimmed.length >= 20 && trimmed.length <= 100) {
      return trimmed;
    }
  }
  
  // If no good title found, use the headline
  return headline;
}

// Extract clean summary
function extractCleanSummary(content: string): string[] {
  const lines = content.split('\n').filter(line => line.trim().length > 0);
  const summary: string[] = [];
  
  for (const line of lines.slice(0, 5)) {
    const trimmed = line.trim();
    
    // Skip AI patterns
    if (trimmed.includes('Certainly') || 
        trimmed.includes("Here's") ||
        trimmed.includes('Here is') ||
        trimmed.includes("I'd write") ||
        trimmed.includes('I would write') ||
        trimmed.includes('This is') ||
        trimmed.includes('Let me') ||
        trimmed.includes('Allow me') ||
        trimmed.includes("I'll create") ||
        trimmed.includes('I will create')) {
      continue;
    }
    
    if (trimmed.length > 30 && trimmed.length < 200) {
      summary.push(trimmed);
      if (summary.length >= 3) break;
    }
  }
  
  return summary.length > 0 ? summary : ['A comprehensive analysis of the latest developments in this field.'];
}

// Extract clean body content
function extractCleanBody(content: string): string {
  const lines = content.split('\n').filter(line => line.trim().length > 0);
  const bodyLines: string[] = [];
  
  let skipCount = 0;
  let foundContent = false;
  
  for (const line of lines) {
    const trimmed = line.trim();
    
    // Skip the first few lines that might contain AI patterns
    if (skipCount < 3) {
      if (trimmed.includes('Certainly') || 
          trimmed.includes("Here's") ||
          trimmed.includes('Here is') ||
          trimmed.includes("I'd write") ||
          trimmed.includes('I would write') ||
          trimmed.includes('This is') ||
          trimmed.includes('Let me') ||
          trimmed.includes('Allow me') ||
          trimmed.includes("I'll create") ||
          trimmed.includes('I will create') ||
          trimmed.includes('Title:') ||
          trimmed.includes('Headline:') ||
          trimmed.includes('Requirements:') ||
          trimmed.includes('IMPORTANT:') ||
          trimmed.includes('Write exactly') ||
          trimmed.includes('Avoid any') ||
          trimmed.includes('Use natural') ||
          trimmed.includes('Include real-world') ||
          trimmed.includes('Write in active') ||
          trimmed.includes('Avoid repetitive') ||
          trimmed.includes('Make it sound') ||
          trimmed.includes('Include proper')) {
        skipCount++;
        continue;
      }
    }
    
    // If we find meaningful content, start collecting
    if (trimmed.length > 20 && !trimmed.startsWith('#') && !trimmed.startsWith('-')) {
      foundContent = true;
    }
    
    if (foundContent && trimmed.length > 10) {
      bodyLines.push(trimmed);
    }
  }
  
  // If no content was extracted, try to get any meaningful lines
  if (bodyLines.length === 0) {
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.length > 20 && 
          !trimmed.includes('Certainly') && 
          !trimmed.includes("Here's") &&
          !trimmed.includes('Here is') &&
          !trimmed.includes("I'd write") &&
          !trimmed.includes('I would write') &&
          !trimmed.includes('This is') &&
          !trimmed.includes('Let me') &&
          !trimmed.includes('Allow me') &&
          !trimmed.includes("I'll create") &&
          !trimmed.includes('I will create')) {
        bodyLines.push(trimmed);
      }
    }
  }
  
  // If still no content, use the original content as fallback
  if (bodyLines.length === 0) {
    return content.replace(/^(Certainly!|Here's|Here is|I'd write|I would write|This is|Let me|Allow me|I'll create|I will create).*?\n/gm, '')
                 .replace(/^(Title|Headline|Requirements|IMPORTANT|Write|Avoid|Use|Include|Make it|DO NOT).*?\n/gm, '')
                 .trim();
  }
  
  return bodyLines.join('\n\n');
}

// Generate meta description
function generateMetaDescription(summary: string[], title: string): string {
  if (summary.length > 0) {
    const firstSummary = summary[0];
    if (firstSummary.length <= 140) {
      return firstSummary;
    }
    return firstSummary.substring(0, 137) + '...';
  }
  
  // Fallback meta description
  return `Discover the latest insights and developments in ${title.toLowerCase()}. Stay informed with our comprehensive coverage and expert analysis.`;
}

// Extract SEO keyword
function extractSEOKeyword(content: string, title: string): string {
  // Extract key words from title
  const words = title.toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(' ')
    .filter(word => word.length > 3);
  
  return words.length > 0 ? words[0] : 'news';
}

// Generate slug from title
function generateSlug(title: string): string {
  const baseSlug = title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
  
  // Add timestamp to ensure uniqueness
  const timestamp = Date.now().toString().slice(-6);
  return `${baseSlug}-${timestamp}`;
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
          temperature: 0.8,
          top_p: 0.9,
          repeat_penalty: 1.2
        }
      },
      {
        timeout: 60000 // 1 minute instead of 2 minutes
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
      throw new Error('Model not found. Please download with: ollama pull qwen2.5:0.5b');
    } else {
      throw new Error(`Ollama API error: ${error.message}`);
    }
  }
}

// Get image for article
async function getImageForArticle(category: string, article: AIArticle): Promise<void> {
  try {
    const searchQueries = [
      `${article.seoKeyword} ${category}`,
      article.title.substring(0, 50),
      `${category} news ${article.seoKeyword}`,
      `${category} latest ${article.seoKeyword}`
    ];

    // Try Pexels first
    if (PEXELS_API_KEY) {
      try {
        const pexelsResponse = await axios.get(
          `https://api.pexels.com/v1/search?query=${encodeURIComponent(searchQueries[0])}&per_page=20&orientation=landscape`,
          {
            headers: { Authorization: PEXELS_API_KEY },
            timeout: 10000
          }
        );

        if (pexelsResponse.data?.photos?.length > 0) {
          const randomPhoto = pexelsResponse.data.photos[Math.floor(Math.random() * pexelsResponse.data.photos.length)];
          article.image!.url = randomPhoto.src.landscape;
          article.image!.alt = randomPhoto.alt || `${article.title} - ${category} news`;
          console.log(`✅ Found Pexels image: ${randomPhoto.url}`);
          return;
        }
      } catch (error) {
        console.log(`⚠️ Pexels API error: ${error}`);
      }
    }

    // Fallback to Unsplash
    if (UNSPLASH_ACCESS_KEY) {
      try {
        const unsplashResponse = await axios.get(
          `https://api.unsplash.com/search/photos?query=${encodeURIComponent(searchQueries[0])}&orientation=landscape&per_page=20`,
          {
            headers: { Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` },
            timeout: 10000
          }
        );

        if (unsplashResponse.data?.results?.length > 0) {
          const randomPhoto = unsplashResponse.data.results[Math.floor(Math.random() * unsplashResponse.data.results.length)];
          article.image!.url = randomPhoto.urls.regular;
          article.image!.alt = randomPhoto.alt_description || `${article.title} - ${category} news`;
          console.log(`✅ Found Unsplash image: ${randomPhoto.links.html}`);
          return;
        }
      } catch (error) {
        console.log(`⚠️ Unsplash API error: ${error}`);
      }
    }

    // If no image found, set a placeholder
    article.image!.url = 'https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=News+Image';
    article.image!.alt = `${article.title} - ${category} news`;
    console.log(`⚠️ No image found, using placeholder`);

  } catch (error) {
    console.error(`❌ Error getting image for article:`, error);
    // Set placeholder image
    article.image!.url = 'https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=News+Image';
    article.image!.alt = `${article.title} - ${category} news`;
  }
}

// Get category UUID from database
async function getCategoryUUID(categoryName: string): Promise<string | null> {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', categoryName)
      .single();

    if (error || !data) {
      console.warn(`⚠️ Category not found: ${categoryName}`);
      return null;
    }

    return data.id;
  } catch (error) {
    console.error(`❌ Error getting category UUID:`, error);
    return null;
  }
}

// Get or create random author
async function getOrCreateRandomAuthor(category: string): Promise<string> {
  try {
    // Try to get existing author first
    const { data: existingAuthors, error: fetchError } = await supabase
      .from('profiles')
      .select('id')
      .limit(10);

    if (!fetchError && existingAuthors && existingAuthors.length > 0) {
      // Return random existing author
      return existingAuthors[Math.floor(Math.random() * existingAuthors.length)].id;
    }

    // If no authors exist, create a default one
    const defaultAuthor = {
      username: 'news_editor',
      full_name: 'News Editor',
      role: 'admin'
    };

    const { data: newAuthor, error: createError } = await supabase
      .from('profiles')
      .insert([defaultAuthor])
      .select('id')
      .single();

    if (createError || !newAuthor) {
      throw new Error('Failed to create default author');
    }

    console.log(`✅ Created new author profile: ${defaultAuthor.full_name}`);
    return newAuthor.id;

  } catch (error) {
    console.error(`❌ Error with author management:`, error);
    // Return a fallback UUID (this should not happen in production)
    return '00000000-0000-0000-0000-000000000000';
  }
}

// Save article to database
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
        author_id: authorId,
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

// Main function to generate one article
export async function generateOneArticle(category: string): Promise<AIArticle | null> {
  try {
    // Get trending topic for the category
    const trendingTopics = getCategoryTrendingTopics(category);
    const randomTopic = trendingTopics[Math.floor(Math.random() * trendingTopics.length)];
    
    console.log(`📈 Using trending topic for ${category}: ${randomTopic}`);
    
    // Generate article
    const article = await generateHumanLikeArticle(category, randomTopic);
    
    // Get image for the article
    await getImageForArticle(category, article);
    
    // Save to database
    const dbSuccess = await saveArticleToDatabase(article);
    
    if (dbSuccess) {
      console.log(`Generated article for ${category}: ${article.title}`);
      return article;
    } else {
      console.error(`Failed to save article to database for ${category}`);
      return null;
    }
  } catch (error) {
    console.error(`Error generating article for ${category}:`, error);
    return null;
  }
}

// Get trending topics for categories
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
      'quantum computing breakthroughs', 'edge computing in smart cities', 'neuromorphic computing chips',
      'biometric authentication evolution', '5G network infrastructure', 'blockchain in supply chains',
      'augmented reality in education', 'quantum cryptography', 'neuromorphic sensors',
      'edge AI processing', 'cybersecurity threats', 'artificial intelligence ethics',
      'machine learning applications', 'cloud computing innovations', 'internet of things security'
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
      'virtual concerts', 'gaming accessibility', 'immersive experiences'
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

// Test function
export async function testArticleGeneration() {
  console.log('🧪 Testing enhanced article generation...');
  
  try {
    const article = await generateOneArticle('technology');
    if (article) {
      console.log('✅ Test successful!');
      console.log(`Title: ${article.title}`);
      console.log(`Author: ${article.author}`);
      console.log(`Summary: ${article.summary.join(' ')}`);
      console.log(`Body length: ${article.body.length} characters`);
    } else {
      console.log('❌ Test failed');
    }
  } catch (error) {
    console.error('❌ Test error:', error);
  }
}

// Run test if called directly
if (require.main === module) {
  testArticleGeneration();
}
