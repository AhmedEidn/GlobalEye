import { generateOneArticle } from './advanced-human-writer';

async function testEnhancedArticleGeneration() {
  console.log('🧪 Testing Enhanced Human-Like Article Generation...');
  console.log('==================================================');
  
  try {
    // Test with technology category
    console.log('\n📱 Testing Technology Category...');
    const techArticle = await generateOneArticle('technology');
    
    if (techArticle) {
      console.log('✅ Technology article generated successfully!');
      console.log(`📰 Title: ${techArticle.title}`);
      console.log(`✍️ Author: ${techArticle.author}`);
      console.log(`📝 Summary: ${techArticle.summary.join(' ')}`);
      console.log(`📊 Body length: ${techArticle.body.length} characters`);
      console.log(`🖼️ Image: ${techArticle.image?.url ? 'Found' : 'Not found'}`);
      console.log(`🔗 Slug: ${techArticle.slug}`);
      console.log(`🏷️ Category: ${techArticle.category}`);
      console.log(`📅 Date: ${techArticle.publishDate}`);
    } else {
      console.log('❌ Failed to generate technology article');
    }
    
    // Test with world category
    console.log('\n🌍 Testing World Category...');
    const worldArticle = await generateOneArticle('world');
    
    if (worldArticle) {
      console.log('✅ World article generated successfully!');
      console.log(`📰 Title: ${worldArticle.title}`);
      console.log(`✍️ Author: ${worldArticle.author}`);
      console.log(`📝 Summary: ${worldArticle.summary.join(' ')}`);
      console.log(`📊 Body length: ${worldArticle.body.length} characters`);
      console.log(`🖼️ Image: ${worldArticle.image?.url ? 'Found' : 'Not found'}`);
      console.log(`🔗 Slug: ${worldArticle.slug}`);
      console.log(`🏷️ Category: ${worldArticle.category}`);
      console.log(`📅 Date: ${worldArticle.publishDate}`);
    } else {
      console.log('❌ Failed to generate world article');
    }
    
    console.log('\n🎉 Enhanced article generation test completed!');
    
  } catch (error) {
    console.error('❌ Test error:', error);
  }
}

// Run the test
testEnhancedArticleGeneration();
