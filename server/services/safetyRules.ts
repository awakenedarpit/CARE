import type { ParsedIncident, Urgency } from "../../shared/carebridge";

const emergencyConcerns = new Set([
  "breathing difficulty",
  "chest pain",
  "unconsciousness",
  "heavy bleeding",
  "stroke signs",
  "severe injury",
  "seizure",
]);

const urgentConcerns = new Set([
  "fever",
  "vomiting",
  "pregnancy-related concern",
  "child-related concern",
]);

export function classifyUrgency(incident: ParsedIncident): Urgency {
  if (incident.reportedConcerns.some(concern => emergencyConcerns.has(concern))) return "EMERGENCY";
  if (incident.reportedConcerns.some(concern => urgentConcerns.has(concern))) return "URGENT";
  return "GENERAL";
}

export function applySafetyRules(incident: ParsedIncident): ParsedIncident {
  const urgency = classifyUrgency(incident);
  const safetyNote = urgency === "EMERGENCY"
    ? "Emergency warning: call 112 now if there is immediate danger. Do not wait for this app. This is not a diagnosis."
    : urgency === "URGENT"
      ? "Prompt professional assessment is recommended. If symptoms worsen or feel life-threatening, call 112."
      : "For new or worsening concerns, seek professional medical care. This tool does not diagnose or treat.";
  return { ...incident, urgency, safetyNote };
}
