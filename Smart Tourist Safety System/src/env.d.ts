/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_ANON_KEY?: string;
  // add other VITE_ env vars you use here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
