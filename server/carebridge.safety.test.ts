import { describe, expect, it } from "vitest";
import { parseIncident } from "./services/parser";
import { applySafetyRules } from "./services/safetyRules";

const classify = (text: string) => applySafetyRules(parseIncident(text, "Father"));

describe("CareBridge safety engine", () => {
  it("classifies the primary Hinglish demo as cardiopulmonary emergency signals", () => {
    const result = classify("Mere father ko saans lene mein bahut dikkat hai aur chest mein pain hai.");
    expect(result.language).toBe("English");
    expect(result.reportedConcerns).toEqual(["breathing difficulty", "chest pain"]);
    expect(result.careCategory).toBe("CARDIO_RESPIRATORY");
    expect(result.urgency).toBe("EMERGENCY");
    expect(result.safetyNote).toContain("call 112");
  });

  it("recognizes Devanagari emergency signals without attempting a diagnosis", () => {
    const result = classify("मेरे पिता को सांस लेने में बहुत दिक्कत है और सीने में दर्द है");
    expect(result.language).toBe("Hindi / Hinglish");
    expect(result.reportedConcerns).toContain("breathing difficulty");
    expect(result.reportedConcerns).toContain("chest pain");
    expect(result.urgency).toBe("EMERGENCY");
    expect(result.safetyNote).toContain("not a diagnosis");
  });

  it("keeps unknown input usable and does not over-classify it", () => {
    const result = classify("I am worried but cannot explain yet");
    expect(result.reportedConcerns).toEqual([]);
    expect(result.careCategory).toBe("GENERAL");
    expect(result.urgency).toBe("GENERAL");
  });
});
