export const content = `# Deploying Next.js 16 to Cloudflare Workers: A Complete Architecture Guide

Building a production-ready Next.js application that's blazingly fast, globally distributed, and cost-effective is completely achievable with Cloudflare Workers. In this comprehensive guide, I'll walk you through exactly how we built [bobadilla.tech](https://bobadilla.tech), including the architecture decisions, deployment process, and performance optimizations that resulted in sub-50ms response times worldwide.

**What you'll learn:**

- How to deploy Next.js 16 to Cloudflare's edge network using OpenNext.js
- Building a TypeScript-based blog system with inline markdown
- Implementing static generation for maximum performance
- Integrating Cloudflare D1 (SQLite at the edge) with Drizzle ORM
- SEO optimization strategies with Open Graph and structured data
- Complete architecture breakdown you can replicate

**Live site:** [https://bobadilla.tech](https://bobadilla.tech)
**Source code:** [https://github.com/bobadilla-tech/agency-landing](https://github.com/bobadilla-tech/agency-landing)

This guide is for developers who want to build fast, scalable web applications on the edge without the complexity and cost of traditional infrastructure.

---

## 1. Tech Stack Overview

Let me start by explaining the technology choices and why each piece was selected for this architecture.

### Core Framework: Next.js 16 with App Router

We chose **Next.js 16** for several compelling reasons:

- **App Router stability**: The App Router has matured significantly, offering better performance and developer experience than the Pages Router
- **Server Components**: Reduce JavaScript bundle size by rendering components on the server
- **Turbopack**: Lightning-fast development builds (5-10x faster than Webpack)
- **Built-in optimizations**: Automatic code splitting, image optimization, and font optimization out of the box
- **Edge-ready**: Designed to work seamlessly with edge runtimes like Cloudflare Workers

For the complete architecture guide with detailed implementation steps, performance optimizations, and deployment instructions, visit [bobadilla.tech/blog](https://bobadilla.tech/blog).`;
