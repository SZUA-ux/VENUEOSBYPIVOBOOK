# VenueOS by PivoBook.com

VenueOS is the operating system for premium wedding, banqueting and event venues.

This repository contains a single Next.js codebase with clearly separated route areas:

- **Public marketing website**: `/`, `/features`, `/pricing`, `/demo`, `/blog`, legal pages
- **PivoBook HQ admin panel**: `/hq/*`
- **Venue application**: `/app/*`

## Core product rules reflected in this build

- No external client portal in V1
- No venue client payment processing
- Stripe Billing is for SaaS subscription only (venue -> PivoBook)
- WhatsApp in V1 is click-to-send web links only (`wa.me`)
- Tenant data model includes `org_id` and is protected with Supabase RLS

## Tech stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase (Postgres, Auth, RLS, Storage)

## Quick start

1. Install dependencies:

```bash
npm install
```

2. Copy environment variables:

```bash
cp .env.example .env.local
```

3. Fill in:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

4. Apply Supabase migrations:

- `supabase/migrations/20260623141000_venueos_foundation.sql`
- `supabase/migrations/20260623141100_seed_defaults.sql`

5. Start app:

```bash
npm run dev
```

## Database and RLS

The migration defines:

- Core HQ entities (`organisations`, `plans`, `subscriptions`, `demo_requests`)
- Venue operations entities (bookings, quote, menu, itinerary, BEO, payments, staff, inventory, decor, files)
- Audit entities (`activity_logs`, `platform_activity_logs`)
- RLS policies with tenant isolation via `org_id`
- Controlled HQ access via profile role helpers

## Current scope

This commit establishes production-ready foundations and route architecture with SEO/AEO-aware marketing pages, HQ shell screens, venue workflow shells, Supabase schema, and a functional demo request submission flow into Supabase.
