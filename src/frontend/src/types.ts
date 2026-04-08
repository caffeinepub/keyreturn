import type { Principal } from "@icp-sdk/core/principal";

export type KeyId = bigint;
export type RequestId = bigint;
export type Timestamp = bigint;

export type KeyStatus = "active" | "returned";

export interface Key {
  id: KeyId;
  owner: Principal;
  tag: string;
  description: string | undefined;
  status: KeyStatus;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface ReturnRequest {
  id: RequestId;
  keyId: KeyId;
  finderName: string;
  finderContact: string;
  createdAt: Timestamp;
  dismissed: boolean;
}

export function isKeyActive(key: Key): boolean {
  return key.status === "active";
}

export function isKeyReturned(key: Key): boolean {
  return key.status === "returned";
}

export function formatTimestamp(ts: Timestamp): string {
  // Convert nanoseconds to milliseconds
  const ms = Number(ts) / 1_000_000;
  return new Date(ms).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
