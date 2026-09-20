import type { ActionRecord, IncidentRecord } from "../../shared/carebridge";

const incidents = new Map<string, IncidentRecord>();
const actions: ActionRecord[] = [];

export function saveIncident(incident: IncidentRecord) {
  incidents.set(incident.id, incident);
  return incident;
}

export function getIncident(id: string) {
  return incidents.get(id) ?? null;
}

export function saveAction(action: ActionRecord) {
  actions.push(action);
  return action;
}

export function getActionsForIncident(incidentId: string) {
  return actions.filter(action => action.incidentId === incidentId);
}
