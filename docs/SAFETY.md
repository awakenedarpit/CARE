# Safety Policy

CareBridge is a navigation and matching aid only. It uses information reported by the user and does not diagnose, prescribe, recommend treatment, or determine whether someone is medically safe. The mandatory disclaimer appears in the interface and handoff.

`EMERGENCY` is a deterministic safety signal triggered by concerns such as breathing difficulty, chest pain, unconsciousness, heavy bleeding, stroke signs, severe injury, or seizure. `URGENT` covers less immediately dangerous signals such as fever, vomiting, pregnancy-related concern, or child-related concern. `GENERAL` means no configured signal was found; it does not mean the person is safe.

For an emergency, the interface surfaces 112, a trusted emergency facility, a linked verified clinician resource where available, navigation, and location sharing. A call button only opens `tel:112` or a verified number. It never simulates a completed call.

If voice is unavailable, typing remains available. If location is denied, demo/manual location remains available. If live information is unavailable, the UI says: **Live facility information unavailable. Showing cached emergency resources.** If no verified clinician exists, the fallback is 112 plus the emergency facility; no doctor is invented.
