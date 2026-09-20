# CareBridge — Emergency Healthcare Navigator

CareBridge is a mobile-first emergency navigation PWA. It turns a short voice or text report into a structured incident, applies deterministic safety rules, ranks trusted emergency resources, and presents clear actions: call a verified resource, call 112, navigate, share location, or copy a handoff summary.

> **CareBridge is not a diagnostic or treatment system. Guidance is based on the information reported by the user. Seek professional medical care for emergencies.**

## MVP flow

1. Tap **NEED EMERGENCY HELP**.
2. Speak or type what is happening; typing always remains available.
3. Choose browser location or continue with the demo/manual location fallback.
4. Review reported concerns and the deterministic urgency level.
5. See the trusted facility, linked verified clinician resource, transparent matching rationale, and action buttons.
6. Share or copy the concise handoff summary.

## Stack

- React 19 + Vite + Tailwind 4
- Express + tRPC-compatible server with public CareBridge REST routes
- MySQL schema and Drizzle definitions for hospitals, doctors, incidents, and actions
- Browser Web Speech API and Geolocation API with fallbacks
- PWA manifest and offline shell caching
- Optional Supabase Storage adapter for legitimate future file use cases; no upload UI is included in the MVP

## Run locally

```bash
pnpm install
pnpm dev
```

Useful checks:

```bash
pnpm test
pnpm check
pnpm build
```

The demo report is: `Mere father ko saans lene mein bahut dikkat hai aur chest mein pain hai.`

## API routes

- `POST /api/incident`
- `GET /api/facilities/recommendations`
- `GET /api/doctors/recommendations`
- `GET /api/emergency/recommendation/:incidentId`
- `POST /api/actions`

See [`docs/API.md`](docs/API.md) for payloads and safety behavior.

## Repository memory

Start with [`AGENTS.md`](AGENTS.md), [`AI_MEMORY.md`](AI_MEMORY.md), and [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md). The repository is intended to be sufficient handoff context for a new coding agent.

## Demo data and verification

The bundled facility and clinician records are intentionally small, sourced from official contact pages, and labeled with `lastVerifiedAt`. They are trusted resource references, not claims of live capacity, live traffic, or current clinician availability. A production deployment must establish a refresh process before treating them as current.

## Current status

The smallest demonstrable emergency path is implemented and covered by deterministic unit tests. Database DDL, seed SQL, PWA shell caching, and deployment notes are included. Production deployment still requires the operator's own GitHub, Vercel, Render, MySQL, and Supabase credentials.
