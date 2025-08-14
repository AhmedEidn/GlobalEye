import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Supabase Configuration
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl!, supabaseKey!);

// Content Quality Enhancement System
export class ContentQualityEnhancer {
  
  // Enhanced writing patterns for human-like content
  private static readonly ENHANCED_PATTERNS = {
    // Natural conversation starters
    conversationStarters: [
      "You know what's interesting?", "Here's something I've been thinking about",
      "I was reading about this the other day", "It's fascinating how",
      "What really caught my attention", "I couldn't help but notice",
      "This is something that's been on my mind", "I've been following this story",
      "What strikes me about this", "I find it remarkable that"
    ],
    
    // Personal experience markers
    personalMarkers: [
      "From my own experience", "I've seen this happen", "In my travels",
      "Through my research", "From what I've observed", "I've noticed that",
      "What I've discovered", "In my conversations with", "From my interviews",
      "Based on my observations", "I've found that", "In my investigation"
    ],
    
    // Expert opinion markers
    expertMarkers: [
      "According to experts", "Research suggests", "Studies indicate",
      "Data shows", "Analysis reveals", "Evidence points to",
      "Findings suggest", "Observations indicate", "Reports show",
      "Specialists believe", "Professionals suggest", "Authorities indicate"
    ],
    
    // Natural transitions
    naturalTransitions: [
      "But here's the thing", "What's more interesting", "Here's what's fascinating",
      "The real story", "What I learned", "Here's what happened next",
      "But wait", "Here's the twist", "What surprised me", "The funny thing is",
      "You see", "Here's why", "The truth is", "What really matters",
      "But that's not all", "Here's the kicker", "What's more", "On top of that"
    ],
    
    // Emotional expressions
    emotionalExpressions: [
      "I'm genuinely excited about", "It's truly amazing how",
      "I'm honestly surprised by", "It's really fascinating that",
      "I'm genuinely impressed with", "It's truly remarkable how",
      "I'm honestly concerned about", "It's really interesting that"
    ]
  };

  // Enhance article content to be more human-like
  static async enhanceArticleContent(articleId: string): Promise<boolean> {
    try {
      console.log(`🔧 Enhancing content quality for article: ${articleId}`);
      
      // Fetch the article
      const { data: article, error } = await supabase
        .from('articles')
        .select('*')
        .eq('id', articleId)
        .single();
      
      if (error || !article) {
        console.error('❌ Error fetching article:', error);
        return false;
      }
      
      // Enhance the content
      const enhancedContent = this.enhanceContent(article.content);
      
      // Update the article with enhanced content
      const { error: updateError } = await supabase
        .from('articles')
        .update({ 
          content: enhancedContent,
          updated_at: new Date().toISOString()
        })
        .eq('id', articleId);
      
      if (updateError) {
        console.error('❌ Error updating article:', updateError);
        return false;
      }
      
      console.log(`✅ Article content enhanced successfully!`);
      return true;
      
    } catch (error) {
      console.error('❌ Error enhancing article content:', error);
      return false;
    }
  }

  // Main content enhancement function
  private static enhanceContent(content: string): string {
    let enhanced = content;
    
    // Add natural conversation starters
    enhanced = this.addConversationStarters(enhanced);
    
    // Add personal experience markers
    enhanced = this.addPersonalMarkers(enhanced);
    
    // Add expert opinion markers
    enhanced = this.addExpertMarkers(enhanced);
    
    // Add natural transitions
    enhanced = this.addNaturalTransitions(enhanced);
    
    // Add emotional expressions
    enhanced = this.addEmotionalExpressions(enhanced);
    
    // Improve sentence variety
    enhanced = this.improveSentenceVariety(enhanced);
    
    // Add contextual details
    enhanced = this.addContextualDetails(enhanced);
    
    // Final cleanup
    enhanced = this.finalCleanup(enhanced);
    
    return enhanced;
  }

  // Add natural conversation starters
  private static addConversationStarters(content: string): string {
    const sentences = content.split('. ');
    if (sentences.length > 2) {
      const starter = this.getRandomElement(this.ENHANCED_PATTERNS.conversationStarters);
      sentences[1] = `${starter}, ${sentences[1].toLowerCase()}`;
    }
    return sentences.join('. ');
  }

  // Add personal experience markers
  private static addPersonalMarkers(content: string): string {
    const sentences = content.split('. ');
    for (let i = 2; i < sentences.length; i++) {
      if (Math.random() > 0.7) {
        const marker = this.getRandomElement(this.ENHANCED_PATTERNS.personalMarkers);
        sentences[i] = `${marker}, ${sentences[i].toLowerCase()}`;
      }
    }
    return sentences.join('. ');
  }

