# AI_MEMORY.md

## Current objective

Maintain a safe, reliable CareBridge emergency navigation MVP that demonstrates: emergency input → safe understanding → urgency → trusted facility and clinician match → action.

## Current phase

MVP implementation and handoff.

## Completed work

- Replaced the starter landing page with a mobile-first emergency flow.
- Added English, Hindi, and common Hinglish deterministic parsing.
- Added deterministic EMERGENCY / URGENT / GENERAL safety rules.
- Added sourced demo facility and clinician resources with verification timestamps.
- Added transparent weighted matching and linked doctor recommendations.
- Added `tel:112`, verified resource dialing, Google Maps directions, Web Share, clipboard fallback, browser voice, type fallback, geolocation, demo location, offline UI, and PWA caching.
- Added REST endpoints and action logging.
- Added MySQL/Drizzle schema, migration, seed SQL, and optional server-only Supabase Storage adapter.
- Added unit tests and project documentation.

## Work in progress

Production hosting credentials are intentionally not embedded. GitHub repository publication requires an enabled GitHub connector and an operator-selected repository destination.

## Next task

Configure deployment secrets, establish a trusted-resource refresh process, add persistent incident/action writes through MySQL, and run a complete production smoke test.

## Architecture decisions

Keep one Node/Express process. Keep the emergency parser local and deterministic. Use in-memory fallback so the core flow remains demonstrable without a database or paid AI API.

## Database decisions

MySQL is the relational source of truth. Supabase is storage-only and is not used as the main database. Schema and seed SQL are portable.

## API decisions

Expose the required REST routes and also retain the template's tRPC surface for future typed procedures. Actions are explicitly logged with incident, hospital, and doctor identifiers.

## UI decisions

No login, no long chatbot, high-contrast action buttons, stressed-user one-hand layout, visible fallbacks, and concise handoff summary.

## Safety decisions

Urgency is a rule-based signal, not a medical conclusion. Facilities and clinician resources are matched only from verified records. Live status is never claimed.

## Free-stack decisions

No paid runtime AI, paid maps API, or unnecessary storage feature. Google Maps is used only through deep links. Browser voice and geolocation are progressive enhancements.

## Known bugs

- Browser and provider behavior for `tel:` and native share varies by device.
- Static trusted-resource data must be refreshed before real-world operational use.
- The in-memory fallback is process-local until MySQL persistence is wired.

## Known limitations

- No live hospital capacity, traffic, or clinician availability.
- No authentication or operator dashboard.
- No medical advice or treatment recommendation.
- The service worker caches the shell, not live API responses as live data.

## Files modified

See `git status` and the README for the implementation map. Major files are under `client/src`, `server/services`, `server/_core/index.ts`, `drizzle/`, `database/`, and `docs/`.

## Last successful test

`pnpm test`: 3 files, 7 tests passed. `pnpm check` and `pnpm build` passed after the initial implementation.

## Last successful deployment

WebDev preview running at the project preview URL. Public production deployment requires operator credentials.

## Pending tasks

- Persist incident and action records to MySQL when configured.
- Add an operator-only verification refresh workflow.
- Add a production resource-monitoring and expiry policy.
- Connect GitHub after the user enables the configured connector.

## Do not repeat

Do not add fabricated records to make a demo look complete. Do not treat a hospital switchboard as a personal clinician phone without labeling it. Do not add external AI to the critical path.

## Handoff notes

Read `AGENTS.md`, `README.md`, `docs/SAFETY.md`, and `docs/DEMO.md` before making changes.
