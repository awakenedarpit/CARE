# Architecture

CareBridge is a single React/Vite client and a single Node/Express server. The client is public and does not require an account for the emergency path. The server exposes REST routes under `/api` and retains the generated tRPC surface for future typed capabilities.

The incident path is: raw report → deterministic parser → safety rules → weighted facility ranking → linked clinician selection → handoff construction → action logging. The parser and safety modules have no external network dependency. The matcher consumes records with verification metadata and can use the in-memory trusted seed when MySQL is unavailable.

MySQL is the relational data model for facilities, clinicians, incidents, and actions. `database/schema.sql`, `database/seed.sql`, and Drizzle definitions are kept together so deployment can move between compatible MySQL providers. Supabase is storage-only and is accessed through the server-only adapter if a legitimate future file use case appears.

The PWA caches the emergency shell and static safety experience. It does not claim live facility, bed, traffic, or clinician status when offline. Google Maps is used only as a deep link, avoiding a paid maps API in the core path.
