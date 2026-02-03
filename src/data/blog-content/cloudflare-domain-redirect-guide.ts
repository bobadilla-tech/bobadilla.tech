export const content = `# Mastering Domain Redirects in Cloudflare: A Complete Guide

Domain redirects are one of the most common tasks when managing web infrastructure, whether you're consolidating brands, migrating to a new domain, or simply redirecting www to non-www sites. Cloudflare makes this powerful, but there are subtle gotchas that can leave you staring at Error 522 or DNS_PROBE_FINISHED_NXDOMAIN for hours.

In this guide, I'll walk you through **exactly** how to redirect domains in Cloudflare, cover the common mistakes that bite developers, and show you how to troubleshoot issues systematically. This comes from real-world experience redirecting bobadilla.work → bobadilla.tech in production.

**What you'll learn:**

- The correct way to set up domain redirects using Cloudflare Redirect Rules
- How DNS records interact with redirect rules (this is where most people fail)
- Troubleshooting Error 522, NXDOMAIN, and other redirect issues
- When to use Redirect Rules vs Page Rules vs Workers
- SEO-safe redirect strategies (301 vs 302)
- Common pitfalls and how to avoid them

**Prerequisites:**

- A Cloudflare account with your domain(s) added
- Basic understanding of DNS (A records, CNAME, etc.)
- Access to Cloudflare Dashboard

---

## Why Domain Redirects Matter

Before diving into implementation, let's understand when and why you need domain redirects.

For the complete guide with DNS setup, troubleshooting steps, and advanced patterns, this is an excerpt. The full content is available on the website.`;