  // Add expert opinion markers
  private static addExpertMarkers(content: string): string {
    const sentences = content.split('. ');
    for (let i = 3; i < sentences.length; i++) {
      if (Math.random() > 0.6) {
        const marker = this.getRandomElement(this.ENHANCED_PATTERNS.expertMarkers);
        sentences[i] = `${marker}, ${sentences[i].toLowerCase()}`;
      }
    }
    return sentences.join('. ');
  }

  // Add natural transitions between paragraphs
  private static addNaturalTransitions(content: string): string {
    const paragraphs = content.split('\n\n');
    for (let i = 1; i < paragraphs.length; i++) {
      if (Math.random() > 0.6) {
        const transition = this.getRandomElement(this.ENHANCED_PATTERNS.naturalTransitions);
        paragraphs[i] = `${transition}, ${paragraphs[i].toLowerCase()}`;
      }
    }
    return paragraphs.join('\n\n');
  }

  // Add emotional expressions
  private static addEmotionalExpressions(content: string): string {
    const sentences = content.split('. ');
    for (let i = 1; i < sentences.length; i++) {
      if (Math.random() > 0.8) {
        const expression = this.getRandomElement(this.ENHANCED_PATTERNS.emotionalExpressions);
        sentences[i] = `${expression} ${sentences[i].toLowerCase()}`;
      }
    }
    return sentences.join('. ');
  }

  // Improve sentence variety
  private static improveSentenceVariety(content: string): string {
    let improved = content;
    
    // Vary sentence starters
    const sentences = improved.split('. ');
    for (let i = 1; i < sentences.length; i++) {
      if (Math.random() > 0.7) {
        const starters = [
          "Additionally,", "Furthermore,", "Moreover,", "In addition,",
          "What's more,", "Beyond that,", "On top of that,", "Not only that,"
        ];
        const starter = this.getRandomElement(starters);
        sentences[i] = `${starter} ${sentences[i].toLowerCase()}`;
      }
    }
    
    return sentences.join('. ');
  }

  // Add contextual details
  private static addContextualDetails(content: string): string {
    let detailed = content;
    
    // Add specific examples
    const examplePhrases = [
      "For example,", "Take, for instance,", "Consider this:",
      "Here's an example:", "To illustrate,", "As a case in point,"
    ];
    
    const sentences = detailed.split('. ');
    for (let i = 2; i < sentences.length; i++) {
      if (Math.random() > 0.8) {
        const phrase = this.getRandomElement(examplePhrases);
        sentences[i] = `${phrase} ${sentences[i].toLowerCase()}`;
      }
    }
    
    return sentences.join('. ');
  }

  // Final cleanup and formatting
  private static finalCleanup(content: string): string {
    return content
      // Remove any remaining instruction artifacts
      .replace(/^(Here's|This is|Let me|I'll|We'll|You'll|We can|You can):.*$/gm, '')
      
      // Clean up excessive punctuation
      .replace(/\.{2,}/g, '.')
      .replace(/\s+\./g, '.')
      .replace(/,\s*,/g, ',')
      
      // Fix spacing
      .replace(/\s+/g, ' ')
      .replace(/\n\s*\n/g, '\n\n')
      
      // Ensure proper sentence endings
      .replace(/([^.!?])\s*$/g, '$1.')
      
      .trim();
  }

  // Helper function to get random element
  private static getRandomElement<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }

  // Batch enhance multiple articles
  static async batchEnhanceArticles(limit: number = 10): Promise<number> {
    try {
      console.log(`🚀 Starting batch enhancement of ${limit} articles...`);
      
      // Fetch recent articles that haven't been enhanced
      const { data: articles, error } = await supabase
        .from('articles')
        .select('id, title')
        .order('created_at', { ascending: false })
        .limit(limit);
      
      if (error || !articles) {
        console.error('❌ Error fetching articles:', error);
        return 0;
      }
      
      let enhancedCount = 0;
      
      for (const article of articles) {
        const success = await this.enhanceArticleContent(article.id);
        if (success) {
          enhancedCount++;
          console.log(`✅ Enhanced: ${article.title}`);
        }
        
        // Small delay to avoid overwhelming the system
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      console.log(`🎉 Batch enhancement completed! Enhanced ${enhancedCount}/${articles.length} articles`);
      return enhancedCount;
      
    } catch (error) {
      console.error('❌ Error in batch enhancement:', error);
      return 0;
    }
  }
}

// Export for use in other files
export default ContentQualityEnhancer;
