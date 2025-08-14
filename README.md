# 🌍 GlobalEye News

A modern, AI-powered news website built with Next.js, Supabase, and Ollama. Features human-like article generation, Google Analytics integration, and comprehensive SEO optimization.

## ✨ Features

### 🚀 **Core Features**
- **AI Article Generation** - Human-like articles using Ollama
- **Real-time Content** - Trending topics from News API
- **Dynamic Authors** - Random, realistic author names
- **Image Integration** - Pexels and Unsplash with anti-duplication
- **SEO Optimized** - Complete sitemap and meta tags

### 📊 **Analytics & Tracking**
- **Google Analytics 4** - Comprehensive user tracking
- **Performance Monitoring** - Core Web Vitals tracking
- **User Interaction** - Detailed engagement analytics
- **Content Analytics** - Article and category performance

### 🔐 **Authentication**
- **Google OAuth** - Secure social login
- **Supabase Backend** - Scalable database solution
- **User Profiles** - Personalized experience

### 📱 **Modern UI/UX**
- **Responsive Design** - Mobile-first approach
- **Tailwind CSS** - Modern styling framework
- **Dark/Light Mode** - User preference support
- **Infinite Scroll** - Smooth content browsing

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, Heroicons
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **AI**: Ollama (Local LLM)
- **Analytics**: Google Analytics 4
- **Images**: Pexels API, Unsplash API
- **News**: News API for trending topics

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and pnpm
- Supabase account
- Ollama installed locally
- Google Analytics account (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd globaleye
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp ENV_TEMPLATE.md .env.local
   # Edit .env.local with your API keys
   ```

4. **Set up Supabase**
   ```bash
   # Run the database setup script
   pnpm run upload-data
   ```

5. **Start Ollama**
   ```bash
   ollama serve
   ollama pull qwen2.5:0.5b
   ```

6. **Run the development server**
   ```bash
   pnpm run dev
   ```

## 📝 Environment Variables

Create `.env.local` with the following variables:

```env
# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# AI Writer Configuration
OLLAMA_HOST=http://localhost:11434
OLLAMA_MODEL=qwen2.5:0.5b
PEXELS_API_KEY=your_pexels_api_key
UNSPLASH_ACCESS_KEY=your_unsplash_access_key

# NextAuth Configuration
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=https://your-domain.com
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Google Analytics (Optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

## 🎯 AI Article Generation

### Commands

- **Generate once**: `pnpm run ai:once`
- **Run continuously**: `pnpm run ai:cron`
- **Generate specific category**: `pnpm run generate-tech`

### Features

- **Human-like writing** - Natural language patterns
- **Trending topics** - Real-time content relevance
- **Anti-duplication** - Unique images and topics
- **Quality control** - SEO optimization and readability
- **Multi-language support** - English content only

## 📊 Analytics Features

### Google Analytics 4
- **Page Views** - Automatic tracking
- **User Engagement** - Time on page, scroll depth
- **Content Performance** - Article and category metrics
- **User Behavior** - Click tracking, navigation patterns
- **Performance Metrics** - Core Web Vitals

### Custom Events
- Article views and reading time
- Category exploration
- User interactions and engagement
- Form submissions and conversions

## 🔧 Development

### Scripts

```bash
# Development
pnpm run dev          # Start development server
pnpm run build        # Build for production
pnpm run start        # Start production server
pnpm run lint         # Run ESLint

# AI Writer
pnpm run ai:build     # Build AI scripts
pnpm run ai:once      # Generate one article
pnpm run ai:cron      # Run continuous generation

# Database
pnpm run upload-data  # Upload initial data
```

### Project Structure

```
globaleye/
├── src/
│   ├── app/          # Next.js app router
│   ├── components/   # React components
│   └── lib/          # Utilities and configurations
├── scripts/
│   └── ai-writer/    # AI article generation
├── public/            # Static assets
└── docs/             # Documentation
```

## 📈 Performance

- **Core Web Vitals** - Optimized for Google PageSpeed
- **Image Optimization** - Next.js automatic optimization
- **Code Splitting** - Efficient bundle loading
- **SEO Ready** - Complete meta tags and sitemaps

## 🌐 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository
2. Set environment variables
3. Deploy automatically

### Docker
```bash
docker build -t globaleye .
docker run -p 3000:3000 globaleye
```

## 📚 Documentation

- [Environment Setup](ENV_TEMPLATE.md)
- [Google OAuth Setup](GOOGLE_OAUTH_SETUP.md)
- [Advanced Article Generation](ADVANCED_ARTICLE_GENERATION.md)
- [Supabase Setup](SUPABASE_SETUP.md)
- [Deployment Guide](DEPLOYMENT.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Check the documentation files
- Review the environment setup
- Ensure all dependencies are installed
- Verify API keys are correct

## 🎉 Acknowledgments

- Next.js team for the amazing framework
- Supabase for the backend infrastructure
- Ollama for local AI capabilities
- Tailwind CSS for the styling system
