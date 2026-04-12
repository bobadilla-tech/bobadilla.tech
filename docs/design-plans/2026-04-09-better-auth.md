# Better Auth Integration — Admin Panel for Contact Messages

**Date:** 2026-04-09\
**Goal:** Add Better Auth to the project so an admin can sign in and view
contact form submissions. Admin users are created via CLI (two-step bootstrap).
The system is designed to grow with more features over time.

---

## Context

The project runs on **Next.js 16** deployed to **Cloudflare Workers** via
OpenNext.js. The database is **Cloudflare D1** (SQLite), accessed through
Drizzle ORM. The critical constraint: D1 is only available at request time via
`getCloudflareContext().env.DB`, so the auth instance must be a per-request
factory, not a singleton.

The public site has locale-prefixed routing (`/en/`, `/es/`, `/pt/`) via
next-intl. The admin panel lives at `/admin/*` outside of i18n routing.

---

## What's Already in Place

- `nodejs_compat` is already in `wrangler.jsonc` — no change needed
- Drizzle ORM + D1 client pattern is established in `src/db/client.ts`
- `@t3-oss/env-nextjs` handles env validation in `src/env.ts`

---

## Files to Create / Modify

| File                                 | Action                                      |
| ------------------------------------ | ------------------------------------------- |
| `src/db/schema.ts`                   | Add 4 Better Auth tables                    |
| `src/lib/auth.ts`                    | Create per-request auth factory             |
| `src/lib/auth-client.ts`             | Create browser-side auth client             |
| `src/app/api/auth/[...all]/route.ts` | Mount Better Auth handler                   |
| `src/app/admin/layout.tsx`           | Full session + role verification            |
| `src/app/admin/sign-in/page.tsx`     | Sign-in form (client component)             |
| `src/app/admin/messages/page.tsx`    | Contact messages list                       |
| `src/middleware.ts`                  | Add `/admin/*` cookie-based guard           |
| `src/env.ts`                         | Add `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL` |
| `.dev.vars`                          | Add secrets for local dev                   |

---

## Step 1 — Install

```bash
npm install better-auth
```

---

## Step 2 — Environment Variables

Add to `.dev.vars` (local Cloudflare dev):

```
BETTER_AUTH_SECRET=<32+ random chars>
BETTER_AUTH_URL=http://localhost:3000
```

Add production secrets via Wrangler:

```bash
wrangler secret put BETTER_AUTH_SECRET
wrangler secret put BETTER_AUTH_URL
```

Update `src/env.ts` — add to `server` block:

```ts
BETTER_AUTH_SECRET: z.string().min(32),
BETTER_AUTH_URL: z.url(),
```

---

## Step 3 — Drizzle Schema (`src/db/schema.ts`)

Add alongside existing tables. Include the `admin` plugin columns upfront to
avoid future migrations:

```ts
export const user = sqliteTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: integer("email_verified", { mode: "boolean" }).notNull()
    .default(false),
  image: text("image"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
  role: text("role").default("user"), // admin plugin
  banned: integer("banned", { mode: "boolean" }).default(false), // admin plugin
  banReason: text("ban_reason"), // admin plugin
  banExpires: integer("ban_expires", { mode: "timestamp" }), // admin plugin
});

export const session = sqliteTable("session", {
  id: text("id").primaryKey(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  token: text("token").notNull().unique(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id").notNull().references(() => user.id, {
    onDelete: "cascade",
  }),
  impersonatedBy: text("impersonated_by"), // admin plugin
});

export const account = sqliteTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id").notNull().references(() => user.id, {
    onDelete: "cascade",
  }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: integer("access_token_expires_at", {
    mode: "timestamp",
  }),
  refreshTokenExpiresAt: integer("refresh_token_expires_at", {
    mode: "timestamp",
  }),
  scope: text("scope"),
  password: text("password"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const verification = sqliteTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }),
  updatedAt: integer("updated_at", { mode: "timestamp" }),
});
```

