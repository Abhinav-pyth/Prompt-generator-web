# AI Prompt Studio

Generate detailed, implementation-ready prompts for AI coding agents. Build websites and web applications from a reference URL or natural-language description.

![AI Prompt Studio](https://img.shields.io/badge/React-18-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Vite](https://img.shields.io/badge/Vite-6-purple) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-cyan)

## ✨ Features

- **Structured Prompt Generation**: 20-section prompts covering architecture, design, functionality, accessibility, and deployment
- **Multiple Tech Stacks**: Next.js, React, Vue, HTML/CSS/JS, Node.js, Java/Spring Boot
- **Agent-Specific Output**: Optimized for Claude Code, Qwen Code, Cursor, GitHub Copilot, or any generic agent
- **Reference URL Support**: Optional URL analysis for design inspiration (requires server-side configuration)
- **Template Library**: 8 curated templates for common project types
- **Local-First**: Works without API keys using a deterministic prompt builder
- **Dark/Light Theme**: System-aware theme with manual override
- **Generation History**: LocalStorage-persisted history with search and export
- **Export Options**: Copy to clipboard, download as Markdown or plain text
- **Responsive Design**: Mobile, tablet, and desktop optimized

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd ai-prompt-studio

# Install dependencies
npm install

# Copy environment variables (optional)
cp .env.example .env.local

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 📦 Scripts

```bash
# Development
npm run dev          # Start dev server on port 3000

# Production
npm run build        # Build for production
npm run preview      # Preview production build locally

# Type checking
npm run typecheck    # Run TypeScript compiler checks
```

## 🏗️ Project Structure

```
ai-prompt-studio/
├── src/
│   ├── components/       # Shared UI components
│   │   └── Layout.tsx    # App layout with navigation
│   ├── lib/              # Core business logic
│   │   ├── prompt-engine.ts    # Prompt generation engine
│   │   ├── validation.ts       # Zod schemas and types
│   │   ├── templates.ts        # Template definitions
│   │   ├── storage.ts          # LocalStorage persistence
│   │   └── theme.tsx           # Theme context provider
│   ├── pages/            # Route pages
│   │   ├── Landing.tsx   # Marketing landing page
│   │   ├── Studio.tsx    # Main prompt generator
│   │   ├── Templates.tsx # Template gallery
│   │   ├── History.tsx   # Generation history
│   │   └── Settings.tsx  # User preferences
│   ├── App.tsx           # Root component with routing
│   ├── main.tsx          # Entry point
│   └── index.css         # Global styles + Tailwind
├── public/               # Static assets
├── vercel.json           # Vercel deployment config
├── .env.example          # Environment variable template
├── vite.config.js        # Vite configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies and scripts
```

## 🎨 Routes

| Route | Description |
|-------|-------------|
| `/` | Marketing landing page with hero, features, FAQ |
| `/studio` | Main prompt generator with comprehensive form |
| `/templates` | Curated template library |
| `/history` | Saved generation history |
| `/settings` | User preferences and configuration |

## 🔧 Configuration

### Local Mode (No API Keys Required)

The application works out of the box without any configuration. The local prompt builder generates comprehensive prompts based on your input.

### Optional: AI-Powered Generation

To enable AI-powered prompt enhancement, configure a provider in `.env.local`:

```bash
# Choose your provider
AI_PROVIDER=anthropic  # or openai, google, none

# Add your API key
ANTHROPIC_API_KEY=your_key_here
```

**Note**: AI-powered generation requires server-side implementation. The current client-side version uses the deterministic local builder.

### Optional: Reference URL Analysis

To enable automatic reference website analysis:

```bash
REFERENCE_ANALYSIS_URL=https://your-analysis-service.com
REFERENCE_ANALYSIS_API_KEY=your_key_here
```

Without this configuration, reference URLs are noted in the prompt but not automatically analyzed.

### Optional: Database Persistence

To enable server-side history and saved projects:

```bash
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
```

Requires Prisma setup and migration.

## 🌐 Deployment

### Deploy to Vercel (Recommended)

The easiest way to deploy AI Prompt Studio is on Vercel.

#### Option 1: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

#### Option 2: Git Integration

1. Push your code to GitHub, GitLab, or Bitbucket
2. Import the project in [Vercel Dashboard](https://vercel.com/new)
3. Vercel auto-detects Vite and configures the build
4. Click "Deploy"

The `vercel.json` file handles:
- Client-side routing rewrites (SPA)
- Asset caching headers
- Security headers (X-Frame-Options, CSP, etc.)

#### Option 3: Vercel Dashboard

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your Git repository
3. Framework Preset: **Vite**
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Click "Deploy"

### Deploy to Other Platforms

#### Netlify

Create `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### Cloudflare Pages

- Build command: `npm run build`
- Output directory: `dist`

#### Self-Hosted

```bash
# Build
npm run build

# Serve with any static file server
npx serve dist
# or
python3 -m http.server 8080 --directory dist
```

### Environment Variables on Vercel

Add environment variables in the Vercel Dashboard:

1. Go to your project → Settings → Environment Variables
2. Add variables for each environment (Production, Preview, Development)
3. Redeploy to apply changes

**Never commit `.env.local` to version control.**

## 🧪 Testing

### Manual Testing Checklist

- [ ] Landing page renders correctly
- [ ] Studio form validates inputs
- [ ] Prompt generation produces 20-section output
- [ ] Copy to clipboard works
- [ ] Download as .md and .txt works
- [ ] History saves and retrieves entries
- [ ] Templates load and apply to studio
- [ ] Dark/light theme toggles
- [ ] Mobile responsive layout works
- [ ] Keyboard navigation works throughout

### Automated Testing

Add tests using your preferred framework:

```bash
# Example with Vitest
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

## 🔒 Security

### Implemented

- ✅ No API keys exposed in client bundles
- ✅ URL validation on reference inputs
- ✅ Security headers configured in `vercel.json`
- ✅ Input sanitization via Zod validation
- ✅ LocalStorage for client-side data only
- ✅ No external API calls without configuration

### Best Practices

- Never commit `.env.local` to version control
- Use Vercel's environment variable management
- Rotate API keys regularly
- Monitor usage and set rate limits
- Review dependencies for vulnerabilities: `npm audit`

## 📊 Performance

### Optimizations

- **Code Splitting**: Vite automatically splits code by route
- **Asset Optimization**: Images, fonts, and CSS are optimized
- **Caching**: Static assets cached for 1 year with immutable flag
- **Tree Shaking**: Unused code eliminated during build
- **Compression**: Vercel automatically compresses responses

### Core Web Vitals Targets

- LCP: < 2.5s
- FID: < 100ms
- CLS: < 0.1

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS 4
- **Routing**: React Router 6
- **Validation**: Zod
- **Forms**: React Hook Form (optional)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📧 Support

For issues and questions:

- Open an issue on GitHub
- Check existing documentation
- Review the code comments

## 🗺️ Roadmap

- [ ] Server-side AI provider integration
- [ ] Database persistence with Prisma
- [ ] User authentication
- [ ] Team workspaces
- [ ] Subscription billing
- [ ] More templates
- [ ] Prompt comparison view
- [ ] Export to multiple formats (PDF, HTML)
- [ ] Collaborative editing
- [ ] API for programmatic access

---

**Built with ❤️ for developers who want better AI-generated code.**
