import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { Key, KeyId } from "../types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type BackendActor = any;

function useBackendActor() {
  return useActor(createActor) as { actor: BackendActor; isFetching: boolean };
}

export function useListKeys() {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Key[]>({
    queryKey: ["keys"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listKeys() as Promise<Key[]>;
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetKey(keyId: KeyId | null) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<Key | null>({
    queryKey: ["key", keyId?.toString()],
    queryFn: async () => {
      if (!actor || keyId === null) return null;
      const result = await actor.getKey(keyId);
      if (Array.isArray(result)) {
        return (result[0] as Key) ?? null;
      }
      return (result as Key | null) ?? null;
    },
    enabled: !!actor && !isFetching && keyId !== null,
  });
}

export function useCreateKey() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation<KeyId, Error, { tag: string; description?: string }>({
    mutationFn: async ({ tag, description }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createKey(tag, description ?? null) as Promise<KeyId>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["keys"] });
    },
  });
}

export function useMarkKeyReturned() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation<boolean, Error, KeyId>({
    mutationFn: async (keyId) => {
      if (!actor) throw new Error("Actor not available");
      return actor.markKeyReturned(keyId) as Promise<boolean>;
    },
    onSuccess: (_, keyId) => {
      queryClient.invalidateQueries({ queryKey: ["keys"] });
      queryClient.invalidateQueries({ queryKey: ["key", keyId.toString()] });
    },
  });
}

export function useDeleteKey() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  return useMutation<boolean, Error, KeyId>({
    mutationFn: async (keyId) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteKey(keyId) as Promise<boolean>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["keys"] });
    },
  });
}
