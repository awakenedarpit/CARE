import { describe, expect, it } from "vitest";
import { buildRecommendation } from "./services/carebridgeEngine";
import { getActionsForIncident } from "./services/incidentStore";
import { logAction } from "./services/actionLog";

describe("CareBridge recommendation engine", () => {
  it("connects the selected facility to a verified clinician for the emergency demo", () => {
    const result = buildRecommendation({
      rawText: "Mere father ko saans lene mein bahut dikkat hai aur chest mein pain hai.",
      patientRelation: "Father",
      location: { latitude: 12.9716, longitude: 77.5946, label: "Demo location · Bengaluru", source: "demo" },
    });
    expect(result.incident.urgency).toBe("EMERGENCY");
    expect(result.recommendedFacility?.isVerified).toBe(true);
    expect(result.recommendedDoctor?.isVerified).toBe(true);
    expect(result.recommendedDoctor?.hospitalId).toBe(result.recommendedFacility?.id);
    expect(result.liveStatusUnavailable).toBe(true);
    expect(result.handoff.disclaimer).toContain("Not a diagnosis");
  });

  it("falls back to demo location and still returns trusted resources", () => {
    const result = buildRecommendation({ rawText: "fever", patientRelation: "Someone" });
    expect(result.location.source).toBe("demo");
    expect(result.facilities.length).toBeGreaterThan(0);
    expect(result.fallbackMessage).toContain("Live facility information unavailable");
  });

  it("keeps an action trace connected to its incident, hospital, and doctor", () => {
    const result = buildRecommendation({ rawText: "chest pain", patientRelation: "Father" });
    const action = logAction({
      incidentId: result.id,
      doctorId: result.recommendedDoctor?.id,
      hospitalId: result.recommendedFacility?.id,
      actionType: "CALL_DOCTOR",
    });
    expect(getActionsForIncident(result.id)).toContainEqual(action);
    expect(action.incidentId).toBe(result.id);
    expect(action.hospitalId).toBe(result.recommendedFacility?.id);
  });
});
