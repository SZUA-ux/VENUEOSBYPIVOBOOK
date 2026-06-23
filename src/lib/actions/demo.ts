"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export type DemoFormState = {
  status: "idle" | "success" | "error";
  message: string;
};

export const initialDemoState: DemoFormState = {
  status: "idle",
  message: "",
};

function required(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

export async function submitDemoRequest(
  _previousState: DemoFormState,
  formData: FormData,
): Promise<DemoFormState> {
  const payload = {
    full_name: required(formData.get("full_name")),
    venue_name: required(formData.get("venue_name")),
    email: required(formData.get("email")),
    phone: required(formData.get("phone")),
    website: required(formData.get("website")),
    number_of_venues: Number(required(formData.get("number_of_venues")) || 1),
    number_of_suites: Number(required(formData.get("number_of_suites")) || 1),
    average_events_per_month: Number(
      required(formData.get("average_events_per_month")) || 0,
    ),
    current_system: required(formData.get("current_system")),
    biggest_problem: required(formData.get("biggest_problem")),
    preferred_demo_time: required(formData.get("preferred_demo_time")),
  };

  const consentValue = required(formData.get("consent"));
  if (!payload.full_name || !payload.venue_name || !payload.email || !consentValue) {
    return {
      status: "error",
      message: "Please complete all required fields and consent.",
    };
  }

  try {
    const supabase = getSupabaseServerClient(true);
    const { error } = await supabase.from("demo_requests").insert(payload);
    if (error) {
      return { status: "error", message: error.message };
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return { status: "error", message };
  }

  revalidatePath("/hq/demo-requests");
  return {
    status: "success",
    message: "Demo request submitted. The HQ team can now review it.",
  };
}
