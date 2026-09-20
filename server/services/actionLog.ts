import { randomUUID } from "node:crypto";
import type { ActionRecord } from "../../shared/carebridge";
import { saveAction } from "./incidentStore";

export function logAction(input: Omit<ActionRecord, "id" | "createdAt">): ActionRecord {
  return saveAction({
    ...input,
    id: randomUUID(),
    createdAt: new Date().toISOString(),
  });
}
