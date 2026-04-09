# Bobadilla Tech

A professional portfolio and business website built with Next.js 16 and deployed
on Cloudflare Workers.

## 🚀 Tech Stack

- **Framework:** Next.js 16 (App Router with Turbopack)
- **Deployment:** Cloudflare Workers via OpenNext.js
- **CMS:** Sanity — blog posts authored and managed in [studio-bobadilla-tech-blogs](https://github.com/UltiRequiem/studio-bobadilla-tech-blogs)
- **Database:** Cloudflare D1 (SQLite)
- **ORM:** Drizzle ORM
- **Styling:** Tailwind CSS v4
- **Language:** TypeScript
- **Validation:** Zod
- **Email:** External Cloudflare Worker

## 📋 Features

- **Blog** - Posts authored in Sanity Studio, fetched at build time, served as static HTML
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

See [CLAUDE.md](CLAUDE.md) for complete architecture documentation.

## ✍️ Blog (Sanity CMS)

Blog posts are managed in a separate Sanity Studio:
**[github.com/UltiRequiem/studio-bobadilla-tech-blogs](https://github.com/UltiRequiem/studio-bobadilla-tech-blogs)**

The Next.js site fetches published posts from Sanity at build time (`generateStaticParams`) — no API key required for reads. The Sanity project ID (`5j8mujwd`, dataset `production`) is public.

To publish a new post: open the Studio → write → publish → redeploy this site.

## 🛠️ Development

### Prerequisites

- Node.js 20.9+ (use [Volta](https://volta.sh/) or
  [nvm](https://github.com/nvm-sh/nvm))
- pnpm (install with `npm install -g pnpm`)

### Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd bobadilla-work
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Initialize local D1 database**

   ```bash
   pnpm exec wrangler d1 execute bobadilla-work --local --file=./drizzle/migrations/0000_*.sql
   ```

5. **Start development server**

   ```bash
   pnpm run dev
   ```

   Open [http://localhost:3001](http://localhost:3001) in your browser.

### Development Commands

```bash
# Run Next.js dev server (with local D1)
pnpm run dev

# Preview on Cloudflare runtime
pnpm run preview

# Build for production
pnpm run build

# Deploy to Cloudflare
pnpm run deploy

# Lint code
pnpm run lint

# Type check
pnpm run type-check
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
pnpm exec drizzle-kit generate
```

**Apply migration:**

```bash
# Local
pnpm exec wrangler d1 execute bobadilla-work --local --file=./drizzle/migrations/XXXX.sql

# Production
pnpm exec wrangler d1 execute bobadilla-work --remote --file=./drizzle/migrations/XXXX.sql
```

**Query database:**

```bash
# Local
pnpm exec wrangler d1 execute bobadilla-work --local --command="SELECT * FROM contact_messages"

# Production
pnpm exec wrangler d1 execute bobadilla-work --remote --command="SELECT * FROM contact_messages"
```

**Visual database browser:**

```bash
pnpm exec drizzle-kit studio
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
pnpm exec wrangler d1 execute bobadilla-work --local --command="
INSERT INTO contact_messages (name, email, company, message)
VALUES ('Test', 'test@test.com', 'Test Co', 'Test message')
"

# Query test data
pnpm exec wrangler d1 execute bobadilla-work --local --command="
SELECT * FROM contact_messages ORDER BY created_at DESC LIMIT 5
"
```