---

## Step 4 — Auth Instance Factory (`src/lib/auth.ts`)

Per-request factory — never a module-level singleton:

```ts
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin as adminPlugin } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import type { D1Database } from "@cloudflare/workers-types";
import { getDb } from "~/db/client";
import * as schema from "~/db/schema";

export function createAuth(d1: D1Database) {
  return betterAuth({
    secret: process.env.BETTER_AUTH_SECRET!,
    baseURL: process.env.BETTER_AUTH_URL!,
    database: drizzleAdapter(getDb(d1), {
      provider: "sqlite",
      schema: {
        user: schema.user,
        session: schema.session,
        account: schema.account,
        verification: schema.verification,
      },
    }),
    emailAndPassword: {
      enabled: true,
    },
    plugins: [
      adminPlugin(),
      nextCookies(), // must be last — handles cookie setting in Server Actions
    ],
  });
}

export type Auth = ReturnType<typeof createAuth>;
```

---

## Step 5 — Auth API Route (`src/app/api/auth/[...all]/route.ts`)

```ts
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { createAuth } from "~/lib/auth";
import type { NextRequest } from "next/server";

async function handler(req: NextRequest) {
  const { env } = await getCloudflareContext();
  const auth = createAuth(env.DB);
  return auth.handler(req);
}

export const GET = handler;
export const POST = handler;
```

---

## Step 6 — Auth Client (`src/lib/auth-client.ts`)

Singleton — runs in the browser only, no D1 access needed:

```ts
import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  plugins: [adminClient()],
});

export const { signIn, signOut, useSession } = authClient;
```

No `baseURL` needed since client and server share the same domain.

---

## Step 7 — Middleware (`src/middleware.ts`)

Guard `/admin/*` routes with a cookie-only check (no DB call), then pass
everything else to next-intl:

```ts
import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { getSessionCookie } from "better-auth/cookies";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    if (pathname === "/admin/sign-in") {
      return NextResponse.next();
    }

    const sessionCookie = getSessionCookie(request);
    if (!sessionCookie) {
      const url = new URL("/admin/sign-in", request.url);
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/((?!_next/static|_next/image|favicon\\.svg|assets|api|.*\\.[^/]+$).*)",
    "/",
  ],
};
```

> **Security note:** `getSessionCookie` only checks existence — not validity.
> The layout (Step 8) does the real DB-backed validation.

---

## Step 8 — Admin Layout (`src/app/admin/layout.tsx`)

Full session validation + role check. Wraps all `/admin/*` pages except sign-in:

```tsx
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { createAuth } from "~/lib/auth";

export default async function AdminLayout(
  { children }: { children: React.ReactNode },
) {
  const { env } = await getCloudflareContext();
  const auth = createAuth(env.DB);
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session || session.user.role !== "admin") {
    redirect("/admin/sign-in");
  }

  return (
    <html lang="en">
      <body className="bg-brand-bg text-brand-primary font-body">
        {children}
      </body>
    </html>
  );
}
```

The sign-in page (`/admin/sign-in`) has its own minimal layout (or no layout) —
it must NOT be wrapped by this AdminLayout.

---

## Step 9 — Sign-In Page (`src/app/admin/sign-in/page.tsx`)

```tsx
"use client";

import { useState } from "react";
import { signIn } from "~/lib/auth-client";

export default function AdminSignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await signIn.email({
      email,
      password,
      callbackURL: "/admin/messages",
    });

    if (result.error) {
      setError(result.error.message ?? "Sign in failed");
    }
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-brand-bg flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-surface border border-border rounded-2xl p-8 w-full max-w-sm"
      >
        <h1 className="font-heading text-2xl font-bold text-brand-primary mb-6">
          Admin
        </h1>
        <label className="block mb-4">
          <span className="text-brand-primary/70 text-sm">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full bg-surface border border-border rounded-lg px-3 py-2 text-brand-primary"
          />
        </label>
        <label className="block mb-6">
          <span className="text-brand-primary/70 text-sm">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full bg-surface border border-border rounded-lg px-3 py-2 text-brand-primary"
          />
        </label>
        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-brand-gold text-brand-bg font-heading font-semibold py-2 rounded-lg"
        >
          {loading ? "Signing in…" : "Sign In"}
        </button>
      </form>
    </main>
  );
}
```

