import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';
import type { HumanArticle } from './advanced-human-writer';
import { generateAndSaveArticle } from './advanced-human-writer';

// Load environment variables from .env.local only
dotenv.config({ path: '.env.local' });

// Supabase Configuration
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl!, supabaseKey!);

// Advanced topics for each category to ensure variety and uniqueness
const ADVANCED_TOPICS = {
  technology: [
    'quantum computing breakthroughs',
    'edge computing in smart cities',
    'neuromorphic computing chips',
    'biometric authentication evolution',
    '5G network infrastructure',
    'blockchain in supply chains',
    'augmented reality in education',
    'quantum cryptography',
    'neuromorphic sensors',
    'edge computing processing'
  ],
  world: [
    'cultural exchange programs',
    'sustainable urban development',
    'ocean conservation efforts',
    'indigenous knowledge preservation',
    'cross-border collaboration',
    'global health initiatives',
    'cultural heritage protection',
    'international student programs',
    'diplomatic innovation',
    'global sustainability goals'
  ],
  business: [
    'circular economy models',
    'social impact investing',
    'remote work transformation',
    'sustainable business practices',
    'digital transformation strategies',
    'employee wellness programs',
    'green technology adoption',
    'community-based business models',
    'ethical supply chains',
    'workplace innovation'
  ],
  health: [
    'precision medicine advances',
    'mental health technology',
    'nutritional genomics',
    'preventive healthcare systems',
    'telemedicine evolution',
    'holistic wellness approaches',
    'genetic therapy developments',
    'mind-body medicine',
    'regenerative medicine',
    'digital health platforms'
  ],
  entertainment: [
    'immersive storytelling',
    'virtual reality experiences',
    'interactive media platforms',
    'cross-cultural entertainment',
    'digital art evolution',
    'gaming innovation',
    'streaming platform diversity',
    'live performance technology',
    'creative collaboration tools',
    'entertainment accessibility'
  ],
  science: [
    'quantum physics discoveries',
    'climate change research',
    'space exploration technology',
    'biotechnology breakthroughs',
    'renewable energy innovations',
    'materials science advances',
    'astrophysics discoveries',
    'genetic research progress',
    'oceanography studies',
    'atmospheric science findings'
  ],
  lifestyle: [
    'mindful living practices',
    'sustainable lifestyle choices',
    'digital wellness strategies',
    'work-life balance techniques',
    'minimalist living approaches',
    'eco-friendly home solutions',
    'personal development methods',
    'stress management techniques',
    'healthy habit formation',
    'life optimization strategies'
  ],
  celebrities: [
    'celebrity philanthropy work',
    'artistic innovation trends',
    'celebrity business ventures',
    'social media influence',
    'celebrity activism',
    'creative collaboration projects',
    'celebrity wellness journeys',
    'artistic expression evolution',
    'celebrity mentorship programs',
    'cultural impact initiatives'
  ]
};

// Generate unique article ID
function generateUniqueArticleId(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substr(2, 9);
  return `article-${timestamp}-${random}`;
}

// Save article to local JSON file
async function saveArticleLocally(article: HumanArticle): Promise<void> {
  try {
    const dataDir = path.join(process.cwd(), 'src', 'data', article.category);
    
    // Ensure directory exists
    await fs.mkdir(dataDir, { recursive: true });
    
    // Create filename from slug
    const filename = `${article.slug}.json`;
    const filepath = path.join(dataDir, filename);
    
    // Check if file already exists to avoid duplicates
    try {
      await fs.access(filepath);
      console.log(`⚠️ Article already exists: ${filename}`);
      return;
    } catch {
      // File doesn't exist, proceed to save
    }
    
    // Save article
    await fs.writeFile(filepath, JSON.stringify(article, null, 2));
    console.log(`💾 Article saved locally: ${filename}`);
  } catch (error) {
    console.error(`❌ Error saving article locally:`, error);
  }
}

// Upload article to Supabase
async function uploadArticleToSupabase(article: HumanArticle): Promise<boolean> {
  try {
    console.log(`📤 Uploading article to Supabase: ${article.title}`);
    
    // Transform article to match database schema
    const transformedArticle = {
      id: generateUniqueArticleId(),
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt,
      content: article.content,
      featured_image_url: article.image.url,
      status: 'published',
      author_id: '00000000-0000-0000-0000-000000000001', // Default writer ID
      category_id: await getCategoryId(article.category),
      published_at: article.publishedDate,
      reading_time: article.readingTime,
      word_count: article.wordCount,
      meta_title: article.title,
      meta_description: article.excerpt,
      is_featured: false,
      is_pinned: false,
      allow_comments: true,
      seo_score: calculateSEOScore(article),
      created_at: article.publishedDate,
      updated_at: article.publishedDate
    };
    
    const { data, error } = await supabase
      .from('articles')
      .insert(transformedArticle);
    
    if (error) {
      console.error(`❌ Error uploading to Supabase:`, error);
      return false;
    }
    
    console.log(`✅ Article uploaded to Supabase successfully!`);
    return true;
  } catch (error) {
    console.error(`❌ Exception uploading to Supabase:`, error);
    return false;
  }
}

