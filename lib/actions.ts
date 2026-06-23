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
    return {
      ok: false,
      message: "Please complete the required demo request fields.",
    };
  }

  const supabase = getSupabaseServiceClient();
  if (!supabase) {
    return {
      ok: true,
      message:
        "Demo request validated. Configure Supabase environment variables to persist it in PivoBook HQ.",
    };
  }

  const { consent: _consent, ...payload } = parsed.data;
  const { error } = await supabase.from("demo_requests").insert({
    ...payload,
    status: "new",
  });

  if (error) {
    return {
      ok: false,
      message: "The demo request could not be saved. Please try again or contact PivoBook.",
    };
  }

  return {
    ok: true,
    message: "Demo request received. PivoBook HQ can now review and assign it.",
  };
}

export async function submitContactRequest(formData: FormData) {
  const parsed = contactSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return {
      ok: false,
      message: "Please add your name, email and enquiry message.",
    };
  }

  const supabase = getSupabaseServiceClient();
  if (!supabase) {
    return {
      ok: true,
      message:
        "Contact request validated. Configure Supabase to persist it as a support/contact record.",
    };
  }

  const { error } = await supabase.from("contact_requests").insert({
    ...parsed.data,
    status: "new",
  });

  if (error) {
    return {
      ok: false,
      message: "The enquiry could not be saved. Please try again.",
    };
  }

  return {
    ok: true,
    message: "Thanks. The PivoBook team has received your enquiry.",
  };
}
