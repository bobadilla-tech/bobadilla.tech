# Bobadilla Tech

A professional portfolio and business website built with Next.js 16 and deployed
on Cloudflare Workers.

## 🚀 Tech Stack

- **Framework:** Next.js 16.1.6 (App Router with Turbopack)
- **Deployment:** Cloudflare Workers via OpenNext.js
- **Database:** Cloudflare D1 (SQLite)
- **ORM:** Drizzle ORM
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Validation:** Zod
- **Email:** External Cloudflare Worker

## 📋 Features

- **Contact Form** - Database-backed with email notifications
- **Tools Section** - Utility tools (e.g., Reddit Post Date Extractor)
- **Modular API Architecture** - Clean, maintainable endpoint structure
- **Type-Safe** - Full TypeScript + Zod validation
- **Edge-Optimized** - Deployed on Cloudflare's global network
- **SEO-Optimized** - Dynamic sitemap, robots.txt, structured data, Open Graph metadata

## 🏗️ Architecture

This project follows a clean, modular architecture pattern:

```
src/
├── app/
│   ├── api/                    # API endpoints
│   │   ├── contact/            # Contact form API
│   │   │   ├── route.ts        # Request handler
│   │   │   ├── validation.ts   # Zod schemas
│   │   │   ├── db.ts           # Database operations
│   │   │   ├── email-notification.ts
│   │   │   └── logger.ts
│   │   └── reddit-post-date/   # Reddit tool API
│   │       ├── route.ts
│   │       ├── validation.ts
│   │       └── reddit-client.ts
│   └── tools/                  # Tool pages
│
├── db/
│   ├── client.ts               # D1 database client
│   └── schema.ts               # Drizzle schema
│
└── lib/
    └── server/
        └── api-response.ts     # Standardized responses
```

See [claude.md](claude.md) for complete architecture documentation.

## 🛠️ Development

### Prerequisites

- Node.js 20.9+ (use [Volta](https://volta.sh/) or
  [nvm](https://github.com/nvm-sh/nvm))
- npm/yarn/pnpm

### Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd bobadilla-work
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Initialize local D1 database**

   ```bash
   npx wrangler d1 execute bobadilla-work --local --file=./drizzle/migrations/0000_*.sql
   ```

5. **Start development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3001](http://localhost:3001) in your browser.

### Development Commands

```bash
# Run Next.js dev server (with local D1)
npm run dev

# Preview on Cloudflare runtime
npm run preview

# Build for production
npm run build

# Deploy to Cloudflare
npm run deploy

# Lint code
npm run lint

# Type check
npm run type-check
```

## 🗄️ Database

### Cloudflare D1 + Drizzle ORM

This project uses Cloudflare D1 (serverless SQLite) with Drizzle ORM for
type-safe database operations.

**Database:** `bobadilla-work` **Binding:** `DB`

### Schema Management

**Generate migration:**

```bash
# 1. Edit src/db/schema.ts
# 2. Generate migration
npx drizzle-kit generate
```

**Apply migration:**

```bash
# Local
npx wrangler d1 execute bobadilla-work --local --file=./drizzle/migrations/XXXX.sql

# Production
npx wrangler d1 execute bobadilla-work --remote --file=./drizzle/migrations/XXXX.sql
```

**Query database:**

```bash
# Local
npx wrangler d1 execute bobadilla-work --local --command="SELECT * FROM contact_messages"

# Production
npx wrangler d1 execute bobadilla-work --remote --command="SELECT * FROM contact_messages"
```

**Visual database browser:**

```bash
npx drizzle-kit studio
```

### Environment Variables

Configure in Cloudflare Dashboard or via wrangler:

- `EMAIL_WORKER_URL` - External email worker endpoint
- `EMAIL_WORKER_API_KEY` - Email worker authentication

D1 database binding is configured in `wrangler.jsonc` (no secrets needed).

## 🏛️ Architecture Patterns

This project follows specific architectural patterns for maintainability:

- **Modular API Endpoints** - Self-contained with separated concerns
- **Standardized Responses** - Consistent JSON format across all APIs
- **Type Safety** - Full TypeScript + Zod validation
- **Clean Separation** - Validation, business logic, and data access are
  separate

See [claude.md](claude.md) for:

- API endpoint structure guidelines
- Coding conventions
- Creating new endpoints
- Best practices

## 🧪 Testing

### Local Testing

```bash
# Test contact form locally
curl -X POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "This is a test message"
  }'
```

### Database Testing

```bash
# Add test data
npx wrangler d1 execute bobadilla-work --local --command="
INSERT INTO contact_messages (name, email, company, message)
VALUES ('Test', 'test@test.com', 'Test Co', 'Test message')
"

# Query test data
npx wrangler d1 execute bobadilla-work --local --command="
SELECT * FROM contact_messages ORDER BY created_at DESC LIMIT 5
"
```

## 🔍 SEO & Search Console

### Sitemap

The site automatically generates a sitemap at `/sitemap.xml` that includes:
- All static pages (home, pricing, services, tools)
- Dynamic service pages
- Industry-specific pages

**To update:** Edit `src/app/sitemap.ts` or the data in `src/data/services.ts`

### Search Engine Optimization

The project includes comprehensive SEO features:

- **robots.txt** - Located at `public/robots.txt`
- **Dynamic sitemap** - Auto-generated from route data
- **Structured data** - JSON-LD for organization, services, FAQs
- **Meta tags** - Open Graph, Twitter Cards, canonical URLs
- **SEO utilities** - Centralized in `src/lib/seo.ts`

**Google Search Console Setup:**
1. Verify domain ownership
2. Submit sitemap: `https://bobadilla.tech/sitemap.xml`
3. Monitor indexing status
4. Request indexing for priority pages

## 🎯 Production Deployment

### Cloudflare Configuration

**Recommended Cloudflare Settings:**
- **SSL/TLS**: Full (strict)
- **Always Use HTTPS**: Enabled (redirects HTTP to HTTPS)
- **Auto Minify**: Enable for HTML, CSS, JS
- **Brotli**: Enabled

### Deployment

```bash
# Build and deploy to Cloudflare
npm run deploy

# Verify deployment
curl -I https://bobadilla.tech
```

### Post-Deployment Checklist

- [ ] Verify site is accessible
- [ ] Test contact form submission
- [ ] Check `/sitemap.xml` is accessible
- [ ] Check `/robots.txt` is accessible
- [ ] Verify database migrations are applied
- [ ] Test tool functionality
- [ ] Confirm environment variables are set
