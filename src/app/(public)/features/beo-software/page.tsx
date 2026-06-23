import { BulletSection, ContentHero } from "@/components/public/content-page";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "BEO software for wedding and banqueting venues",
  description:
    "Generate banquet event orders, function sheets, kitchen sheets, floor sheets, decor packs and supplier briefs from one source.",
  path: "/features/beo-software",
});

export default function BeoSoftwarePage() {
  return (
    <>
      <ContentHero
        kicker="BEO Software"
        title="Operational clarity for every team on event day."
        description="VenueOS compiles quote, menu, itinerary, staffing and payment context into a single BEO source, then outputs role-specific sheets."
      />
      <BulletSection
        title="What is BEO software?"
        points={[
          "BEO software is a system that turns booking details into event-day instructions.",
          "It aligns kitchen, floor, decor, security, suppliers and coordinators.",
          "VenueOS supports full BEO, kitchen sheet, floor sheet and mobile coordinator views.",
          "Readiness scores highlight missing details before lock.",
        ]}
      />
      <BulletSection
        title="Banquet event order outputs"
        points={[
          "Full BEO PDF",
          "Kitchen sheet",
          "Floor sheet",
          "Decor sheet",
          "Supplier sheet",
          "Security sheet",
        ]}
      />
    </>
  );
}
