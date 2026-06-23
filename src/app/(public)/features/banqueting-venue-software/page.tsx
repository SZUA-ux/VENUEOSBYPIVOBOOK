import { BulletSection, ContentHero } from "@/components/public/content-page";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Banqueting venue software for multicultural events",
  description:
    "Plan multi-event weddings with menu complexity, segregation, prayer requirements, staffing and resource coordination.",
  path: "/features/banqueting-venue-software",
});

export default function BanquetingVenueSoftwarePage() {
  return (
    <>
      <ContentHero
        kicker="Banqueting Venue Software"
        title="Built for multicultural, multi-suite, high-pressure event operations."
        description="From Nikah and Mehndi to Reception and Walima, manage each sub-event with separate timing, menus, capacities and operational sheets."
      />
      <BulletSection
        title="Operational capabilities"
        points={[
          "Multi-event wedding structures under one master booking",
          "Per-event guest counts, suite assignments and timings",
          "Segregation, prayer and cultural requirement fields",
          "Menu controls for halal, HMC, Jain and dietary rules",
          "Staffing and inventory alignment across events",
          "Readiness warnings for tight turnaround and capacity risk",
        ]}
      />
    </>
  );
}
