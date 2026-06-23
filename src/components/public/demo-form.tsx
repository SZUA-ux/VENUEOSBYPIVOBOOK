"use client";

import { useActionState } from "react";
import {
  initialDemoState,
  submitDemoRequest,
  type DemoFormState,
} from "@/lib/actions/demo";

export function DemoForm() {
  const [state, formAction, isPending] = useActionState<DemoFormState, FormData>(
    submitDemoRequest,
    initialDemoState,
  );

  return (
    <form action={formAction} className="card mt-8 grid gap-4 p-6 md:grid-cols-2">
      <label className="text-sm">
        Full name *
        <input className="input mt-1" name="full_name" required />
      </label>
      <label className="text-sm">
        Venue name *
        <input className="input mt-1" name="venue_name" required />
      </label>
      <label className="text-sm">
        Email *
        <input className="input mt-1" type="email" name="email" required />
      </label>
      <label className="text-sm">
        Phone
        <input className="input mt-1" name="phone" />
      </label>
      <label className="text-sm">
        Website
        <input className="input mt-1" name="website" />
      </label>
      <label className="text-sm">
        Number of venues
        <input className="input mt-1" type="number" min={1} name="number_of_venues" />
      </label>
      <label className="text-sm">
        Number of suites/halls
        <input className="input mt-1" type="number" min={1} name="number_of_suites" />
      </label>
      <label className="text-sm">
        Average events per month
        <input
          className="input mt-1"
          type="number"
          min={0}
          name="average_events_per_month"
        />
      </label>
      <label className="text-sm md:col-span-2">
        Current system used
        <input className="input mt-1" name="current_system" />
      </label>
      <label className="text-sm md:col-span-2">
        Biggest problem
        <textarea className="textarea mt-1" name="biggest_problem" />
      </label>
      <label className="text-sm md:col-span-2">
        Preferred demo time
        <input className="input mt-1" name="preferred_demo_time" />
      </label>
      <label className="md:col-span-2 flex items-center gap-2 text-sm">
        <input type="checkbox" name="consent" value="yes" required />
        I consent to be contacted about VenueOS onboarding and demos.
      </label>
      <div className="md:col-span-2">
        <button type="submit" className="button-primary" disabled={isPending}>
          {isPending ? "Submitting..." : "Book a Demo"}
        </button>
        {state.status !== "idle" ? (
          <p
            className={`mt-3 text-sm ${
              state.status === "success" ? "text-emerald-700" : "text-red-700"
            }`}
          >
            {state.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
