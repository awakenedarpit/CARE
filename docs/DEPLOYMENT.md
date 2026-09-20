# Deployment

The intended deployment shape is GitHub as the source repository, Vercel for the React/Vite frontend, Render for the Node/Express backend, a compatible MySQL provider for relational data, and Supabase Storage only for private object storage if a real MVP use case appears.

Configure backend secrets in Render, never in source control: `DATABASE_URL`, `JWT_SECRET`, and optional Supabase values. Configure the frontend API base through the deployment routing strategy; the current code uses same-origin `/api` routes when the frontend and backend are routed together.

Before production use, load the schema, review `database/seed.sql`, and establish a trusted-resource verification schedule. Seed records are not live capacity or availability feeds. Treat `lastVerifiedAt` as a freshness indicator, not a promise.

The build command is `pnpm build`; the server start command is `pnpm start`. The app expects a single Node process and does not rely on background workers. GitHub, Vercel, Render, MySQL, and Supabase credentials are operator-managed and must not be committed.