---

## Step 10 — Messages Page (`src/app/admin/messages/page.tsx`)

```tsx
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "~/db/client";
import { contactMessages } from "~/db/schema";
import { desc } from "drizzle-orm";

export default async function MessagesPage() {
  const { env } = await getCloudflareContext();
  const db = getDb(env.DB);
  const messages = await db
    .select()
    .from(contactMessages)
    .orderBy(desc(contactMessages.createdAt));

  return (
    <main className="p-8">
      <h1 className="font-heading text-3xl font-bold text-brand-primary mb-8">
        Contact Messages
      </h1>
      {messages.length === 0
        ? <p className="text-brand-primary/50">No messages yet.</p>
        : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm text-brand-primary">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 pr-4 text-brand-primary/50 font-medium">
                    Name
                  </th>
                  <th className="text-left py-3 pr-4 text-brand-primary/50 font-medium">
                    Email
                  </th>
                  <th className="text-left py-3 pr-4 text-brand-primary/50 font-medium">
                    Company
                  </th>
                  <th className="text-left py-3 pr-4 text-brand-primary/50 font-medium">
                    Message
                  </th>
                  <th className="text-left py-3 text-brand-primary/50 font-medium">
                    Received
                  </th>
                </tr>
              </thead>
              <tbody>
                {messages.map((msg) => (
                  <tr
                    key={msg.id}
                    className="border-b border-border/50 hover:bg-surface"
                  >
                    <td className="py-3 pr-4">{msg.name}</td>
                    <td className="py-3 pr-4">{msg.email}</td>
                    <td className="py-3 pr-4">{msg.company ?? "—"}</td>
                    <td className="py-3 pr-4 max-w-xs truncate">
                      {msg.message}
                    </td>
                    <td className="py-3 whitespace-nowrap">
                      {new Date(msg.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
    </main>
  );
}
```

---

## Step 11 — Database Migration

Generate SQL from the updated schema:

```bash
npx drizzle-kit generate
```

Apply locally (dev):

```bash
wrangler d1 execute DB --local --file=drizzle/<generated-file>.sql
```

Apply to production:

```bash
wrangler d1 execute DB --remote --file=drizzle/<generated-file>.sql
```

---

## Step 12 — Bootstrap: Create First Admin User

Better Auth hashes passwords with scrypt — can't insert plaintext. Two-step
process:

**Step 1 — Register via the sign-up API** (while
`emailAndPassword.enabled: true`):

```bash
curl -X POST https://bobadilla.tech/api/auth/sign-up/email \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@bobadilla.tech","password":"your-strong-password","name":"Admin"}'
```

**Step 2 — Promote to admin role** via Wrangler:

```bash
wrangler d1 execute DB --remote \
  --command "UPDATE user SET role='admin' WHERE email='admin@bobadilla.tech';"
```

> **Tip:** After bootstrapping, add `disableSignUp: true` to `emailAndPassword`
> config in `createAuth()` to prevent public registration.

---

## Verification

1. Run `wrangler dev` — navigate to `/admin/sign-in`, confirm redirect works
   when not signed in
2. Sign in with admin credentials — confirm redirect to `/admin/messages`
3. Verify contact messages table displays correctly
4. Try accessing `/admin/messages` without a session cookie — confirm redirect
   to sign-in
5. Sign out and verify session is cleared

---

## Future Extensions

- Pricing estimates admin page (`/admin/estimates`)
- Invite-only user creation via Better Auth admin API
- Sign-out button in admin nav
- Pagination for messages
- Mark messages as read/archived (new column on `contactMessages`)
