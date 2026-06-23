import {
  Activity,
  AlertTriangle,
  BadgePoundSterling,
  BarChart3,
  BookOpen,
  CalendarDays,
  ClipboardCheck,
  CreditCard,
  FileText,
  LayoutDashboard,
  Mail,
  MessageCircle,
  Settings,
  ShieldCheck,
  Sparkles,
  Store,
  Users,
  Utensils,
  Warehouse,
} from "lucide-react";

export const product = {
  name: "VenueOS by PivoBook.com",
  shortName: "VenueOS",
  domain: "https://pivobook.com",
  description:
    "The operating system for premium wedding, banqueting and event venues.",
  ogImage: "https://pivobook.com/og/venueos-placeholder.jpg",
};

export const marketingNav = [
  { href: "/features", label: "Features" },
  { href: "/features/beo-software", label: "BEO software" },
  { href: "/features/wedding-venue-crm", label: "Venue CRM" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Resources" },
  { href: "/demo", label: "Book a Demo" },
];

export const coreFeatures = [
  "Booking Management",
  "Multi-Suite Calendar",
  "Multi-Event Wedding Builder",
  "Quote Builder",
  "Menu Builder",
  "Itinerary Builder",
  "BEO / Function Sheets",
  "Payment Ledger",
  "WhatsApp Web Links",
  "Email Templates",
  "PDF Pack Generator",
  "Reporting",
  "Staff and Inventory",
  "Multi-Venue Management",
];

export const pricingPlans = [
  {
    name: "Starter",
    price: "£99",
    description: "For smaller venues moving beyond spreadsheets.",
    features: [
      "Booking management",
      "Quotes",
      "Menu builder",
      "Itinerary builder",
      "Basic BEO",
      "Payment ledger",
      "WhatsApp links",
      "Shared email/manual email",
    ],
  },
  {
    name: "Pro",
    price: "£199",
    description: "For serious wedding and banqueting venues.",
    featured: true,
    features: [
      "Everything in Starter",
      "Advanced BEO",
      "PDF pack",
      "White-label email",
      "Staff/resource scheduling",
      "Inventory",
      "Reporting",
      "AI tools if enabled",
    ],
  },
  {
    name: "Group",
    price: "£399",
    description: "For multi-venue operators and premium groups.",
    features: [
      "Everything in Pro",
      "Multi-venue dashboard",
      "Cross-venue reporting",
      "Multiple brands",
      "Group-level user management",
      "Priority onboarding",
    ],
  },
];

export const faqs = [
  {
    question: "Does VenueOS process payments from wedding customers?",
    answer:
      "No. VenueOS tracks deposits, balances, schedules and manually logged payments. Venues continue taking cash, bank transfer, cheque or card-machine payments directly.",
  },
  {
    question: "Is VenueOS a client portal for couples?",
    answer:
      "No. VenueOS is venue-side software. Brides, grooms, families and suppliers are contacts who can receive emails, PDFs and WhatsApp messages, but they do not log in.",
  },
  {
    question: "What is BEO software?",
    answer:
      "BEO software creates banquet event orders or function sheets that give operations, kitchen, floor, security, decor and supplier teams one source of truth for event day.",
  },
  {
    question: "Can it support multicultural weddings?",
    answer:
      "Yes. VenueOS includes fields and templates for Nikah, Mehndi, Baraat, Walima, Anand Karaj receptions, Sangeet, Pheras, prayer areas, segregation and dietary requirements.",
  },
];

export const workflowSteps = [
  "New enquiry captured",
  "Viewing booked and quote generated",
  "Provisional hold and manual payment schedule created",
  "Multi-event wedding, menu and itinerary built",
  "BEO and role-specific PDF pack generated",
  "Event completed and review request sent",
];

export const publicPages = [
  { path: "/", label: "Home" },
  { path: "/features", label: "Features" },
  { path: "/features/beo-software", label: "BEO Software" },
  { path: "/features/wedding-venue-crm", label: "Wedding Venue CRM" },
  {
    path: "/features/banqueting-venue-software",
    label: "Banqueting Venue Software",
  },
  { path: "/pricing", label: "Pricing" },
  { path: "/demo", label: "Demo" },
  { path: "/contact", label: "Contact" },
  { path: "/blog", label: "Resources" },
  { path: "/compare/spreadsheets", label: "VenueOS vs spreadsheets" },
  { path: "/compare/generic-crm", label: "VenueOS vs generic CRM" },
  {
    path: "/compare/wedding-planner-software",
    label: "VenueOS vs wedding planner software",
  },
  {
    path: "/compare/venue-tools",
    label: "VenueOS vs venue tools",
  },
  { path: "/privacy", label: "Privacy Policy" },
  { path: "/terms", label: "Terms" },
  { path: "/cookies", label: "Cookie Policy" },
  { path: "/gdpr", label: "Data Processing / GDPR" },
];

export const hqNav = [
  { href: "/hq", label: "HQ Dashboard", icon: LayoutDashboard },
  { href: "/hq/venues", label: "Venues", icon: Store },
  { href: "/hq/demo-requests", label: "Demo Requests", icon: Mail },
  { href: "/hq/subscriptions", label: "Subscriptions", icon: CreditCard },
  { href: "/hq/mrr", label: "MRR", icon: BarChart3 },
  { href: "/hq/support", label: "Support", icon: MessageCircle },
  { href: "/hq/problem-radar", label: "Problem Radar", icon: AlertTriangle },
  { href: "/hq/onboarding", label: "Onboarding", icon: ClipboardCheck },
  { href: "/hq/templates", label: "Templates", icon: FileText },
  { href: "/hq/settings", label: "Settings", icon: Settings },
  { href: "/hq/activity", label: "Activity", icon: Activity },
];

export const appNav = [
  { href: "/app/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/app/calendar", label: "Calendar", icon: CalendarDays },
  { href: "/app/enquiries", label: "Enquiries", icon: Mail },
  { href: "/app/bookings", label: "Bookings", icon: BookOpen },
  { href: "/app/wedding-builder", label: "Wedding Builder", icon: Sparkles },
  { href: "/app/quotes", label: "Quotes", icon: BadgePoundSterling },
  { href: "/app/menus", label: "Menus", icon: Utensils },
  { href: "/app/itineraries", label: "Itineraries", icon: CalendarDays },
  { href: "/app/beos", label: "BEOs", icon: ClipboardCheck },
  { href: "/app/payments", label: "Payments", icon: CreditCard },
  { href: "/app/staff", label: "Staff", icon: Users },
  { href: "/app/inventory", label: "Inventory", icon: Warehouse },
  { href: "/app/decor", label: "Decor", icon: Sparkles },
  { href: "/app/reports", label: "Reports", icon: BarChart3 },
  { href: "/app/messages", label: "Messages", icon: MessageCircle },
  { href: "/app/files", label: "Files", icon: FileText },
  { href: "/app/settings", label: "Settings", icon: Settings },
  { href: "/app/help", label: "Help / Support", icon: ShieldCheck },
];

export const onboardingTasks = [
  "Venue profile completed",
  "Logo uploaded",
  "Brand colours set",
  "Suites added",
  "Capacities added",
  "Packages created",
  "Menu uploaded",
  "Payment terms set",
  "Email mode selected",
  "WhatsApp templates configured",
  "BEO template configured",
  "Staff users invited",
  "First booking created",
  "Training completed",
];

export const bookingStatuses = [
  "New Enquiry",
  "Contacted",
  "Viewing Booked",
  "Quote Sent",
  "Provisional Hold",
  "Deposit Pending",
  "Confirmed",
  "Final Details Pending",
  "Ready for BEO",
  "Event Completed",
  "Review Requested",
  "Lost",
];

export const culturalTemplates = [
  {
    culture: "Muslim",
    events: ["Nikah", "Mehndi", "Baraat", "Walima", "Segregated Nikah", "Ladies-only Event"],
  },
  {
    culture: "Sikh",
    events: ["Maiyan", "Jago", "Anand Karaj Reception", "Reception"],
  },
  {
    culture: "Hindu",
    events: ["Pithi", "Sangeet", "Mandap Ceremony", "Pheras", "Reception"],
  },
  {
    culture: "Pakistani",
    events: ["Dholki", "Mayoun", "Mehndi", "Baraat", "Rukhsati", "Walima"],
  },
];

export const appModuleSummaries: Record<string, string> = {
  dashboard:
    "Owner command centre with today's events, readiness scores, revenue, balances, enquiries, conversion and quick actions.",
  calendar:
    "Multi-suite calendar with provisional holds, confirmed events, setup, teardown and changeover conflict indicators.",
  enquiries:
    "Capture leads, track viewing appointments, follow-ups, lead sources and quote progression.",
  bookings:
    "Manage the full booking lifecycle from enquiry to review request with tabs for events, quote, menu, itinerary, BEO, payments, messages, files and activity.",
  "wedding-builder":
    "Quick-add multicultural wedding events with native fields for segregation, prayer, dietary and family-side requirements.",
  quotes:
    "Line-item quote builder with per-head pricing, VAT modes, discounts, versions, branded PDFs and internal acceptance.",
  menus:
    "Menu library, packages, event menus, allergens, kitchen production quantities and final-number locking.",
  itineraries:
    "Timeline builder with cultural templates, staff/supplier/family versions and operational warnings.",
  beos:
    "Banquet event order engine with readiness scores, warnings and full, kitchen, floor, decor, supplier and security outputs.",
  payments:
    "Manual payment schedules and ledger entries only. No payment processing, card data, Stripe Connect or bank reconciliation.",
  staff:
    "Staff members, event shifts, recommended ratios and shortage warnings for event-day operations.",
  inventory:
    "Resource inventory, allocations, double-allocation checks, stock warnings and resource calendar.",
  decor:
    "Decor packages and event assignments covering theme, colour scheme, stage, floral, entrance and setup timings.",
  reports:
    "Venue reports for pipeline, revenue, balances, suite utilisation, lead sources, BEO readiness and resources.",
  messages:
    "WhatsApp Web click-to-send links, email generation, mailto/manual mode and complete generation logs.",
  files:
    "Supabase Storage-backed generated PDFs for quotes, contracts, payment schedules, itineraries and BEO packs.",
  settings:
    "Venue profile, suites, email modes, WhatsApp templates, payment terms, roles, feature flags and branding.",
  help:
    "Support ticket creation and knowledge base access for venue staff.",
  onboarding:
    "Guided setup for venue profile, branding, suites, capacities, packages, menu, payment terms, email, WhatsApp and staff.",
};

export const hqModuleSummaries: Record<string, string> = {
  venues:
    "Create organisations, invite owners, manage plans, suspend/reactivate accounts, review usage, support tickets and onboarding progress.",
  "demo-requests":
    "Demo requests submitted from the public website with assignment, notes and status management.",
  subscriptions:
    "Stripe Billing records for PivoBook charging venues only: plans, setup fees, trials, failed payments and invoice links.",
  mrr:
    "MRR, ARR, expansion, churn, projected MRR, setup fee revenue, plan distribution and demo-to-customer conversion.",
  support:
    "Support tickets across bugs, billing issues, PDF issues, email issues, calendar issues, training and urgent event-day issues.",
  "problem-radar":
    "Operational SaaS risks: failed payments, trials ending soon, low usage, urgent tickets, incomplete onboarding and email/PDF issues.",
  onboarding:
    "Default onboarding checklist and progress tracking across all organisations.",
  templates:
    "Global BEO sections, itinerary templates, email templates, WhatsApp templates, PDF metadata and AI prompts.",
  settings:
    "Feature flags, default pricing plans, default templates, AI enablement and maintenance mode.",
  activity:
    "Platform activity logs for HQ and tenant-sensitive actions.",
};

export const sampleBookings = [
  {
    reference: "PB-2026-0418",
    title: "Khan & Ahmed Wedding",
    status: "Ready for BEO",
    date: "2026-07-18",
    suite: "Grand Ballroom",
    guests: 420,
    readiness: 82,
    risk: "medium",
    balance: "£8,500",
  },
  {
    reference: "PB-2026-0422",
    title: "Singh Reception",
    status: "Deposit Pending",
    date: "2026-07-22",
    suite: "Orchid Suite",
    guests: 280,
    readiness: 45,
    risk: "high",
    balance: "£21,200",
  },
  {
    reference: "PB-2026-0501",
    title: "Patel Sangeet",
    status: "Confirmed",
    date: "2026-08-01",
    suite: "Crystal Hall",
    guests: 350,
    readiness: 68,
    risk: "medium",
    balance: "£12,000",
  },
];
