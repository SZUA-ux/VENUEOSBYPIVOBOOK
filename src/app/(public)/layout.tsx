import { PublicFrame } from "@/components/public/public-frame";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return <PublicFrame>{children}</PublicFrame>;
}
