import { BulletSection, ContentHero } from "@/components/public/content-page";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Wedding venue CRM software",
  description:
    "Track enquiries, viewings, quotes, provisional holds, confirmations and follow-ups in one venue-focused CRM workflow.",
  path: "/features/wedding-venue-crm",
});

export default function WeddingVenueCrmPage() {
  return (
    <>
      <ContentHero
        kicker="Wedding Venue CRM"
        title="A CRM built for wedding and banqueting sales pipelines."
        description="VenueOS keeps sales progress, booking operations and event-day prep in one connected record."
      />
      <BulletSection
        title="What is wedding venue CRM?"
        points={[
          "A venue CRM tracks enquiries, communications and pipeline conversion.",
          "It stores decision timeline from first message to confirmed booking.",
          "VenueOS includes viewing scheduling, quote tracking and hold management.",
          "Conversion and lead-source reporting helps owners improve close rates.",
        ]}
      />
      <BulletSection
        title="Pipeline stages covered"
        points={[
          "New enquiry",
          "Viewing booked",
          "Quote sent",
          "Provisional hold",
          "Deposit pending",
          "Confirmed booking",
        ]}
      />
    </>
  );
}
