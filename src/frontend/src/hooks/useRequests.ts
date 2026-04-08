import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { KeyId, RequestId, ReturnRequest } from "../types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type BackendActor = any;

function useBackendActor() {
  return useActor(createActor) as { actor: BackendActor; isFetching: boolean };
}

export function useListReturnRequests(keyId: KeyId | null) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<ReturnRequest[]>({
    queryKey: ["requests", keyId?.toString()],
    queryFn: async () => {
      if (!actor || keyId === null) return [];
      return actor.listReturnRequests(keyId) as Promise<ReturnRequest[]>;
    },
    enabled: !!actor && !isFetching && keyId !== null,
  });
}

export function useGetReturnRequestCount(keyId: KeyId | null) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<bigint>({
    queryKey: ["request-count", keyId?.toString()],
    queryFn: async () => {
      if (!actor || keyId === null) return BigInt(0);
      return actor.getReturnRequestCount(keyId) as Promise<bigint>;
    },
    enabled: !!actor && !isFetching && keyId !== null,
  });
}

export function useSubmitReturnRequest() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation<
    RequestId | null,
    Error,
    { keyId: KeyId; finderName: string; finderContact: string }
  >({
    mutationFn: async ({ keyId, finderName, finderContact }) => {
      if (!actor) throw new Error("Actor not available");
      const result = await actor.submitReturnRequest(
        keyId,
        finderName,
        finderContact,
      );
      if (Array.isArray(result)) {
        return (result[0] as RequestId) ?? null;
      }
      return (result as RequestId | null) ?? null;
    },
    onSuccess: (_, { keyId }) => {
      queryClient.invalidateQueries({
        queryKey: ["requests", keyId.toString()],
      });
      queryClient.invalidateQueries({
        queryKey: ["request-count", keyId.toString()],
      });
    },
  });
}

export function useDismissReturnRequest() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation<boolean, Error, { requestId: RequestId; keyId: KeyId }>({
    mutationFn: async ({ requestId }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.dismissReturnRequest(requestId) as Promise<boolean>;
    },
    onSuccess: (_, { keyId }) => {
      queryClient.invalidateQueries({
        queryKey: ["requests", keyId.toString()],
      });
      queryClient.invalidateQueries({
        queryKey: ["request-count", keyId.toString()],
      });
    },
  });
}
