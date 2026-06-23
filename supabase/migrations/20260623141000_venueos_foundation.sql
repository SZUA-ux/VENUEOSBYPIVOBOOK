-- VenueOS by PivoBook.com foundational schema
-- Focus: tenant-safe operations, HQ admin visibility, and auditability.

create extension if not exists pgcrypto;

-- -------------------------------------------------------
-- Shared helper functions
-- -------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

-- -------------------------------------------------------
-- Core platform tables
-- -------------------------------------------------------
create table if not exists public.plans (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  monthly_price numeric(12, 2) not null default 0,
  yearly_price numeric(12, 2),
  setup_fee_min numeric(12, 2) not null default 0,
  setup_fee_max numeric(12, 2) not null default 0,
  max_venues integer not null default 1,
  max_users integer not null default 5,
  max_bookings_per_month integer,
  features jsonb not null default '{}'::jsonb,
  stripe_price_id_monthly text,
  stripe_price_id_yearly text,
  active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.organisations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  legal_name text,
  business_email text,
  phone text,
  website text,
  address text,
  city text,
  postcode text,
  country text default 'United Kingdom',
  timezone text not null default 'Europe/London',
  currency text not null default 'GBP',
  status text not null default 'trial' check (status in ('trial', 'active', 'suspended', 'cancelled')),
  plan_id uuid references public.plans(id),
  stripe_customer_id text,
  stripe_subscription_id text,
  trial_ends_at timestamptz,
  onboarding_status text default 'pending',
  onboarding_progress_percent integer not null default 0,
  created_by uuid,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.venues (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organisations(id) on delete cascade,
  name text not null,
  slug text not null,
  address text,
  city text,
  postcode text,
  phone text,
  email text,
  website text,
  logo_url text,
  brand_primary_colour text,
  brand_secondary_colour text,
  default_timezone text,
  default_currency text default 'GBP',
  active boolean not null default true,
  created_by uuid,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (org_id, slug)
);

create table if not exists public.suites (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organisations(id) on delete cascade,
  venue_id uuid not null references public.venues(id) on delete cascade,
  name text not null,
  description text,
  floor text,
  max_capacity integer,
  banquet_capacity integer,
  theatre_capacity integer,
  segregated_capacity integer,
  capacity_with_stage integer,
  capacity_with_dancefloor integer,
  capacity_with_stage_and_runway integer,
  default_turnaround_minutes integer not null default 120,
  active boolean not null default true,
  created_by uuid,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid not null unique,
  org_id uuid references public.organisations(id) on delete set null,
  venue_id uuid references public.venues(id) on delete set null,
  full_name text not null,
  email text not null,
  phone text,
  avatar_url text,
  user_type text not null check (user_type in ('hq', 'venue')),
  role text not null,
  status text not null default 'active',
  last_login_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.role_permissions (
  id uuid primary key default gen_random_uuid(),
  role text not null,
  scope text not null check (scope in ('hq', 'venue')),
  permission_key text not null,
  enabled boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organisations(id) on delete cascade,
  plan_id uuid references public.plans(id),
  stripe_customer_id text,
  stripe_subscription_id text,
  status text not null default 'trialing',
  current_period_start timestamptz,
  current_period_end timestamptz,
  trial_ends_at timestamptz,
  cancel_at_period_end boolean not null default false,
  failed_payment_count integer not null default 0,
  last_invoice_url text,
  created_by uuid,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.demo_requests (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  venue_name text not null,
  email text not null,
  phone text,
  website text,
  number_of_venues integer default 1,
  number_of_suites integer default 1,
  average_events_per_month integer default 0,
  current_system text,
  biggest_problem text,
  preferred_demo_time text,
  status text not null default 'new' check (status in ('new', 'contacted', 'demo_booked', 'converted', 'lost')),
  assigned_to uuid,
  notes text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.support_tickets (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organisations(id) on delete cascade,
  venue_id uuid references public.venues(id) on delete set null,
  submitted_by uuid,
  category text not null check (category in (
    'bug','feature_request','billing_issue','pdf_issue','email_issue',
    'booking_calendar_issue','training_needed','urgent_event_day_issue'
  )),
  priority text not null default 'medium' check (priority in ('low','medium','high','urgent')),
  subject text not null,
  description text not null,
  screenshot_url text,
  status text not null default 'open' check (status in ('open','in_progress','waiting_for_venue','resolved','closed')),
  assigned_to uuid,
  internal_notes text,
  resolution text,
  created_by uuid,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  resolved_at timestamptz
);

create table if not exists public.onboarding_tasks (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organisations(id) on delete cascade,
  task_key text not null,
  title text not null,
  description text,
  status text not null default 'pending' check (status in ('pending','complete','skipped')),
  completed_by uuid,
  completed_at timestamptz,
  created_by uuid,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.platform_activity_logs (
  id uuid primary key default gen_random_uuid(),
  actor_user_id uuid,
  actor_type text,
  org_id uuid references public.organisations(id) on delete set null,
  venue_id uuid references public.venues(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  before_data jsonb,
  after_data jsonb,
  ip_address text,
  user_agent text,
  created_at timestamptz not null default timezone('utc', now())
);

-- -------------------------------------------------------
-- Venue app data model
-- -------------------------------------------------------
create table if not exists public.contacts (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organisations(id) on delete cascade,
  first_name text,
  last_name text,
  full_name text not null,
  contact_type text not null default 'other',
  email text,
  phone text,
  whatsapp_phone text,
  language_preference text,
  notes text,
  created_by uuid,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organisations(id) on delete cascade,
  venue_id uuid not null references public.venues(id) on delete cascade,
  primary_suite_id uuid references public.suites(id) on delete set null,
  booking_reference text not null,
  booking_type text not null default 'single_event',
  status text not null default 'New Enquiry',
  title text not null,
  wedding_group_name text,
  event_type text,
  lead_source text,
  main_contact_id uuid references public.contacts(id) on delete set null,
  assigned_user_id uuid,
  enquiry_date date,
  provisional_hold_expires_at timestamptz,
  estimated_guest_count integer,
  confirmed_guest_count integer,
  quote_total numeric(12, 2),
  agreed_total numeric(12, 2),
  deposit_required numeric(12, 2),
  deposit_due_date date,
  final_balance_due_date date,
  notes text,
  internal_tags text[] not null default '{}',
  lost_reason text,
  created_by uuid,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  deleted_at timestamptz,
  unique (org_id, booking_reference)
);

create table if not exists public.booking_events (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organisations(id) on delete cascade,
  booking_id uuid not null references public.bookings(id) on delete cascade,
  venue_id uuid not null references public.venues(id) on delete cascade,
  suite_id uuid references public.suites(id) on delete set null,
  event_name text not null,
  event_type text,
  event_date date not null,
  start_time time,
  end_time time,
  session_type text default 'custom',
  estimated_guest_count integer,
  confirmed_guest_count integer,
  layout_type text,
  segregation_required boolean not null default false,
  prayer_area_required boolean not null default false,
  halal_required boolean not null default false,
  hmc_required boolean not null default false,
  jain_required boolean not null default false,
  vegetarian_only boolean not null default false,
  no_onion_garlic boolean not null default false,
  alcohol_free boolean not null default false,
  bride_side_count integer,
  groom_side_count integer,
  notes text,
  status text default 'draft',
  created_by uuid,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.quotes (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organisations(id) on delete cascade,
  booking_id uuid not null references public.bookings(id) on delete cascade,
  quote_number text not null,
  version_number integer not null default 1,
  status text not null default 'draft' check (status in ('draft','sent','accepted','rejected','expired')),
  title text,
  subtotal numeric(12, 2) not null default 0,
  discount_amount numeric(12, 2) not null default 0,
  vat_mode text not null default 'included' check (vat_mode in ('included','excluded','none')),
  vat_amount numeric(12, 2) not null default 0,
  total numeric(12, 2) not null default 0,
  deposit_required numeric(12, 2),
  valid_until date,
  terms text,
  sent_at timestamptz,
  accepted_at timestamptz,
  created_by uuid,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (org_id, quote_number, version_number)
);

create table if not exists public.quote_items (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organisations(id) on delete cascade,
  quote_id uuid not null references public.quotes(id) on delete cascade,
  booking_event_id uuid references public.booking_events(id) on delete set null,
  item_type text not null default 'other',
  name text not null,
  description text,
  quantity numeric(12, 2) not null default 1,
  unit_type text not null default 'fixed' check (unit_type in ('fixed','per_head','per_hour','per_item')),
  unit_price numeric(12, 2) not null default 0,
  total_price numeric(12, 2) not null default 0,
  taxable boolean not null default true,
  sort_order integer not null default 0,
  created_by uuid,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.menu_items (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organisations(id) on delete cascade,
  name text not null,
  category text,
  description text,
  cost_per_head numeric(12, 2),
  selling_price_per_head numeric(12, 2),
  allergens text[] not null default '{}',
  dietary_tags text[] not null default '{}',
  halal_status text,
  hmc_status text,
  jain_friendly boolean not null default false,
  vegetarian boolean not null default false,
  vegan boolean not null default false,
  no_onion_garlic boolean not null default false,
  prep_notes text,
  kitchen_notes text,
  available boolean not null default true,
  popularity_score integer not null default 0,
  upsell_item boolean not null default false,
  created_by uuid,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.menu_packages (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organisations(id) on delete cascade,
  name text not null,
  description text,
  price_per_head numeric(12, 2) not null default 0,
  starter_count integer not null default 0,
  main_count integer not null default 0,
  rice_count integer not null default 0,
  bread_included boolean not null default false,
  dessert_count integer not null default 0,
  drink_included boolean not null default false,
  live_station_count integer not null default 0,
  late_night_food_included boolean not null default false,
  active boolean not null default true,
  created_by uuid,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.event_menus (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organisations(id) on delete cascade,
  booking_event_id uuid not null references public.booking_events(id) on delete cascade,
  menu_package_id uuid references public.menu_packages(id) on delete set null,
  guest_count integer not null default 0,
  final_numbers_due_at timestamptz,
  final_numbers_locked boolean not null default false,
  notes text,
  created_by uuid,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.event_menu_items (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organisations(id) on delete cascade,
  event_menu_id uuid not null references public.event_menus(id) on delete cascade,
  menu_item_id uuid not null references public.menu_items(id) on delete cascade,
  quantity_override numeric(12, 2),
  portion_size text,
  buffer_percent numeric(5, 2) default 0,
  production_quantity numeric(12, 2),
  notes text,
  created_by uuid,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.itineraries (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organisations(id) on delete cascade,
  booking_event_id uuid not null references public.booking_events(id) on delete cascade,
  title text not null,
  version integer not null default 1,
  status text not null default 'draft' check (status in ('draft','confirmed')),
  notes text,
  created_by uuid,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.itinerary_items (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organisations(id) on delete cascade,
  itinerary_id uuid not null references public.itineraries(id) on delete cascade,
  block_type text not null default 'custom',
  title text not null,
  description text,
  start_time time,
  end_time time,
  location text,
  assigned_team text,
  visibility text not null default 'all' check (visibility in ('internal','family','supplier','staff','all')),
  sort_order integer not null default 0,
  warning_flag text,
  created_by uuid,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.beos (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organisations(id) on delete cascade,
  booking_event_id uuid not null references public.booking_events(id) on delete cascade,
  booking_id uuid not null references public.bookings(id) on delete cascade,
  title text not null,
  version integer not null default 1,
  status text not null default 'draft' check (status in ('draft','ready','locked','completed')),
  readiness_score integer not null default 0,
  generated_from_quote_id uuid references public.quotes(id) on delete set null,
  generated_from_itinerary_id uuid references public.itineraries(id) on delete set null,
  generated_from_menu_id uuid references public.event_menus(id) on delete set null,
  notes text,
  created_by uuid,
  locked_by uuid,
  locked_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.beo_sections (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organisations(id) on delete cascade,
  beo_id uuid not null references public.beos(id) on delete cascade,
  section_type text not null,
  title text not null,
  content jsonb not null default '{}'::jsonb,
  sort_order integer not null default 0,
  created_by uuid,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.beo_checklist_items (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organisations(id) on delete cascade,
  beo_id uuid not null references public.beos(id) on delete cascade,
  title text not null,
  category text,
  assigned_role text,
  status text not null default 'pending' check (status in ('pending','complete','not_applicable')),
  completed_by uuid,
  completed_at timestamptz,
  notes text,
  created_by uuid,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.payment_schedules (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organisations(id) on delete cascade,
  booking_id uuid not null references public.bookings(id) on delete cascade,
  booking_event_id uuid references public.booking_events(id) on delete set null,
  title text not null,
  amount_due numeric(12, 2) not null default 0,
  due_date date not null,
  status text not null default 'pending' check (status in ('pending','partially_paid','paid','overdue','waived')),
  notes text,
  created_by uuid,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.payment_entries (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organisations(id) on delete cascade,
  booking_id uuid not null references public.bookings(id) on delete cascade,
  booking_event_id uuid references public.booking_events(id) on delete set null,
  payment_schedule_id uuid references public.payment_schedules(id) on delete set null,
  amount numeric(12, 2) not null default 0,
  date_received date not null,
  method text not null check (method in ('cash','bank_transfer','card_machine','cheque','other')),
  reference_note text,
  logged_by uuid,
  created_by uuid,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  deleted_at timestamptz,
  deleted_by uuid,
  deletion_reason text
);

create table if not exists public.generated_messages (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organisations(id) on delete cascade,
  booking_id uuid references public.bookings(id) on delete set null,
  booking_event_id uuid references public.booking_events(id) on delete set null,
  contact_id uuid references public.contacts(id) on delete set null,
  channel text not null check (channel in ('whatsapp','email','sms_manual')),
  template_id text,
  subject text,
  body text not null,
  generated_link text,
  status text not null default 'generated' check (status in ('generated','copied','sent_via_system','manually_marked_sent')),
  generated_by uuid,
  generated_at timestamptz not null default timezone('utc', now()),
  marked_sent_by uuid,
  marked_sent_at timestamptz,
  created_by uuid,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.email_settings (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null unique references public.organisations(id) on delete cascade,
  mode text not null check (mode in ('pivobook_shared','verified_domain','manual')),
  from_name text,
  from_email text,
  reply_to_email text,
  domain_verified boolean not null default false,
  dkim_status text,
  spf_status text,
  dmarc_status text,
  provider_metadata jsonb not null default '{}'::jsonb,
  created_by uuid,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.files (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organisations(id) on delete cascade,
  booking_id uuid references public.bookings(id) on delete set null,
  booking_event_id uuid references public.booking_events(id) on delete set null,
  file_type text not null,
  file_name text not null,
  storage_path text not null,
  mime_type text not null,
  generated_by uuid,
  created_by uuid,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.staff_members (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organisations(id) on delete cascade,
  venue_id uuid references public.venues(id) on delete set null,
  full_name text not null,
  role text not null,
  phone text,
  email text,
  hourly_rate numeric(12, 2),
  day_rate numeric(12, 2),
  availability_notes text,
  active boolean not null default true,
  created_by uuid,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.staff_shifts (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organisations(id) on delete cascade,
  booking_event_id uuid not null references public.booking_events(id) on delete cascade,
  staff_member_id uuid not null references public.staff_members(id) on delete cascade,
  role text not null,
  start_time timestamptz,
  end_time timestamptz,
  status text not null default 'assigned' check (status in ('assigned','confirmed','cancelled')),
  notes text,
  created_by uuid,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.inventory_items (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organisations(id) on delete cascade,
  venue_id uuid references public.venues(id) on delete set null,
  name text not null,
  category text,
  quantity_total integer not null default 0,
  quantity_available integer not null default 0,
  condition_status text,
  location text,
  replacement_cost numeric(12, 2),
  notes text,
  active boolean not null default true,
  created_by uuid,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.resource_allocations (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organisations(id) on delete cascade,
  booking_event_id uuid not null references public.booking_events(id) on delete cascade,
  inventory_item_id uuid not null references public.inventory_items(id) on delete cascade,
  quantity_allocated integer not null default 1,
  allocation_start timestamptz,
  allocation_end timestamptz,
  status text,
  notes text,
  created_by uuid,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.decor_packages (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organisations(id) on delete cascade,
  name text not null,
  description text,
  price numeric(12, 2) not null default 0,
  theme text,
  colours text[] not null default '{}',
  includes jsonb not null default '{}'::jsonb,
  active boolean not null default true,
  created_by uuid,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.decor_assignments (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organisations(id) on delete cascade,
  booking_event_id uuid not null references public.booking_events(id) on delete cascade,
  decor_package_id uuid references public.decor_packages(id) on delete set null,
  theme text,
  colour_scheme text,
  stage_notes text,
  floral_notes text,
  entrance_notes text,
  setup_start timestamptz,
  setup_end timestamptz,
  assigned_team text,
  status text,
  notes text,
  created_by uuid,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.changeover_windows (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organisations(id) on delete cascade,
  venue_id uuid not null references public.venues(id) on delete cascade,
  suite_id uuid not null references public.suites(id) on delete cascade,
  previous_booking_event_id uuid references public.booking_events(id) on delete set null,
  next_booking_event_id uuid references public.booking_events(id) on delete set null,
  available_minutes integer,
  required_minutes integer,
  risk_level text,
  notes text,
  created_by uuid,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.capacity_layouts (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organisations(id) on delete cascade,
  suite_id uuid not null references public.suites(id) on delete cascade,
  layout_name text not null,
  max_capacity integer not null default 0,
  includes_stage boolean not null default false,
  includes_dancefloor boolean not null default false,
  includes_runway boolean not null default false,
  segregated boolean not null default false,
  notes text,
  created_by uuid,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organisations(id) on delete cascade,
  booking_id uuid not null references public.bookings(id) on delete cascade,
  contact_id uuid references public.contacts(id) on delete set null,
  review_platform text not null check (review_platform in ('google','facebook','other')),
  review_link text not null,
  status text not null default 'not_requested' check (status in ('not_requested','requested','received','no_response')),
  requested_at timestamptz,
  received_at timestamptz,
  notes text,
  created_by uuid,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.activity_logs (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organisations(id) on delete cascade,
  venue_id uuid references public.venues(id) on delete set null,
  actor_user_id uuid,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  before_data jsonb,
  after_data jsonb,
  note text,
  ip_address text,
  user_agent text,
  created_by uuid,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

-- -------------------------------------------------------
-- Updated-at triggers
-- -------------------------------------------------------
do $$
declare
  tbl text;
begin
  foreach tbl in array array[
    'plans','organisations','venues','suites','profiles','role_permissions',
    'subscriptions','demo_requests','support_tickets','onboarding_tasks',
    'contacts','bookings','booking_events','quotes','quote_items',
    'menu_items','menu_packages','event_menus','event_menu_items',
    'itineraries','itinerary_items','beos','beo_sections','beo_checklist_items',
    'payment_schedules','payment_entries','generated_messages','email_settings',
    'files','staff_members','staff_shifts','inventory_items','resource_allocations',
    'decor_packages','decor_assignments','changeover_windows','capacity_layouts',
    'reviews','activity_logs'
  ]
  loop
    execute format('drop trigger if exists trg_%I_updated_at on public.%I', tbl, tbl);
    execute format(
      'create trigger trg_%I_updated_at before update on public.%I for each row execute function public.set_updated_at()',
      tbl,
      tbl
    );
  end loop;
end $$;

-- -------------------------------------------------------
-- Indexes
-- -------------------------------------------------------
create index if not exists idx_venues_org_id on public.venues(org_id);
create index if not exists idx_suites_org_id on public.suites(org_id);
create index if not exists idx_profiles_org_id on public.profiles(org_id);
create index if not exists idx_subscriptions_org_id on public.subscriptions(org_id);
create index if not exists idx_support_tickets_org_id on public.support_tickets(org_id);
create index if not exists idx_onboarding_tasks_org_id on public.onboarding_tasks(org_id);
create index if not exists idx_contacts_org_id on public.contacts(org_id);
create index if not exists idx_bookings_org_id on public.bookings(org_id);
create index if not exists idx_booking_events_org_id on public.booking_events(org_id);
create index if not exists idx_quotes_org_id on public.quotes(org_id);
create index if not exists idx_menu_items_org_id on public.menu_items(org_id);
create index if not exists idx_itineraries_org_id on public.itineraries(org_id);
create index if not exists idx_beos_org_id on public.beos(org_id);
create index if not exists idx_payment_entries_org_id on public.payment_entries(org_id);
create index if not exists idx_generated_messages_org_id on public.generated_messages(org_id);
create index if not exists idx_activity_logs_org_id on public.activity_logs(org_id);

-- -------------------------------------------------------
-- Auth-context helper functions (created after profiles)
-- -------------------------------------------------------
create or replace function public.current_org_id()
returns uuid
language sql
stable
as $$
  select p.org_id
  from public.profiles p
  where p.auth_user_id = auth.uid()
    and p.status = 'active'
  limit 1
$$;

create or replace function public.is_hq_user()
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.profiles p
    where p.auth_user_id = auth.uid()
      and p.user_type = 'hq'
      and p.status = 'active'
  )
$$;

-- -------------------------------------------------------
-- RLS
-- -------------------------------------------------------
alter table public.plans enable row level security;
alter table public.organisations enable row level security;
alter table public.profiles enable row level security;
alter table public.role_permissions enable row level security;
alter table public.demo_requests enable row level security;
alter table public.platform_activity_logs enable row level security;

do $$
declare
  tbl text;
begin
  foreach tbl in array array[
    'venues','suites','subscriptions','support_tickets','onboarding_tasks',
    'contacts','bookings','booking_events','quotes','quote_items',
    'menu_items','menu_packages','event_menus','event_menu_items',
    'itineraries','itinerary_items','beos','beo_sections','beo_checklist_items',
    'payment_schedules','payment_entries','generated_messages','email_settings',
    'files','staff_members','staff_shifts','inventory_items','resource_allocations',
    'decor_packages','decor_assignments','changeover_windows','capacity_layouts',
    'reviews','activity_logs'
  ]
  loop
    execute format('alter table public.%I enable row level security', tbl);
    execute format('drop policy if exists %I_select on public.%I', tbl, tbl);
    execute format('drop policy if exists %I_insert on public.%I', tbl, tbl);
    execute format('drop policy if exists %I_update on public.%I', tbl, tbl);
    execute format('drop policy if exists %I_delete on public.%I', tbl, tbl);

    execute format(
      'create policy %I_select on public.%I for select using (public.is_hq_user() or org_id = public.current_org_id())',
      tbl,
      tbl
    );
    execute format(
      'create policy %I_insert on public.%I for insert with check (public.is_hq_user() or org_id = public.current_org_id())',
      tbl,
      tbl
    );
    execute format(
      'create policy %I_update on public.%I for update using (public.is_hq_user() or org_id = public.current_org_id()) with check (public.is_hq_user() or org_id = public.current_org_id())',
      tbl,
      tbl
    );
    execute format(
      'create policy %I_delete on public.%I for delete using (public.is_hq_user() or org_id = public.current_org_id())',
      tbl,
      tbl
    );
  end loop;
end $$;

drop policy if exists organisations_select on public.organisations;
drop policy if exists organisations_insert on public.organisations;
drop policy if exists organisations_update on public.organisations;
drop policy if exists organisations_delete on public.organisations;

create policy organisations_select
  on public.organisations
  for select
  using (public.is_hq_user() or id = public.current_org_id());

create policy organisations_insert
  on public.organisations
  for insert
  with check (public.is_hq_user());

create policy organisations_update
  on public.organisations
  for update
  using (public.is_hq_user() or id = public.current_org_id())
  with check (public.is_hq_user() or id = public.current_org_id());

create policy organisations_delete
  on public.organisations
  for delete
  using (public.is_hq_user());

drop policy if exists profiles_select on public.profiles;
drop policy if exists profiles_insert on public.profiles;
drop policy if exists profiles_update on public.profiles;
drop policy if exists profiles_delete on public.profiles;

create policy profiles_select
  on public.profiles
  for select
  using (public.is_hq_user() or auth_user_id = auth.uid() or org_id = public.current_org_id());

create policy profiles_insert
  on public.profiles
  for insert
  with check (public.is_hq_user() or auth_user_id = auth.uid());

create policy profiles_update
  on public.profiles
  for update
  using (public.is_hq_user() or auth_user_id = auth.uid() or org_id = public.current_org_id())
  with check (public.is_hq_user() or auth_user_id = auth.uid() or org_id = public.current_org_id());

create policy profiles_delete
  on public.profiles
  for delete
  using (public.is_hq_user());

drop policy if exists plans_hq_only_select on public.plans;
drop policy if exists plans_hq_only_write on public.plans;

create policy plans_hq_only_select
  on public.plans
  for select
  using (public.is_hq_user());

create policy plans_hq_only_write
  on public.plans
  for all
  using (public.is_hq_user())
  with check (public.is_hq_user());

drop policy if exists role_permissions_hq_only on public.role_permissions;
create policy role_permissions_hq_only
  on public.role_permissions
  for all
  using (public.is_hq_user())
  with check (public.is_hq_user());

drop policy if exists demo_requests_public_insert on public.demo_requests;
drop policy if exists demo_requests_hq_select on public.demo_requests;
drop policy if exists demo_requests_hq_update on public.demo_requests;

create policy demo_requests_public_insert
  on public.demo_requests
  for insert
  to anon, authenticated
  with check (true);

create policy demo_requests_hq_select
  on public.demo_requests
  for select
  using (public.is_hq_user());

create policy demo_requests_hq_update
  on public.demo_requests
  for update
  using (public.is_hq_user())
  with check (public.is_hq_user());

drop policy if exists platform_activity_logs_hq_only on public.platform_activity_logs;
create policy platform_activity_logs_hq_only
  on public.platform_activity_logs
  for all
  using (public.is_hq_user())
  with check (public.is_hq_user());
