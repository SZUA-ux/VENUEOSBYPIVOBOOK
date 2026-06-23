"use server";

import { z } from "zod";
import { getSupabaseServiceClient } from "@/lib/supabase/server";

const demoRequestSchema = z.object({
  full_name: z.string().min(2),
  venue_name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6),
  website: z.string().optional(),
  number_of_venues: z.coerce.number().int().min(1),
  number_of_suites: z.coerce.number().int().min(1),
  average_events_per_month: z.coerce.number().int().min(0),
  current_system: z.string().optional(),
  biggest_problem: z.string().min(5),
  preferred_demo_time: z.string().optional(),
  consent: z.literal("on"),
});

const contactSchema = z.object({
  full_name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(5),
});

export async function submitDemoRequest(formData: FormData) {
  const parsed = demoRequestSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return;
  }

  const supabase = getSupabaseServiceClient();
  if (!supabase) {
    return;
  }

  const { consent: ignoredConsent, ...payload } = parsed.data;
  void ignoredConsent;
  const { error } = await supabase.from("demo_requests").insert({
    ...payload,
    status: "new",
  });

  if (error) {
    throw new Error("The demo request could not be saved. Please try again or contact PivoBook.");
  }
}

export async function submitContactRequest(formData: FormData) {
  const parsed = contactSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return;
  }

  const supabase = getSupabaseServiceClient();
  if (!supabase) {
    return;
  }

  const { error } = await supabase.from("contact_requests").insert({
    ...parsed.data,
    status: "new",
  });

  if (error) {
    throw new Error("The enquiry could not be saved. Please try again.");
  }
}
