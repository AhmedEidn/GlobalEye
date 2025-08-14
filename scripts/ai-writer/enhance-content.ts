#!/usr/bin/env ts-node

import { ContentQualityEnhancer } from './content-quality-enhancer';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

async function main() {
  try {
    console.log('🚀 Starting Content Quality Enhancement Process...\n');
    
    // Check command line arguments
    const args = process.argv.slice(2);
    const command = args[0];
    
    switch (command) {
      case 'single':
        const articleId = args[1];
        if (!articleId) {
          console.error('❌ Please provide an article ID');
          console.log('Usage: pnpm run enhance:single <article-id>');
          process.exit(1);
        }
        
        console.log(`🔧 Enhancing single article: ${articleId}`);
        const success = await ContentQualityEnhancer.enhanceArticleContent(articleId);
        
        if (success) {
          console.log('✅ Article enhanced successfully!');
        } else {
          console.log('❌ Failed to enhance article');
          process.exit(1);
        }
        break;
        
      case 'batch':
        const limit = args[1] ? parseInt(args[1]) : 10;
        console.log(`🔧 Starting batch enhancement of ${limit} articles...`);
        
        const enhancedCount = await ContentQualityEnhancer.batchEnhanceArticles(limit);
        
        if (enhancedCount > 0) {
          console.log(`✅ Successfully enhanced ${enhancedCount} articles!`);
        } else {
          console.log('❌ No articles were enhanced');
          process.exit(1);
        }
        break;
        
      case 'all':
        console.log('🔧 Starting enhancement of all articles...');
        
        const allEnhancedCount = await ContentQualityEnhancer.batchEnhanceArticles(1000);
        
        if (allEnhancedCount > 0) {
          console.log(`✅ Successfully enhanced ${allEnhancedCount} articles!`);
        } else {
          console.log('❌ No articles were enhanced');
          process.exit(1);
        }
        break;
        
      default:
        console.log('🎯 Content Quality Enhancement Tool');
        console.log('');
        console.log('Usage:');
        console.log('  pnpm run enhance:single <article-id>  - Enhance a single article');
        console.log('  pnpm run enhance:batch [limit]        - Enhance recent articles (default: 10)');
        console.log('  pnpm run enhance:all                  - Enhance all articles');
        console.log('');
        console.log('Examples:');
        console.log('  pnpm run enhance:single abc-123-def');
        console.log('  pnpm run enhance:batch 20');
        console.log('  pnpm run enhance:all');
        break;
    }
    
  } catch (error) {
    console.error('❌ Error in content enhancement process:', error);
    process.exit(1);
  }
}

// Run the main function
main().catch(console.error);
