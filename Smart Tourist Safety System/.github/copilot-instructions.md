# Copilot Instructions for Smart Tourist Safety System

## Project Overview

- This is a Vite-based React/TypeScript project for a Smart Tourist Safety System.
- The codebase is organized by major app domains: `src/components/mobile/` (Tourist app), `src/components/portal/` (Authority portal), and `src/components/admin/` (Admin tools).
- Supabase is used for backend services; see `src/supabase/client.ts` and `SUPABASE_SETUP.md` for integration details.

## Key Workflows

- **Install dependencies:** `npm i`
- **Start dev server:** `npm run dev`
- **Supabase setup:** Follow `SUPABASE_SETUP.md` for environment and API keys.
- **Styling:** Uses global styles in `src/styles/globals.css` and component styles in `src/index.css`.

## Architecture & Patterns

- **Component Structure:**
  - Tourist mobile UI: `src/components/mobile/`
  - Authority portal UI: `src/components/portal/`
  - Admin setup: `src/components/admin/`
  - Shared UI primitives: `src/components/ui/`
- **Context:** Auth logic is centralized in `src/contexts/AuthContext.tsx`.
- **Supabase:** All backend calls use the client in `src/supabase/client.ts`.
- **Utilities:** Shared logic in `src/utils/` and `src/components/ui/utils.ts`.
- **Figma assets:** See `src/components/figma/` for image handling.

## Conventions

- **TypeScript:** Strict typing enforced; see `src/env.d.ts` for custom types.
- **Component Naming:** Use PascalCase for React components.
- **File Organization:** Group by feature/domain, not by type.
- **Data Flow:** Prefer context and hooks for state management; avoid prop drilling.
- **Testing:** No explicit test setup found; add tests in `src/__tests__/` if needed.

## Integration Points

- **Supabase:** All data and auth flows go through Supabase client.
- **External APIs:** Document any new integrations in `SUPABASE_SETUP.md`.
- **Figma:** UI/UX references at [Figma Project](https://www.figma.com/design/q1MGch3zLZWuCF0AEwKOMu/Smart-Tourist-Safety-System).

## Examples

- To add a new mobile screen: create a component in `src/components/mobile/`, import in `App.tsx`.
- To add a new Supabase function: update `src/supabase/functions/server/` and export via `client.ts`.

---

**If any conventions or workflows are unclear, ask the user for clarification or examples.**
