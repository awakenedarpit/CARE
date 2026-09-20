# Database

The relational schema contains `users`, `hospitals`, `doctors`, `incidents`, and `actions`. `doctors.hospital_id` references `hospitals.id`. Actions reference the incident and optionally the linked doctor and hospital, preserving the traceability chain `Incident → Hospital → Doctor → Action`.

Hospitals and doctors carry `is_verified`, `last_verified_at`, `source_url`, and `source_label`. These fields are mandatory for any record eligible for matching. The schema stores metadata and structured fields rather than binary files.

Portable SQL lives in `database/schema.sql` and `database/seed.sql`. Drizzle source is in `drizzle/schema.ts`, and generated migrations live under `drizzle/`. After schema changes, run `pnpm drizzle-kit generate`, review the SQL, then apply it through the configured database migration workflow. Never use the database tool to insert ad hoc test data.
