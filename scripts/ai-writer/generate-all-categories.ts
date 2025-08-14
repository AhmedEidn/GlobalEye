import { generateOneArticle } from './advanced-human-writer';

async function generateArticlesForAllCategories() {
  console.log('🚀 Starting Enhanced Article Generation for All Categories...');
  console.log('============================================================');
  
  const categories = [
    'world', 'technology', 'health', 'business', 
    'entertainment', 'science', 'lifestyle', 'celebrities'
  ];
  
  const results: { category: string; ok: boolean; title?: string; slug?: string; error?: string }[] = [];
  
  for (const category of categories) {
    try {
      console.log(`\n📝 Generating article for ${category}...`);
      const article = await generateOneArticle(category);
      
      if (article) {
        results.push({ 
          category, 
          ok: true, 
          title: article.title,
          slug: article.slug 
        });
        console.log(`✅ Successfully generated article for ${category}: ${article.title}`);
        console.log(`   Author: ${article.author}`);
        console.log(`   Body length: ${article.body.length} characters`);
        console.log(`   Slug: ${article.slug}`);
        console.log(`   Image: ${article.image?.url ? 'Found' : 'Not found'}`);
      } else {
        results.push({ 
          category, 
          ok: false, 
          error: 'Failed to generate article' 
        });
        console.log(`❌ Failed to generate article for ${category}`);
      }
    } catch (error: any) {
      const errorMsg = error?.message || String(error);
      results.push({ 
        category, 
        ok: false, 
        error: errorMsg 
      });
      console.error(`❌ Error generating article for ${category}:`, errorMsg);
    }
  }
  
  // Summary
  const successCount = results.filter(r => r.ok).length;
  const totalCount = results.length;
  
  console.log(`\n📊 Article generation complete: ${successCount}/${totalCount} categories successful`);
  console.log('\n📋 Results Summary:');
  
  results.forEach(result => {
    if (result.ok) {
      console.log(`✅ ${result.category}: ${result.title} (${result.slug})`);
    } else {
      console.log(`❌ ${result.category}: ${result.error}`);
    }
  });
  
  console.log(`\n🎉 Enhanced article generation completed!`);
  
  return results;
}

// Run the generation
generateArticlesForAllCategories().catch(console.error);
