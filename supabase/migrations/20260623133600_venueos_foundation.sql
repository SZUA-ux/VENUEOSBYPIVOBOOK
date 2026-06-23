create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table public.plans (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  monthly_price integer not null,
  yearly_price integer,
  setup_fee_min integer not null default 0,
  setup_fee_max integer not null default 0,
  max_venues integer,
  max_users integer,
  max_bookings_per_month integer,
  features jsonb not null default '{}'::jsonb,
  stripe_price_id_monthly text,
  stripe_price_id_yearly text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.organisations (
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
  country text not null default 'GB',
  timezone text not null default 'Europe/London',
  currency text not null default 'GBP',
  status text not null default 'trial' check (status in ('trial', 'active', 'suspended', 'cancelled')),
  plan_id uuid references public.plans(id),
  stripe_customer_id text,
  stripe_subscription_id text,
  trial_ends_at timestamptz,
  onboarding_status text not null default 'not_started',
  onboarding_progress_percent integer not null default 0 check (onboarding_progress_percent between 0 and 100),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.venues (
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
  default_timezone text not null default 'Europe/London',
  default_currency text not null default 'GBP',
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (org_id, slug)
);

create table public.suites (
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
  default_turnaround_minutes integer not null default 60,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.profiles (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid not null unique,
  org_id uuid references public.organisations(id) on delete cascade,
  venue_id uuid references public.venues(id) on delete set null,
  full_name text not null,
  email text not null,
  phone text,
  avatar_url text,
  user_type text not null check (user_type in ('hq', 'venue')),
  role text not null,
  status text not null default 'active',
  last_login_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.role_permissions (
  id uuid primary key default gen_random_uuid(),
  role text not null,
  scope text not null check (scope in ('hq', 'venue')),
  permission_key text not null,
  enabled boolean not null default true,
  unique (role, scope, permission_key)
);

create or replace function public.current_org_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select p.org_id
  from public.profiles p
  where p.auth_user_id = auth.uid()
    and p.user_type = 'venue'
    and p.status = 'active'
  limit 1;
$$;

create or replace function public.is_hq_user()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles p
    where p.auth_user_id = auth.uid()
      and p.user_type = 'hq'
      and p.status = 'active'
  );
$$;

create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organisations(id) on delete cascade,
  plan_id uuid references public.plans(id),
  stripe_customer_id text,
  stripe_subscription_id text,
  status text not null,
  current_period_start timestamptz,
  current_period_end timestamptz,
  trial_ends_at timestamptz,
  cancel_at_period_end boolean not null default false,
  failed_payment_count integer not null default 0,
  last_invoice_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.demo_requests (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  venue_name text not null,
  email text not null,
  phone text not null,
  website text,
  number_of_venues integer,
  number_of_suites integer,
  average_events_per_month integer,
  current_system text,
  biggest_problem text,
  preferred_demo_time text,
  status text not null default 'new' check (status in ('new', 'contacted', 'demo_booked', 'converted', 'lost')),
  assigned_to uuid references public.profiles(id),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.contact_requests (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text,
  message text not null,
  status text not null default 'new',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.support_tickets (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organisations(id) on delete cascade,
  venue_id uuid references public.venues(id) on delete set null,
  submitted_by uuid references public.profiles(id),
  category text not null check (category in ('bug', 'feature_request', 'billing_issue', 'pdf_issue', 'email_issue', 'booking_calendar_issue', 'training_needed', 'urgent_event_day_issue')),
  priority text not null default 'medium' check (priority in ('low', 'medium', 'high', 'urgent')),
  subject text not null,
  description text not null,
  screenshot_url text,
  status text not null default 'open' check (status in ('open', 'in_progress', 'waiting_for_venue', 'resolved', 'closed')),
  assigned_to uuid references public.profiles(id),
  internal_notes text,
  resolution text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  resolved_at timestamptz
);

create table public.onboarding_tasks (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organisations(id) on delete cascade,
  task_key text not null,
  title text not null,
  description text,
  status text not null default 'pending' check (status in ('pending', 'complete', 'skipped')),
  completed_by uuid references public.profiles(id),
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  unique (org_id, task_key)
);

create table public.platform_activity_logs (
  id uuid primary key default gen_random_uuid(),
  actor_user_id uuid,
  actor_type text not null,
  org_id uuid references public.organisations(id) on delete set null,
  venue_id uuid references public.venues(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  before_data jsonb,
  after_data jsonb,
  ip_address inet,
  user_agent text,
  created_at timestamptz not null default now()
);

create table public.contacts (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organisations(id) on delete cascade,
  first_name text,
  last_name text,
  full_name text not null,
  contact_type text not null default 'other' check (contact_type in ('bride', 'groom', 'family', 'supplier', 'vendor', 'corporate_client', 'other')),
  email text,
  phone text,
  whatsapp_phone text,
  language_preference text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organisations(id) on delete cascade,
  venue_id uuid not null references public.venues(id) on delete cascade,
  primary_suite_id uuid references public.suites(id) on delete set null,
  booking_reference text not null,
  booking_type text not null check (booking_type in ('single_event', 'multi_event_wedding', 'corporate', 'private_party', 'other')),
  status text not null default 'New Enquiry',
  title text not null,
  wedding_group_name text,
  event_type text,
  lead_source text,
  main_contact_id uuid references public.contacts(id) on delete set null,
  assigned_user_id uuid references public.profiles(id) on delete set null,
  enquiry_date date,
  provisional_hold_expires_at timestamptz,
  estimated_guest_count integer,
  confirmed_guest_count integer,
  quote_total numeric(12,2),
  agreed_total numeric(12,2),
  deposit_required numeric(12,2),
  deposit_due_date date,
  final_balance_due_date date,
  notes text,
  internal_tags text[],
  lost_reason text,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz,
  unique (org_id, booking_reference)
);

create table public.booking_events (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organisations(id) on delete cascade,
  booking_id uuid not null references public.bookings(id) on delete cascade,
  venue_id uuid not null references public.venues(id) on delete cascade,
  suite_id uuid not null references public.suites(id) on delete restrict,
  event_name text not null,
  event_type text,
  event_date date not null,
  start_time time not null,
  end_time time not null,
  session_type text not null default 'custom' check (session_type in ('day', 'evening', 'full_day', 'custom')),
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
  status text not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.quotes (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organisations(id) on delete cascade,
  booking_id uuid not null references public.bookings(id) on delete cascade,
  quote_number text not null,
  version_number integer not null default 1,
  status text not null default 'draft' check (status in ('draft', 'sent', 'accepted', 'rejected', 'expired')),
  title text not null,
  subtotal numeric(12,2) not null default 0,
  discount_amount numeric(12,2) not null default 0,
  vat_mode text not null default 'none' check (vat_mode in ('included', 'excluded', 'none')),
  vat_amount numeric(12,2) not null default 0,
  total numeric(12,2) not null default 0,
  deposit_required numeric(12,2),
  valid_until date,
  terms text,
  created_by uuid references public.profiles(id),
  sent_at timestamptz,
  accepted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (org_id, quote_number, version_number)
);

create table public.quote_items (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organisations(id) on delete cascade,
  quote_id uuid not null references public.quotes(id) on delete cascade,
  booking_event_id uuid references public.booking_events(id) on delete set null,
  item_type text not null,
  name text not null,
  description text,
  quantity numeric(12,2) not null default 1,
  unit_type text not null check (unit_type in ('fixed', 'per_head', 'per_hour', 'per_item')),
  unit_price numeric(12,2) not null default 0,
  total_price numeric(12,2) not null default 0,
  taxable boolean not null default true,
  sort_order integer not null default 0
);

create table public.menu_items (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organisations(id) on delete cascade,
  name text not null,
  category text,
  description text,
  cost_per_head numeric(12,2),
  selling_price_per_head numeric(12,2),
  allergens text[],
  dietary_tags text[],
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
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.menu_packages (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organisations(id) on delete cascade,
  name text not null,
  description text,
  price_per_head numeric(12,2),
  starter_count integer,
  main_count integer,
  rice_count integer,
  bread_included boolean not null default false,
  dessert_count integer,
  drink_included boolean not null default false,
  live_station_count integer,
  late_night_food_included boolean not null default false,
  active boolean not null default true
);

create table public.event_menus (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organisations(id) on delete cascade,
  booking_event_id uuid not null references public.booking_events(id) on delete cascade,
  menu_package_id uuid references public.menu_packages(id) on delete set null,
  guest_count integer,
  final_numbers_due_at timestamptz,
  final_numbers_locked boolean not null default false,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.event_menu_items (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organisations(id) on delete cascade,
  event_menu_id uuid not null references public.event_menus(id) on delete cascade,
  menu_item_id uuid not null references public.menu_items(id) on delete restrict,
  quantity_override numeric(12,2),
  portion_size text,
  buffer_percent numeric(5,2),
  production_quantity numeric(12,2),
  notes text
);

create table public.itineraries (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organisations(id) on delete cascade,
  booking_event_id uuid not null references public.booking_events(id) on delete cascade,
  title text not null,
  version integer not null default 1,
  status text not null default 'draft' check (status in ('draft', 'confirmed')),
  notes text,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.itinerary_items (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organisations(id) on delete cascade,
  itinerary_id uuid not null references public.itineraries(id) on delete cascade,
  block_type text not null,
  title text not null,
  description text,
  start_time time,
  end_time time,
  location text,
  assigned_team text,
  visibility text not null default 'internal' check (visibility in ('internal', 'family', 'supplier', 'staff', 'all')),
  sort_order integer not null default 0,
  warning_flag text
);

create table public.beos (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organisations(id) on delete cascade,
  booking_event_id uuid not null references public.booking_events(id) on delete cascade,
  booking_id uuid not null references public.bookings(id) on delete cascade,
  title text not null,
  version integer not null default 1,
  status text not null default 'draft' check (status in ('draft', 'ready', 'locked', 'completed')),
  readiness_score integer not null default 0 check (readiness_score between 0 and 100),
  generated_from_quote_id uuid references public.quotes(id) on delete set null,
  generated_from_itinerary_id uuid references public.itineraries(id) on delete set null,
  generated_from_menu_id uuid references public.event_menus(id) on delete set null,
  notes text,
  created_by uuid references public.profiles(id),
  locked_by uuid references public.profiles(id),
  locked_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.beo_sections (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organisations(id) on delete cascade,
  beo_id uuid not null references public.beos(id) on delete cascade,
  section_type text not null,
  title text not null,
  content jsonb not null default '{}'::jsonb,
  sort_order integer not null default 0
);

create table public.beo_checklist_items (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organisations(id) on delete cascade,
  beo_id uuid not null references public.beos(id) on delete cascade,
  title text not null,
  category text,
  assigned_role text,
  status text not null default 'pending' check (status in ('pending', 'complete', 'not_applicable')),
  completed_by uuid references public.profiles(id),
  completed_at timestamptz,
  notes text
);

create table public.payment_schedules (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organisations(id) on delete cascade,
  booking_id uuid not null references public.bookings(id) on delete cascade,
  booking_event_id uuid references public.booking_events(id) on delete set null,
  title text not null,
  amount_due numeric(12,2) not null,
  due_date date not null,
  status text not null default 'pending' check (status in ('pending', 'partially_paid', 'paid', 'overdue', 'waived')),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.payment_entries (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organisations(id) on delete cascade,
  booking_id uuid not null references public.bookings(id) on delete cascade,
  booking_event_id uuid references public.booking_events(id) on delete set null,
  payment_schedule_id uuid references public.payment_schedules(id) on delete set null,
  amount numeric(12,2) not null,
  date_received date not null,
  method text not null check (method in ('cash', 'bank_transfer', 'card_machine', 'cheque', 'other')),
  reference_note text,
  logged_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz,
  deleted_by uuid references public.profiles(id),
  deletion_reason text
);

create table public.generated_messages (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organisations(id) on delete cascade,
  booking_id uuid references public.bookings(id) on delete set null,
  booking_event_id uuid references public.booking_events(id) on delete set null,
  contact_id uuid references public.contacts(id) on delete set null,
  channel text not null check (channel in ('whatsapp', 'email', 'sms_manual')),
  template_id uuid,
  subject text,
  body text not null,
  generated_link text,
  status text not null default 'generated' check (status in ('generated', 'copied', 'sent_via_system', 'manually_marked_sent')),
  generated_by uuid references public.profiles(id),
  generated_at timestamptz not null default now(),
  marked_sent_by uuid references public.profiles(id),
  marked_sent_at timestamptz
);

create table public.email_settings (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organisations(id) on delete cascade,
  mode text not null default 'manual' check (mode in ('pivobook_shared', 'verified_domain', 'manual')),
  from_name text,
  from_email text,
  reply_to_email text,
  domain_verified boolean not null default false,
  dkim_status text,
  spf_status text,
  dmarc_status text,
  provider_metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (org_id)
);

create table public.files (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organisations(id) on delete cascade,
  booking_id uuid references public.bookings(id) on delete set null,
  booking_event_id uuid references public.booking_events(id) on delete set null,
  file_type text not null,
  file_name text not null,
  storage_path text not null,
  mime_type text not null,
  generated_by uuid references public.profiles(id),
  created_at timestamptz not null default now()
);

create table public.staff_members (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organisations(id) on delete cascade,
  venue_id uuid not null references public.venues(id) on delete cascade,
  full_name text not null,
  role text,
  phone text,
  email text,
  hourly_rate numeric(12,2),
  day_rate numeric(12,2),
  availability_notes text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.staff_shifts (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organisations(id) on delete cascade,
  booking_event_id uuid not null references public.booking_events(id) on delete cascade,
  staff_member_id uuid not null references public.staff_members(id) on delete cascade,
  role text,
  start_time timestamptz not null,
  end_time timestamptz not null,
  status text not null default 'assigned' check (status in ('assigned', 'confirmed', 'cancelled')),
  notes text
);

create table public.inventory_items (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organisations(id) on delete cascade,
  venue_id uuid not null references public.venues(id) on delete cascade,
  name text not null,
  category text,
  quantity_total integer not null default 0,
  quantity_available integer not null default 0,
  condition_status text,
  location text,
  replacement_cost numeric(12,2),
  notes text,
  active boolean not null default true
);

create table public.resource_allocations (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organisations(id) on delete cascade,
  booking_event_id uuid not null references public.booking_events(id) on delete cascade,
  inventory_item_id uuid not null references public.inventory_items(id) on delete restrict,
  quantity_allocated integer not null,
  allocation_start timestamptz not null,
  allocation_end timestamptz not null,
  status text not null default 'allocated',
  notes text
);

create table public.decor_packages (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organisations(id) on delete cascade,
  name text not null,
  description text,
  price numeric(12,2),
  theme text,
  colours text[],
  includes jsonb not null default '{}'::jsonb,
  active boolean not null default true
);

create table public.decor_assignments (
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
  status text not null default 'draft',
  notes text
);

create table public.changeover_windows (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organisations(id) on delete cascade,
  venue_id uuid not null references public.venues(id) on delete cascade,
  suite_id uuid not null references public.suites(id) on delete cascade,
  previous_booking_event_id uuid references public.booking_events(id) on delete set null,
  next_booking_event_id uuid references public.booking_events(id) on delete set null,
  available_minutes integer not null,
  required_minutes integer not null,
  risk_level text not null,
  notes text
);

create table public.capacity_layouts (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organisations(id) on delete cascade,
  suite_id uuid not null references public.suites(id) on delete cascade,
  layout_name text not null,
  max_capacity integer not null,
  includes_stage boolean not null default false,
  includes_dancefloor boolean not null default false,
  includes_runway boolean not null default false,
  segregated boolean not null default false,
  notes text
);

create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organisations(id) on delete cascade,
  booking_id uuid not null references public.bookings(id) on delete cascade,
  contact_id uuid references public.contacts(id) on delete set null,
  review_platform text not null check (review_platform in ('google', 'facebook', 'other')),
  review_link text,
  status text not null default 'not_requested' check (status in ('not_requested', 'requested', 'received', 'no_response')),
  requested_at timestamptz,
  received_at timestamptz,
  notes text
);

create table public.activity_logs (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organisations(id) on delete cascade,
  venue_id uuid references public.venues(id) on delete set null,
  actor_user_id uuid references public.profiles(id),
  action text not null,
  entity_type text not null,
  entity_id uuid,
  before_data jsonb,
  after_data jsonb,
  note text,
  ip_address inet,
  user_agent text,
  created_at timestamptz not null default now()
);

create table public.global_templates (
  id uuid primary key default gen_random_uuid(),
  template_type text not null,
  name text not null,
  content jsonb not null default '{}'::jsonb,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.feature_flags (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  enabled boolean not null default false,
  description text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index booking_events_conflict_idx on public.booking_events (org_id, venue_id, suite_id, event_date, start_time, end_time, status);
create index bookings_org_status_idx on public.bookings (org_id, status);
create index payment_entries_org_booking_idx on public.payment_entries (org_id, booking_id);
create index activity_logs_org_entity_idx on public.activity_logs (org_id, entity_type, entity_id);

create or replace function public.prevent_confirmed_suite_overlap()
returns trigger
language plpgsql
as $$
begin
  if new.status in ('confirmed', 'ready', 'locked') and exists (
    select 1
    from public.booking_events existing
    where existing.id <> new.id
      and existing.org_id = new.org_id
      and existing.venue_id = new.venue_id
      and existing.suite_id = new.suite_id
      and existing.event_date = new.event_date
      and existing.status in ('confirmed', 'ready', 'locked')
      and tsrange(existing.event_date + existing.start_time, existing.event_date + existing.end_time, '[)')
          && tsrange(new.event_date + new.start_time, new.event_date + new.end_time, '[)')
  ) then
    raise exception 'Suite has an overlapping confirmed event';
  end if;

  return new;
end;
$$;

create trigger booking_events_prevent_overlap
before insert or update on public.booking_events
for each row execute function public.prevent_confirmed_suite_overlap();

do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'plans', 'organisations', 'venues', 'suites', 'profiles', 'role_permissions',
    'subscriptions', 'demo_requests', 'contact_requests', 'support_tickets',
    'onboarding_tasks', 'platform_activity_logs', 'contacts', 'bookings',
    'booking_events', 'quotes', 'quote_items', 'menu_items', 'menu_packages',
    'event_menus', 'event_menu_items', 'itineraries', 'itinerary_items',
    'beos', 'beo_sections', 'beo_checklist_items', 'payment_schedules',
    'payment_entries', 'generated_messages', 'email_settings', 'files',
    'staff_members', 'staff_shifts', 'inventory_items', 'resource_allocations',
    'decor_packages', 'decor_assignments', 'changeover_windows',
    'capacity_layouts', 'reviews', 'activity_logs', 'global_templates',
    'feature_flags'
  ]
  loop
    execute format('alter table public.%I enable row level security', table_name);
  end loop;
end $$;

create policy "HQ can manage plans" on public.plans
  for all using (public.is_hq_user()) with check (public.is_hq_user());

create policy "HQ can manage organisations" on public.organisations
  for all using (public.is_hq_user()) with check (public.is_hq_user());

create policy "Venue users can view their organisation" on public.organisations
  for select using (id = public.current_org_id());

create policy "Users can read own profile or same tenant" on public.profiles
  for select using (
    auth_user_id = auth.uid()
    or public.is_hq_user()
    or (org_id is not null and org_id = public.current_org_id())
  );

create policy "HQ can manage profiles" on public.profiles
  for all using (public.is_hq_user()) with check (public.is_hq_user());

create policy "Public can create demo requests" on public.demo_requests
  for insert with check (true);

create policy "HQ can manage demo requests" on public.demo_requests
  for all using (public.is_hq_user()) with check (public.is_hq_user());

create policy "Public can create contact requests" on public.contact_requests
  for insert with check (true);

create policy "HQ can manage contact requests" on public.contact_requests
  for all using (public.is_hq_user()) with check (public.is_hq_user());

create policy "HQ can manage global templates" on public.global_templates
  for all using (public.is_hq_user()) with check (public.is_hq_user());

create policy "HQ can manage feature flags" on public.feature_flags
  for all using (public.is_hq_user()) with check (public.is_hq_user());

do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'venues', 'suites', 'subscriptions', 'support_tickets', 'onboarding_tasks',
    'platform_activity_logs', 'contacts', 'bookings', 'booking_events',
    'quotes', 'quote_items', 'menu_items', 'menu_packages', 'event_menus',
    'event_menu_items', 'itineraries', 'itinerary_items', 'beos',
    'beo_sections', 'beo_checklist_items', 'payment_schedules',
    'payment_entries', 'generated_messages', 'email_settings', 'files',
    'staff_members', 'staff_shifts', 'inventory_items', 'resource_allocations',
    'decor_packages', 'decor_assignments', 'changeover_windows',
    'capacity_layouts', 'reviews', 'activity_logs'
  ]
  loop
    execute format(
      'create policy %I on public.%I for select using (org_id = public.current_org_id() or public.is_hq_user())',
      'Tenant select or HQ', table_name
    );
    execute format(
      'create policy %I on public.%I for insert with check (org_id = public.current_org_id() or public.is_hq_user())',
      'Tenant insert or HQ', table_name
    );
    execute format(
      'create policy %I on public.%I for update using (org_id = public.current_org_id() or public.is_hq_user()) with check (org_id = public.current_org_id() or public.is_hq_user())',
      'Tenant update or HQ', table_name
    );
    execute format(
      'create policy %I on public.%I for delete using (public.is_hq_user())',
      'HQ delete only', table_name
    );
  end loop;
end $$;

do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'plans', 'organisations', 'venues', 'suites', 'profiles', 'subscriptions',
    'demo_requests', 'contact_requests', 'support_tickets', 'contacts',
    'bookings', 'booking_events', 'quotes', 'menu_items', 'event_menus',
    'itineraries', 'beos', 'payment_schedules', 'payment_entries',
    'email_settings', 'staff_members', 'global_templates', 'feature_flags'
  ]
  loop
    execute format('create trigger %I_set_updated_at before update on public.%I for each row execute function public.set_updated_at()', table_name, table_name);
  end loop;
end $$;

insert into public.plans (name, slug, monthly_price, setup_fee_min, setup_fee_max, max_venues, features)
values
  ('Starter', 'starter', 99, 499, 1500, 1, '{"booking_management": true, "quotes": true, "menus": true, "basic_beo": true, "payment_ledger": true, "whatsapp_links": true}'::jsonb),
  ('Pro', 'pro', 199, 499, 1500, 1, '{"advanced_beo": true, "pdf_pack": true, "white_label_email": true, "staff_resources": true, "inventory": true, "reporting": true}'::jsonb),
  ('Group', 'group', 399, 499, 1500, null, '{"multi_venue_dashboard": true, "cross_venue_reporting": true, "multiple_brands": true, "group_user_management": true, "priority_onboarding": true}'::jsonb)
on conflict (slug) do nothing;

insert into public.feature_flags (key, enabled, description)
values
  ('ai_quote_writer', false, 'Optional AI quote writer. AI never modifies records without user confirmation.'),
  ('ai_itinerary_builder', false, 'Optional AI itinerary builder.'),
  ('ai_beo_checker', false, 'Optional AI BEO risk checker.'),
  ('ai_menu_formatter', false, 'Optional AI menu formatter.'),
  ('ai_whatsapp_replies', false, 'Optional AI WhatsApp copy assistant.'),
  ('maintenance_mode', false, 'Platform maintenance mode.')
on conflict (key) do nothing;
