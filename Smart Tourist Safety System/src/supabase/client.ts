import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Vite exposes env vars prefixed with VITE_ to the browser. For server-side code, use process.env directly.
const getEnv = () => {
  const url = (import.meta.env?.VITE_SUPABASE_URL as string) ?? process.env.VITE_SUPABASE_URL ?? process.env.SUPABASE_URL;
  const anonKey = (import.meta.env?.VITE_SUPABASE_ANON_KEY as string) ?? process.env.VITE_SUPABASE_ANON_KEY ?? process.env.SUPABASE_ANON_KEY;
  return { url, anonKey };
};

const { url, anonKey } = getEnv();

if (!url || !anonKey) {
  // Provide a clear runtime error so developers know to add env vars.
  throw new Error('Missing Supabase environment variables. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY (or SUPABASE_URL/SUPABASE_ANON_KEY for server).');
}

let supabase: SupabaseClient | null = null;

export const getSupabase = (): SupabaseClient => {
  if (!supabase) {
    supabase = createClient(url, anonKey);
  }
  return supabase;
};

export default getSupabase();
