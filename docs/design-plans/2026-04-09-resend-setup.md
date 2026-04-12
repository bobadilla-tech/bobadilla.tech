# Resend Email Notifications — Contact Form Observer Alerts

**Date:** 2026-04-09\
**Goal:** Replace the external email worker microservice with the Resend SDK.
When a contact form message is saved to the DB, send a notification email to
`eliaz@bobadilla.tech` and `ale@bobadilla.tech`.

---

## Context

The contact form already saves submissions to Cloudflare D1 via Drizzle ORM. An
email notification step exists in `route.ts` but currently calls an external
worker microservice (`EMAIL_WORKER_URL` + `EMAIL_WORKER_API_KEY`). That external
dependency is being replaced with a direct Resend integration — simpler, no
extra infra, one less moving part.

`react-email` (v5.2.10) is already installed, which means we can render a proper
HTML email template using React components.

---

## What Changes

| File                                        | Action                                                                    |
| ------------------------------------------- | ------------------------------------------------------------------------- |
| `src/app/api/contact/email-notification.ts` | Rewrite — use Resend SDK instead of external worker fetch                 |
| `src/app/api/contact/contact-email.tsx`     | **Create** — react-email template for the notification                    |
| `src/env.ts`                                | Replace `EMAIL_WORKER_URL` + `EMAIL_WORKER_API_KEY` with `RESEND_API_KEY` |
| `.dev.vars`                                 | Add `RESEND_API_KEY=re_...`                                               |
| `.env.example`                              | Document `RESEND_API_KEY`                                                 |

---

## Step 1 — Install

```bash
npm install resend
```

---

## Step 2 — Environment Variables

**`src/env.ts`** — replace old email worker vars with Resend key:

```ts
// Remove:
EMAIL_WORKER_URL: z.url().optional(),
EMAIL_WORKER_API_KEY: z.string().optional(),

// Add:
RESEND_API_KEY: z.string().min(1),
```

**`.dev.vars`** (Cloudflare local dev secrets):

```
RESEND_API_KEY=re_e5oXX2jA_EiVKDLSh3DoZ9uH3GhRXvH1E
```

**Production** — set via Wrangler:

```bash
wrangler secret put RESEND_API_KEY
```

**`.env.example`** — add:

```
RESEND_API_KEY=re_your_key_here
```

---

## Step 3 — Email Template (`src/app/api/contact/contact-email.tsx`)

A simple react-email component rendered server-side:

```tsx
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Section,
  Text,
} from "@react-email/components";

interface ContactEmailProps {
  name: string;
  email: string;
  company?: string | null;
  message: string;
  receivedAt: string;
}

export function ContactEmail(
  { name, email, company, message, receivedAt }: ContactEmailProps,
) {
  return (
    <Html>
      <Head />
      <Body
        style={{
          fontFamily: "sans-serif",
          backgroundColor: "#f4f4f4",
          padding: "24px",
        }}
      >
        <Container
          style={{
            backgroundColor: "#fff",
            borderRadius: "8px",
            padding: "32px",
            maxWidth: "560px",
          }}
        >
          <Heading style={{ fontSize: "20px", marginBottom: "8px" }}>
            New Contact Form Submission
          </Heading>
          <Text style={{ color: "#555", marginBottom: "24px" }}>
            Received at {receivedAt}
          </Text>
          <Hr />
          <Section style={{ marginTop: "16px" }}>
            <Text>
              <strong>Name:</strong> {name}
            </Text>
            <Text>
              <strong>Email:</strong> {email}
            </Text>
            {company && (
              <Text>
                <strong>Company:</strong> {company}
              </Text>
            )}
            <Text>
              <strong>Message:</strong>
            </Text>
            <Text style={{ whiteSpace: "pre-wrap", color: "#333" }}>
              {message}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
```

---

## Step 4 — Rewrite `email-notification.ts`

```ts
import { Resend } from "resend";
import { render } from "@react-email/render";
import { env } from "~/env";
import { ContactEmail } from "./contact-email";

const OBSERVERS = ["eliaz@bobadilla.tech", "ale@bobadilla.tech"];

interface ContactData {
  name: string;
  email: string;
  company?: string | null;
  message: string;
  createdAt: string | Date;
}

export async function sendEmailNotification(data: ContactData): Promise<void> {
  const resend = new Resend(env.RESEND_API_KEY);

  const receivedAt = new Date(data.createdAt).toLocaleString("en-US", {
    timeZone: "America/Lima",
    dateStyle: "medium",
    timeStyle: "short",
  });

  const html = await render(
    ContactEmail({
      name: data.name,
      email: data.email,
      company: data.company,
      message: data.message,
      receivedAt,
    }),
  );

  const { error } = await resend.emails.send({
    from: "Bobadilla.tech <notifications@bobadilla.tech>",
    to: OBSERVERS,
    replyTo: data.email,
    subject: `New message from ${data.name}`,
    html,
  });

  if (error) {
    throw new Error(`Resend error: ${error.message}`);
  }

  console.log(
    `✅ Notification sent to observers for message from "${data.name}" <${data.email}>`,
  );
}
```

Key points:

- `OBSERVERS` is hardcoded — no need for env vars for the owner emails
- `replyTo` is set to the sender's email so observers can reply directly
- Error handling: throws on Resend failure so `route.ts` catches it in its
  existing try/catch (which already swallows email errors gracefully without
  failing the form submission)
- `RESEND_API_KEY` is now required (not optional) since there's no fallback
  service

---

## Verification

1. Add `RESEND_API_KEY` to `.dev.vars` and run `wrangler dev`
2. Submit the contact form
3. Confirm both `eliaz@bobadilla.tech` and `ale@bobadilla.tech` receive the
   notification
4. Confirm the form still returns 201 even if Resend fails (error is caught in
   `route.ts`)
5. Check `wrangler dev` console for the `✅ Notification sent` log line
6. Set production secret: `wrangler secret put RESEND_API_KEY`
