import type { CareCategory, Doctor, Hospital, RankedHospital } from "../../shared/carebridge";

const toRadians = (value: number) => value * Math.PI / 180;

export function distanceKm(aLat: number, aLng: number, bLat: number, bLng: number) {
  const earthRadius = 6371;
  const dLat = toRadians(bLat - aLat);
  const dLng = toRadians(bLng - aLng);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRadians(aLat)) * Math.cos(toRadians(bLat)) * Math.sin(dLng / 2) ** 2;
  return earthRadius * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

const freshnessScore = (lastVerifiedAt: string) => {
  const days = Math.max(0, (Date.now() - new Date(lastVerifiedAt).getTime()) / 86_400_000);
  return Math.max(0, 1 - Math.min(days, 30) / 30);
};

function capabilityScore(hospital: Hospital, category: CareCategory) {
  if (hospital.capabilities.includes(category)) return 1;
  if (hospital.capabilities.includes("MEDICAL_EMERGENCY")) return 0.75;
  if (hospital.capabilities.includes("GENERAL")) return 0.55;
  return 0;
}

export function rankHospitals(hospitals: Hospital[], category: CareCategory, latitude: number, longitude: number): RankedHospital[] {
  return hospitals
    .filter(hospital => hospital.isVerified)
    .map(hospital => {
      const distance = distanceKm(latitude, longitude, hospital.latitude, hospital.longitude);
      const readiness = hospital.emergencyAvailable ? 1 : 0;
      const capability = capabilityScore(hospital, category);
      const status = hospital.status === "TRUSTED_RESOURCE" ? 1 : 0;
      const proximity = 1 / (1 + distance / 5);
      const freshness = freshnessScore(hospital.lastVerifiedAt);
      const score = readiness * 30 + capability * 30 + status * 15 + proximity * 15 + freshness * 10;
      const why = [
        readiness ? "Emergency service is listed in the trusted resource record" : "Emergency readiness is not confirmed",
        capability === 1 ? `Exact ${category.replaceAll("_", " ").toLowerCase()} capability match` : capability > 0 ? "Medical emergency capability is available as a fallback" : "Capability match is limited",
        `Approx. ${distance.toFixed(1)} km from the selected location`,
        `Resource last checked ${new Date(hospital.lastVerifiedAt).toLocaleDateString()}`,
      ];
      return { ...hospital, distanceKm: distance, score, why };
    })
    .sort((a, b) => b.score - a.score);
}

export function matchDoctor(doctors: Doctor[], hospitalId: string, category: CareCategory): Doctor | null {
  const specialtyMatch = (doctor: Doctor) => {
    const specialty = doctor.specialty.toLowerCase();
    if (category === "NEUROLOGICAL") return specialty.includes("neuro");
    if (category === "CARDIO_RESPIRATORY") return specialty.includes("cardio") || specialty.includes("emergency");
    if (category === "TRAUMA") return specialty.includes("emergency") || specialty.includes("trauma");
    return true;
  };
  return doctors
    .filter(doctor => doctor.hospitalId === hospitalId && doctor.isVerified)
    .sort((a, b) => Number(b.isOnCall) - Number(a.isOnCall) || Number(specialtyMatch(b)) - Number(specialtyMatch(a)))
    .find(specialtyMatch) ?? null;
}
