insert into public.plans (
  name,
  slug,
  monthly_price,
  setup_fee_min,
  setup_fee_max,
  max_venues,
  max_users,
  features,
  active
)
values
  (
    'Starter',
    'starter',
    99,
    499,
    750,
    1,
    10,
    '{
      "booking_management": true,
      "quote_builder": true,
      "menu_builder": true,
      "itinerary_builder": true,
      "basic_beo": true,
      "payment_ledger": true,
      "whatsapp_links": true
    }'::jsonb,
    true
  ),
  (
    'Pro',
    'pro',
    199,
    750,
    1200,
    1,
    30,
    '{
      "advanced_beo": true,
      "pdf_pack": true,
      "white_label_email": true,
      "staff_scheduling": true,
      "inventory": true,
      "reporting": true,
      "ai_tools": true
    }'::jsonb,
    true
  ),
  (
    'Group',
    'group',
    399,
    1200,
    1500,
    10,
    200,
    '{
      "multi_venue_dashboard": true,
      "cross_venue_reporting": true,
      "group_user_management": true,
      "priority_onboarding": true
    }'::jsonb,
    true
  )
on conflict (slug) do update
set
  name = excluded.name,
  monthly_price = excluded.monthly_price,
  setup_fee_min = excluded.setup_fee_min,
  setup_fee_max = excluded.setup_fee_max,
  max_venues = excluded.max_venues,
  max_users = excluded.max_users,
  features = excluded.features,
  active = excluded.active;
