import type { backendInterface } from "../backend";
import { KeyStatus } from "../backend";
import { Principal } from "@icp-sdk/core/principal";

const samplePrincipal = Principal.fromText("aaaaa-aa");
const now = BigInt(Date.now()) * BigInt(1_000_000);

export const mockBackend: backendInterface = {
  createKey: async (_tag: string, _description: string | null) => BigInt(3),

  deleteKey: async (_keyId: bigint) => true,

  dismissReturnRequest: async (_requestId: bigint) => true,

  getKey: async (keyId: bigint) => ({
    id: keyId,
    tag: "KEY-001",
    status: KeyStatus.active,
    owner: samplePrincipal,
    createdAt: now,
    updatedAt: now,
    description: "Front door key",
  }),

  getReturnRequestCount: async (_keyId: bigint) => BigInt(2),

  listKeys: async () => [
    {
      id: BigInt(1),
      tag: "KEY-001",
      status: KeyStatus.active,
      owner: samplePrincipal,
      createdAt: now,
      updatedAt: now,
      description: "Front door key",
    },
    {
      id: BigInt(2),
      tag: "KEY-002",
      status: KeyStatus.returned,
      owner: samplePrincipal,
      createdAt: now,
      updatedAt: now,
      description: "Office mailbox key",
    },
  ],

  listReturnRequests: async (_keyId: bigint) => [
    {
      id: BigInt(1),
      keyId: _keyId,
      finderName: "Jane Smith",
      finderContact: "jane@example.com",
      createdAt: now,
      dismissed: false,
    },
  ],

  markKeyReturned: async (_keyId: bigint) => true,

  submitReturnRequest: async (
    _keyId: bigint,
    _finderName: string,
    _finderContact: string
  ) => BigInt(1),
};
