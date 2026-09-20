# Decisions

**Deterministic parser first.** Emergency flow must work without a paid AI API, so local keyword and multilingual normalization is the core. AI can improve understanding later but may not become a critical dependency.

**Public emergency route.** Login and onboarding would add friction and are unnecessary for the MVP. Future operator/admin tools may use the generated auth system separately.

**Deep links instead of paid maps APIs.** The MVP needs directions, not embedded mapping infrastructure. Google Maps direction URLs reduce cost and credential risk.

**Trusted-resource seed with visible freshness.** It is safer to show a small set of sourced records and explicitly label the limits than to create a larger directory that looks current but is not verified.

**Single service.** One Express process is easier to reason about in an emergency path than a set of microservices. The modular service files preserve separation without operational overhead.

**No upload UI in MVP.** Supabase Storage support is documented and isolated, but adding sensitive file upload without a clear emergency use case would increase risk and scope.
