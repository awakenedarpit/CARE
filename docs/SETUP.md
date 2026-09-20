# Setup

Install Node.js 22 and pnpm, then run `pnpm install`. Start the project with `pnpm dev`. The Vite/Express preview is available through the WebDev project URL.

Required environment values for a database-backed deployment include `DATABASE_URL` and `JWT_SECRET`. The generated template also supports Manus OAuth variables, but the emergency path does not require a user session. Optional storage values are `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, and `SUPABASE_STORAGE_BUCKET`. The service-role key must remain server-only.

Run `pnpm drizzle-kit generate` after schema changes and use the reviewed migration in the configured MySQL environment. Apply `database/seed.sql` only in a controlled setup or deployment step, not through ad hoc test queries.

Before a change is considered ready, run `pnpm test`, `pnpm check`, and `pnpm build`. The test suite covers the deterministic parser, emergency classification, trusted-resource matching, clinician linkage, and action traceability.