// Get category ID from database
async function getCategoryId(categorySlug: string): Promise<string> {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', categorySlug)
      .single();
    
    if (error || !data) {
      console.error(`❌ Error getting category ID for ${categorySlug}:`, error);
      // Return a default UUID if category not found
      return '00000000-0000-0000-0000-000000000002';
    }
    
    return data.id;
  } catch (error) {
    console.error(`❌ Exception getting category ID:`, error);
    return '00000000-0000-0000-0000-000000000002';
  }
}

// Calculate SEO score based on article quality
function calculateSEOScore(article: HumanArticle): number {
  let score = 85; // Base score
  
  // Bonus for good word count
  if (article.wordCount >= 1200 && article.wordCount <= 1500) {
    score += 5;
  }
  
  // Bonus for good title length
  if (article.title.length >= 40 && article.title.length <= 60) {
    score += 3;
  }
  
  // Bonus for good excerpt length
  if (article.excerpt.length >= 120 && article.excerpt.length <= 160) {
    score += 2;
  }
  
  // Bonus for reading time
  if (article.readingTime >= 6 && article.readingTime <= 8) {
    score += 2;
  }
  
  // Bonus for image
  if (article.image.url && article.image.url !== '') {
    score += 3;
  }
  
  return Math.min(score, 100); // Cap at 100
}

// Generate articles for a specific category
async function generateArticlesForCategory(category: string, count: number = 2): Promise<void> {
  console.log(`🚀 Generating ${count} articles for category: ${category}`);
  
  const topics = ADVANCED_TOPICS[category as keyof typeof ADVANCED_TOPICS] || [];
  
  if (topics.length === 0) {
    console.warn(`⚠️ No topics found for category: ${category}`);
    return;
  }
  
  // Shuffle topics to ensure variety
  const shuffledTopics = topics.sort(() => Math.random() - 0.5);
  
  for (let i = 0; i < Math.min(count, shuffledTopics.length); i++) {
    try {
      const topic = shuffledTopics[i];
      console.log(`\n📝 Generating article ${i + 1}/${count}: ${topic}`);
      
      // Generate article
      const article = await generateAndSaveArticle(category, topic);
      
      // Save locally
      await saveArticleLocally(article);
      
      // Upload to Supabase
      const uploaded = await uploadArticleToSupabase(article);
      
      if (uploaded) {
        console.log(`🎉 Article ${i + 1} completed successfully!`);
      } else {
        console.log(`⚠️ Article ${i + 1} generated but upload failed`);
      }
      
      // Add delay between articles to avoid overwhelming the system
      if (i < count - 1) {
        console.log(`⏳ Waiting 5 seconds before next article...`);
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
      
    } catch (error) {
      console.error(`❌ Error generating article ${i + 1} for ${category}:`, error);
    }
  }
}

// Main function to generate articles for all categories
async function generateAllArticles(articlesPerCategory: number = 2): Promise<void> {
  console.log(`🚀 Starting advanced human-like article generation`);
  console.log(`📊 Target: ${articlesPerCategory} articles per category`);
  console.log(`🎯 Total target: ${articlesPerCategory * Object.keys(ADVANCED_TOPICS).length} articles`);
  
  try {
    for (const category of Object.keys(ADVANCED_TOPICS)) {
      console.log(`\n${'='.repeat(50)}`);
      console.log(`🎯 Category: ${category.toUpperCase()}`);
      console.log(`${'='.repeat(50)}`);
      
      await generateArticlesForCategory(category, articlesPerCategory);
      
      // Add delay between categories
      console.log(`⏳ Waiting 10 seconds before next category...`);
      await new Promise(resolve => setTimeout(resolve, 10000));
    }
    
    console.log(`\n🎉 All article generation completed!`);
    console.log(`📝 Check the src/data/ directory for local files`);
    console.log(`🌐 Check Supabase for uploaded articles`);
    
  } catch (error) {
    console.error(`❌ Fatal error during article generation:`, error);
  }
}

// Command line interface
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    // Generate articles for all categories
    await generateAllArticles(2);
  } else if (args.length === 2) {
    // Generate articles for specific category
    const [category, countStr] = args;
    const count = parseInt(countStr) || 1;
    
    if (ADVANCED_TOPICS[category as keyof typeof ADVANCED_TOPICS]) {
      await generateArticlesForCategory(category, count);
    } else {
      console.error(`❌ Invalid category: ${category}`);
      console.log(`📋 Available categories: ${Object.keys(ADVANCED_TOPICS).join(', ')}`);
    }
  } else {
    console.log(`📖 Usage:`);
    console.log(`  npm run generate-articles                    # Generate 2 articles per category`);
    console.log(`  npm run generate-articles technology 3      # Generate 3 articles for technology`);
    console.log(`  npm run generate-articles world 1           # Generate 1 article for world`);
    console.log(`\n📋 Available categories: ${Object.keys(ADVANCED_TOPICS).join(', ')}`);
  }
}

// Run the script
if (require.main === module) {
  main().catch(console.error);
}

export { generateAllArticles, generateArticlesForCategory };
