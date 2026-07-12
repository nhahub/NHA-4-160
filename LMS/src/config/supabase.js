import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase variables!");
}

export const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Secondary Supabase client — used ONLY when the currently logged-in
 * teacher (admin) creates a new Auth account for a student.
 *
 * Why this exists:
 * Calling `supabase.auth.signUp()` on the MAIN client swaps the current
 * browser session with the newly created student's session — which would
 * silently log the teacher out. This second client has its own isolated
 * storage key, so it can create the student's Auth user in the background
 * without ever touching the teacher's active session.
 */
export const secondarySupabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storageKey: "sb-secondary-auth-token",
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
  },
});