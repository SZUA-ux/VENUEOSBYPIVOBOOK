import { BulletSection, ContentHero } from "@/components/public/content-page";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Venue software features",
  description:
    "Booking management, multi-suite calendar, quote engine, BEO automation, payment ledger, messages, PDFs and reporting.",
  path: "/features",
});

export default function FeaturesPage() {
  return (
    <>
      <ContentHero
        kicker="Feature Overview"
        title="Designed for venues that need more than a diary."
        description="From enquiry to final function sheet, every operational layer stays connected inside one command centre."
      />
      <BulletSection
        title="Commercial and booking engines"
        points={[
          "Booking management with stage-by-stage status pipeline",
          "Multi-suite calendar with overlap warnings and conflict prevention",
          "Multi-event wedding builder for cultural ceremonies",
          "Quote builder with version history and line-item pricing",
          "Manual payment ledger with schedule and overdue alerts",
          "Lead source conversion and revenue reporting",
        ]}
      />
      <BulletSection
        title="Event-day operational engines"
        points={[
          "Menu builder with dietary, allergen and production notes",
          "Itinerary builder with smart warning flags",
          "BEO/function sheet generation with readiness scoring",
          "Role-based output packs: kitchen, floor, decor, security, supplier",
          "Staff and resource assignment with shortage warnings",
          "One-click PDF pack generation with venue branding",
        ]}
      />
      <BulletSection
        title="Communication and controls"
        points={[
          "WhatsApp Web click-to-send links with templates",
          "Email modes: shared sending, verified domain, manual",
          "Message generation logs and activity auditing",
          "HQ admin visibility across onboarding, support and billing",
          "Tenant-level data isolation with org-based RLS",
          "Optional AI assist tools controlled by feature flags",
        ]}
      />
    </>
  );
}
