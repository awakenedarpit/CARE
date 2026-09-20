# Free Stack

| Service | Purpose | Free tier | Paid dependency | Alternative | Limitations | Last verified |
|---|---|---|---|---|---|---|
| GitHub | Source control and collaboration | Public/private repositories are available under current GitHub account plans | Repository features and organization limits vary | Any Git remote | Credentials and repository destination are operator choices | 2026-09-20 |
| Vercel | Frontend hosting | Hobby plan is available for personal/non-commercial use; see the official [Hobby plan](https://vercel.com/docs/plans/hobby) | Higher usage, commercial use, and advanced limits may require paid service | Static hosting on another provider | Confirm plan eligibility and usage limits before production | 2026-09-20 |
| Render | Backend hosting | Free web-service availability and limits must be checked in the current [pricing documentation](https://render.com/pricing) | Persistent or higher-capacity services may require paid service | Any Node-compatible host | Free services may sleep or have resource/time limits; not assumed for high-stakes availability | 2026-09-20 |
| MySQL provider | Relational application database | No provider is hard-coded; use an existing free-compatible MySQL plan only if available | Production capacity, backups, and uptime may require payment | Self-hosted MySQL or compatible provider | The app includes portable schema and seed SQL so the provider can change | 2026-09-20 |
| Supabase Storage | Optional private object storage | Free plan and storage limits are plan-dependent; see [Storage pricing](https://supabase.com/docs/guides/storage/pricing) | Higher storage, egress, and reliability may require payment | S3-compatible storage | Service-role key must remain backend-only; no upload feature is enabled by default | 2026-09-20 |
| Google Maps URLs | Directions | Deep links do not require a paid Maps API in this implementation | Embedded Maps APIs are out of scope | OpenStreetMap links | No in-app live traffic or map rendering | 2026-09-20 |

CareBridge has no paid AI runtime dependency. If a required deployment service is no longer available at zero cost, document the change and stop before silently introducing a paid dependency.
