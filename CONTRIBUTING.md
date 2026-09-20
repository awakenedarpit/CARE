# Contributing to CareBridge

CareBridge changes must preserve the emergency path and the rule that **AI understands, rules protect, matching connects, automation reduces friction, and human confirmation controls critical actions**.

Before opening a change, run:

```bash
pnpm test
pnpm check
pnpm build
```

Any facility or clinician record change must include a source URL, source label, verification timestamp, and a review note. Never commit personal data, credentials, `.env` files, or unsourced phone numbers.

Feature changes should document their fallback behavior. If voice, geolocation, MySQL, storage, or an external service is unavailable, the emergency path must remain understandable and usable. Do not add a paid runtime dependency without explicit approval and an update to `docs/FREE_STACK.md`.
