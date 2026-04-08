import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { formatTimestamp } from "@/types";
import type { KeyId, ReturnRequest } from "@/types";
import { X } from "lucide-react";
import { toast } from "sonner";
import {
  useDismissReturnRequest,
  useListReturnRequests,
} from "../hooks/useRequests";

interface RequestsPanelProps {
  keyId: KeyId;
}

function RequestRow({
  request,
  onDismiss,
  isPending,
}: {
  request: ReturnRequest;
  onDismiss: (requestId: ReturnRequest["id"]) => void;
  isPending: boolean;
}) {
  return (
    <div
      className="flex items-start justify-between gap-3 py-3 border-b border-border/60 last:border-0"
      data-ocid="request-row"
    >
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">
          {request.finderName}
        </p>
        <p className="text-xs text-muted-foreground truncate">
          {request.finderContact}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">
          {formatTimestamp(request.createdAt)}
        </p>
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="shrink-0 h-7 w-7 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
        onClick={() => onDismiss(request.id)}
        disabled={isPending}
        aria-label="Dismiss request"
        data-ocid="request-dismiss-btn"
      >
        <X className="w-3.5 h-3.5" />
      </Button>
    </div>
  );
}

export function RequestsPanel({ keyId }: RequestsPanelProps) {
  const { data: requests, isLoading } = useListReturnRequests(keyId);
  const dismiss = useDismissReturnRequest();

  function handleDismiss(requestId: ReturnRequest["id"]) {
    dismiss.mutate(
      { requestId, keyId },
      {
        onSuccess: () => toast.success("Request dismissed"),
        onError: () => toast.error("Failed to dismiss request"),
      },
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-2 pt-2" data-ocid="requests-loading">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    );
  }

  const active = (requests ?? []).filter((r) => !r.dismissed);

  if (active.length === 0) {
    return (
      <p
        className="text-xs text-muted-foreground py-3 text-center"
        data-ocid="requests-empty"
      >
        No pending return requests.
      </p>
    );
  }

  return (
    <div className="divide-y divide-border/40" data-ocid="requests-panel">
      {active.map((req) => (
        <RequestRow
          key={req.id.toString()}
          request={req}
          onDismiss={handleDismiss}
          isPending={dismiss.isPending}
        />
      ))}
    </div>
  );
}
