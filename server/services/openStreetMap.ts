import type { Hospital } from "../../shared/carebridge";

const OVERPASS_ENDPOINTS = [
  "https://overpass-api.de/api/interpreter",
  "https://overpass.kumi.systems/api/interpreter",
];
const LOOKUP_TIMEOUT_MS = 6500;
const SEARCH_RADIUS_METERS = 15000;

function asNumber(value: unknown) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function escapeQueryValue(value: string) {
  return value.replace(/["\\]/g, "\\$&");
}

function parseHospital(element: any, index: number): Hospital | null {
  const tags = element?.tags ?? {};
  const latitude = asNumber(element.lat ?? element.center?.lat);
  const longitude = asNumber(element.lon ?? element.center?.lon);
  if (!tags.name || latitude === null || longitude === null) return null;
  const phone = tags.phone || tags["contact:phone"] || "Not listed";
  const address = [tags["addr:housenumber"], tags["addr:street"], tags["addr:city"], tags["addr:state"]].filter(Boolean).join(", ") || "Address not listed in OpenStreetMap";
  const website = tags.website || tags["contact:website"] || "https://www.openstreetmap.org/";
  const emergency = [tags.emergency, tags["healthcare:speciality"], tags["healthcare:speciality:emergency"], tags["hospital:type"]].filter(Boolean).join(" ").toLowerCase().includes("emergency");
  return {
    id: `osm-${element.type}-${element.id ?? index}`,
    name: String(tags.name),
    address,
    latitude,
    longitude,
    phone: String(phone),
    emergencyAvailable: emergency,
    status: "UNVERIFIED",
    capabilities: ["GENERAL", "MEDICAL_EMERGENCY"],
    isVerified: false,
    lastVerifiedAt: new Date().toISOString(),
    sourceUrl: website,
    sourceLabel: "OpenStreetMap community data",
    dataSource: "openstreetmap",
  };
}

export async function findNearbyHospitals(latitude: number, longitude: number, limit = 8): Promise<Hospital[]> {
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return [];
  const around = `(around:${SEARCH_RADIUS_METERS},${latitude},${longitude})`;
  const query = `[out:json][timeout:6];(nwr[amenity=hospital]${around};nwr[healthcare=hospital]${around};);out center tags;`;
  for (const endpoint of OVERPASS_ENDPOINTS) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), LOOKUP_TIMEOUT_MS);
    try {
      const response = await fetch(`${endpoint}?data=${encodeURIComponent(query)}`, {
        headers: { Accept: "application/json", "User-Agent": "CareBridge/1.0 emergency navigator" },
        signal: controller.signal,
      });
      if (!response.ok) continue;
      const payload = await response.json() as { elements?: unknown[] };
      const hospitals = (payload.elements ?? [])
        .map((element, index) => parseHospital(element, index))
        .filter((hospital): hospital is Hospital => Boolean(hospital))
        .filter((hospital, index, list) => list.findIndex(other => other.name.toLowerCase() === hospital.name.toLowerCase()) === index)
        .slice(0, limit);
      if (hospitals.length > 0) return hospitals;
    } catch {
      // Try the next public Overpass mirror, then let the caller use verified fallback data.
    } finally {
      clearTimeout(timeout);
    }
  }
  return [];
}
