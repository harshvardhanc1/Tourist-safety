Steps to connect Supabase (Vite + React)

1) Install the SDK

   npm install @supabase/supabase-js

2) Get your project credentials

   - In Supabase dashboard -> Project -> Settings -> API
   - Copy the "URL" and the "anon public" key (or the service_role key for server-only operations).

3) Add environment variables (Vite)

   - Create a file named `.env.local` at the project root.
   - Add these lines (use the anon public key for client-side):

     VITE_SUPABASE_URL=https://your-project-ref.supabase.co
     VITE_SUPABASE_ANON_KEY=your-anon-public-key

   - For server-side code (Cloud Functions, server endpoints), use `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in your server environment.

4) Use a single client wrapper

   - `src/supabase/client.ts` should export a singleton supabase client. Example usage:

     import supabase, { getSupabase } from '@/supabase/client';

     // Client-side
     const { data, error } = await getSupabase().from('table').select('*');

     // Server-side (use service role key stored in server env only)

5) Security notes

   - Never expose the service_role key in the browser.
   - Use the anon key for client-side operations and RLS for fine-grained access control.

6) Quick test (dev server)

   - Start dev server: npm run dev
   - Import `getSupabase()` in a React component and run a simple query to confirm connectivity.

If you want, I can:
- Convert the `kv_store.tsx` helper to use `getSupabase()` and make it Node/Deno compatible
- Add a small test page that runs a test query and prints results
