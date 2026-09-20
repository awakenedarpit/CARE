import { randomUUID } from "node:crypto";
import type { IncidentRecord, Recommendation } from "../../shared/carebridge";
import { applySafetyRules } from "./safetyRules";
import { parseIncident } from "./parser";
import { HOSPITALS, DOCTORS } from "./seedData";
import { matchDoctor, rankHospitals } from "./matching";
import { saveIncident } from "./incidentStore";

export const DEMO_LOCATION = { latitude: 12.9716, longitude: 77.5946, label: "Demo location · Bengaluru", source: "demo" as const };

type LocationInput = { latitude?: number; longitude?: number; label?: string; source?: "browser" | "demo" | "manual" };

export function buildRecommendation(input: { rawText: string; patientRelation?: string; location?: LocationInput }): IncidentRecord {
  const incident = applySafetyRules(parseIncident(input.rawText, input.patientRelation));
  const location = {
    latitude: Number.isFinite(input.location?.latitude) ? input.location!.latitude : DEMO_LOCATION.latitude,
    longitude: Number.isFinite(input.location?.longitude) ? input.location!.longitude : DEMO_LOCATION.longitude,
    label: input.location?.label || DEMO_LOCATION.label,
    source: input.location?.source || DEMO_LOCATION.source,
  } as Recommendation["location"];
  const facilities = rankHospitals(HOSPITALS, incident.careCategory, location.latitude, location.longitude);
  const recommendedFacility = facilities[0] ?? null;
  const recommendedDoctor = recommendedFacility ? matchDoctor(DOCTORS, recommendedFacility.id, incident.careCategory) : null;
  const now = new Date();
  const recommendation: IncidentRecord = {
    id: randomUUID(),
    createdAt: now.toISOString(),
    incident,
    facilities,
    liveFacilities: [],
    recommendedFacility,
    recommendedDoctor,
    location,
    liveStatusUnavailable: true,
    fallbackMessage: facilities.length === 0 ? "No verified nearby facility matched. Call 112 and use the closest professional emergency resource." : "Live facility information unavailable. Showing cached emergency resources.",
    handoff: {
      patientRelation: incident.patientRelation,
      reportedConcerns: incident.reportedConcerns,
      urgency: incident.urgency,
      recommendedFacility: recommendedFacility?.name ?? "No verified facility selected",
      recommendedClinician: recommendedDoctor?.name ?? "No verified clinician available",
      location: location.label,
      currentTime: now.toLocaleString(),
      disclaimer: "Not a diagnosis. Based only on information reported by the user.",
    },
  };
  return saveIncident(recommendation);
}

export function getFacilityRecommendations(input: { latitude: number; longitude: number; category?: Recommendation["incident"]["careCategory"] }) {
  return rankHospitals(HOSPITALS, input.category || "GENERAL", input.latitude, input.longitude);
}

export function getDoctorRecommendations(input: { hospitalId: string; category?: Recommendation["incident"]["careCategory"] }) {
  return DOCTORS.filter(doctor => doctor.hospitalId === input.hospitalId && doctor.isVerified).sort((a, b) => Number(b.isOnCall) - Number(a.isOnCall));
}
