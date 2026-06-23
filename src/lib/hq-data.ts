import { getSupabaseServerClient } from "@/lib/supabase/server";

export type DemoRequestRow = {
  id: string;
  full_name: string;
  venue_name: string;
  email: string;
  phone: string | null;
  status: string;
  preferred_demo_time: string | null;
  created_at: string;
};

export async function getDemoRequests(): Promise<DemoRequestRow[]> {
  try {
    const supabase = getSupabaseServerClient(true);
    const { data, error } = await supabase
      .from("demo_requests")
      .select(
        "id, full_name, venue_name, email, phone, status, preferred_demo_time, created_at",
      )
      .order("created_at", { ascending: false })
      .limit(100);

    if (error || !data) {
      return [];
    }
    return data as DemoRequestRow[];
  } catch {
    return [];
  }
}
