# Demo Script

Open the app in a mobile viewport and tap **NEED EMERGENCY HELP**. Choose **Father** and enter: `Mere father ko saans lene mein bahut dikkat hai aur chest mein pain hai.` If voice is supported, speak the same report; otherwise use **Type instead**. Keep the demo location if browser permission is not available.

Continue to the result. The screen should show `EMERGENCY`, the reported concerns `breathing difficulty` and `chest pain`, the `CARDIO_RESPIRATORY` navigation category, and the explicit instruction to call 112 if there is immediate danger. It should show a trusted facility, a linked verified clinician resource, last-checked dates, and the transparent matching factors.

Demonstrate **Call doctor**, **Call 112**, **Navigate**, **Share**, and **Copy summary**. The browser may open a dialer, Google Maps, or native share sheet; that behavior is user-controlled. The handoff summary must include patient relation, concerns, urgency, facility, clinician, location, time, and the non-diagnostic disclaimer.

For fallback checks, deny location, disable voice support, go offline after the shell loads, and use copy/share. Confirm the UI never claims live capacity, live traffic, live clinician availability, or a successful call.
