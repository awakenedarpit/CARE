# AGENTS.md

## Project purpose

CareBridge is a reliable, safe, demonstrable emergency healthcare navigation MVP. It is not a diagnosis, treatment, prescription, triage, or live bed-availability system.

## Source of truth

The attached CareBridge Master Build Prompt is the product source of truth. The implementation is intentionally smaller than a full healthcare platform and must preserve the emergency flow, safety rules, fallbacks, and human confirmation of critical actions.

## Architecture

- `client/`: React/Vite mobile-first PWA.
- `server/_core/index.ts`: Express bootstrap and required REST endpoints.
- `server/services/parser.ts`: local multilingual parser.
- `server/services/safetyRules.ts`: deterministic urgency rules.
- `server/services/matching.ts`: weighted facility and clinician matching.
- `server/services/carebridgeEngine.ts`: recommendation orchestration.
- `server/services/incidentStore.ts`: in-memory fallback store for a zero-dependency demo.
- `server/services/supabaseStorage.ts`: server-only optional storage adapter.
- `drizzle/` and `database/`: portable MySQL schema, migration, and seed SQL.

## Non-negotiable safety rules

Never diagnose, prescribe, recommend treatment, invent facilities, invent clinicians, invent phone numbers, claim live availability, simulate a completed call, or ask an emergency user to delay professional care. Always show the disclaimer. If there is immediate danger, surface `tel:112`.

## Data and verification

Only verified records with a source URL and `lastVerifiedAt` are eligible for matching. The UI must say when information is cached or live status is unavailable. Never remove source metadata to make records look cleaner.

## API

The required public REST routes are implemented in `server/_core/index.ts`. Emergency input must not require login. The template's OAuth remains available for future authenticated operator features, but the core emergency path is public.

## Deployment

The intended deployment is frontend to Vercel, backend to Render, MySQL to a compatible provider, and optional private Supabase Storage. Never commit `.env` or service-role credentials.

## Current status

MVP flow, REST API, matching engine, PWA shell, database DDL/seed, tests, and documentation are implemented. Live hospital/doctor synchronization, a provider verification workflow, and persistent incident/action writes are future work.

## Do not change

Do not replace MySQL with Supabase PostgreSQL. Do not introduce paid runtime AI. Do not add login to the emergency path. Do not make AI or browser voice a required dependency. Do not add a chatbot that delays the action path.
