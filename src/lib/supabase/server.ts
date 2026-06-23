import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

function requireEnv(variableName: string, value: string | undefined): string {
  if (!value) {
    throw new Error(`${variableName} is missing`);
  }
  return value;
}

export function getSupabaseServerClient(useServiceRole = false) {
  const url = requireEnv("NEXT_PUBLIC_SUPABASE_URL", supabaseUrl);
  const key = useServiceRole
    ? requireEnv("SUPABASE_SERVICE_ROLE_KEY", serviceRoleKey)
    : requireEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", anonKey);

  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
