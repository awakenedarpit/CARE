# API

## `POST /api/incident`

Accepts `{ rawText, patientRelation?, location? }`, where location may contain latitude, longitude, label, and source. The response contains the incident, `reportedConcerns`, `careCategory`, `urgency`, ranked `facilities`, `recommendedFacility`, `recommendedDoctor`, location metadata, live-status fallback messaging, and the handoff summary.

The route is public because requiring login would delay emergency use. Empty reports return `400`. Server failures return `500` without inventing a recommendation.

## `GET /api/facilities/recommendations`

Accepts `latitude`, `longitude`, and optional `category`. Only verified trusted records are eligible. Ranking weights are emergency readiness 30%, exact or fallback category capability 30%, trusted status 15%, distance 15%, and verification freshness 10%.

## `GET /api/doctors/recommendations`

Accepts `hospitalId` and optional `category`. It returns verified clinician resources affiliated with the selected facility, with on-call resources first. An empty response is valid and must lead to the 112 + emergency facility fallback.

## `GET /api/emergency/recommendation/:incidentId`

Returns the recommendation stored in the process-local demo store. A production deployment should replace this fallback with a MySQL lookup while preserving the same response shape.

## `POST /api/actions`

Accepts `incidentId`, optional `doctorId` and `hospitalId`, and one of `CALL_DOCTOR`, `CALL_112`, `NAVIGATE`, `SHARE_LOCATION`, or `COPY_SUMMARY`. It returns a traceable action record. Action logging must never block the user-triggered action.
