import { Buffer } from "node:buffer";

const MAX_FILE_BYTES = 10 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "application/pdf", "text/plain"]);

function storageConfig() {
  return {
    url: process.env.SUPABASE_URL ?? "",
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
    bucket: process.env.SUPABASE_STORAGE_BUCKET ?? "carebridge-files",
  };
}

export function validateFile(file: { type: string; size: number }) {
  if (!ALLOWED_TYPES.has(file.type)) throw new Error("Unsupported file type");
  if (file.size > MAX_FILE_BYTES) throw new Error("File exceeds the 10 MB limit");
}

export async function uploadFile(path: string, file: { type: string; bytes: Uint8Array }) {
  validateFile({ type: file.type, size: file.bytes.byteLength });
  const config = storageConfig();
  if (!config.url || !config.serviceRoleKey) throw new Error("Supabase Storage is not configured");
  const response = await fetch(`${config.url}/storage/v1/object/${config.bucket}/${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.serviceRoleKey}`,
      apikey: config.serviceRoleKey,
      "Content-Type": file.type,
      "x-upsert": "false",
    },
    body: Buffer.from(file.bytes),
  });
  if (!response.ok) throw new Error(`Storage upload failed: ${response.status}`);
  return { path, bucket: config.bucket };
}

export async function deleteFile(path: string) {
  const config = storageConfig();
  if (!config.url || !config.serviceRoleKey) throw new Error("Supabase Storage is not configured");
  const response = await fetch(`${config.url}/storage/v1/object/${config.bucket}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${config.serviceRoleKey}`,
      apikey: config.serviceRoleKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prefixes: [path] }),
  });
  if (!response.ok) throw new Error(`Storage delete failed: ${response.status}`);
  return { deleted: true, path };
}
