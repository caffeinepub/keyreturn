import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Timestamp = bigint;
export type RequestId = bigint;
export interface ReturnRequest {
    id: RequestId;
    finderName: string;
    createdAt: Timestamp;
    finderContact: string;
    keyId: KeyId;
    dismissed: boolean;
}
export type KeyId = bigint;
export interface Key {
    id: KeyId;
    tag: string;
    status: KeyStatus;
    owner: Principal;
    createdAt: Timestamp;
    description?: string;
    updatedAt: Timestamp;
}
export enum KeyStatus {
    active = "active",
    returned = "returned"
}
export interface backendInterface {
    createKey(tag: string, description: string | null): Promise<KeyId>;
    deleteKey(keyId: KeyId): Promise<boolean>;
    dismissReturnRequest(requestId: RequestId): Promise<boolean>;
    getKey(keyId: KeyId): Promise<Key | null>;
    getReturnRequestCount(keyId: KeyId): Promise<bigint>;
    listKeys(): Promise<Array<Key>>;
    listReturnRequests(keyId: KeyId): Promise<Array<ReturnRequest>>;
    markKeyReturned(keyId: KeyId): Promise<boolean>;
    submitReturnRequest(keyId: KeyId, finderName: string, finderContact: string): Promise<RequestId | null>;
}
