import { SectionPlaceholder } from "@/components/shell/section-placeholder";

export default function StaffPage() {
  return (
    <SectionPlaceholder
      title="Staff and shifts"
      description="Manage staffing, assign event shifts and detect operational shortages."
      bullets={[
        "Staff roster by role",
        "Shift assignment",
        "Guest-to-staff ratio recommendations",
        "Availability notes",
        "Shortage warnings",
        "Day-of team views",
      ]}
    />
  );
}
