import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { isKeyActive, isKeyReturned } from "@/types";
import type { Key } from "@/types";
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Copy,
  MoreVertical,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useDeleteKey, useMarkKeyReturned } from "../hooks/useKeys";
import { useGetReturnRequestCount } from "../hooks/useRequests";
import { RequestsPanel } from "./RequestsPanel";

interface KeyCardProps {
  keyItem: Key;
}

function QRCodeImage({ url, tag }: { url: string; tag: string }) {
  const encoded = encodeURIComponent(url);
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encoded}&bgcolor=ffffff&color=000000&margin=4`;
  return (
    <div className="qr-container w-[120px] h-[120px] shrink-0">
      <img
        src={qrSrc}
        alt={`QR code for key: ${tag}`}
        width={112}
        height={112}
        className="rounded"
        loading="lazy"
      />
    </div>
  );
}

function RequestCountBadge({ keyId }: { keyId: Key["id"] }) {
  const { data: count } = useGetReturnRequestCount(keyId);
  const n = Number(count ?? 0n);
  if (n === 0) return null;
  return (
    <Badge
      variant="destructive"
      className="rounded-full text-xs px-1.5 py-0 h-5 min-w-5 flex items-center justify-center"
      data-ocid="request-count-badge"
    >
      {n}
    </Badge>
  );
}

export function KeyCard({ keyItem }: KeyCardProps) {
  const [expanded, setExpanded] = useState(false);
  const markReturned = useMarkKeyReturned();
  const deleteKey = useDeleteKey();

  const finderUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/find/${keyItem.id.toString()}`
      : `/find/${keyItem.id.toString()}`;

  function handleCopyLink() {
    navigator.clipboard.writeText(finderUrl).then(
      () => toast.success("Finder link copied!"),
      () => toast.error("Could not copy link"),
    );
  }

  function handleMarkReturned() {
    markReturned.mutate(keyItem.id, {
      onSuccess: () => toast.success(`"${keyItem.tag}" marked as returned`),
      onError: () => toast.error("Failed to update key status"),
    });
  }

  function handleDelete() {
    deleteKey.mutate(keyItem.id, {
      onSuccess: () => toast.success(`"${keyItem.tag}" deleted`),
      onError: () => toast.error("Failed to delete key"),
    });
  }

  const active = isKeyActive(keyItem);
  const returned = isKeyReturned(keyItem);

  return (
    <Card
      className="card-hover flex flex-col border border-border bg-card"
      data-ocid="key-card"
    >
      <CardHeader className="pb-3 pt-4 px-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3
                className="font-display font-semibold text-sm text-foreground truncate"
                title={keyItem.tag}
              >
                {keyItem.tag}
              </h3>
              <Badge
                variant={active ? "default" : "secondary"}
                className={
                  active
                    ? "bg-primary/10 text-primary border border-primary/20 text-xs font-medium"
                    : "bg-accent/15 text-accent-foreground border border-accent/30 text-xs font-medium"
                }
                data-ocid="key-status-badge"
              >
                {active ? "Active" : "Returned"}
              </Badge>
              <RequestCountBadge keyId={keyItem.id} />
            </div>
            {keyItem.description && (
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                {keyItem.description}
              </p>
            )}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0 shrink-0 text-muted-foreground"
                aria-label="Key actions"
                data-ocid="key-menu-trigger"
              >
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem
                onClick={handleCopyLink}
                data-ocid="key-menu-copy"
              >
                <Copy className="w-3.5 h-3.5 mr-2" />
                Copy link
              </DropdownMenuItem>
              {active && (
                <DropdownMenuItem
                  onClick={handleMarkReturned}
                  disabled={markReturned.isPending}
                  data-ocid="key-menu-returned"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 mr-2" />
                  Mark returned
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleDelete}
                disabled={deleteKey.isPending}
                className="text-destructive focus:text-destructive focus:bg-destructive/10"
                data-ocid="key-menu-delete"
              >
                <Trash2 className="w-3.5 h-3.5 mr-2" />
                Delete key
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="px-4 pb-4 flex-1 flex flex-col gap-3">
        {/* QR + copy row */}
        <div className="flex items-center gap-4">
          <QRCodeImage url={finderUrl} tag={keyItem.tag} />
          <div className="flex-1 min-w-0 space-y-2">
            <p className="text-xs text-muted-foreground leading-snug">
              Share this QR code so a finder can submit a return request.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 text-xs h-7"
              onClick={handleCopyLink}
              data-ocid="key-copy-link-btn"
            >
              <Copy className="w-3 h-3" />
              Copy finder link
            </Button>
            {returned && (
              <div className="flex items-center gap-1.5 text-xs text-accent-foreground">
                <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                <span>Key has been returned</span>
              </div>
            )}
          </div>
        </div>

        {/* Expand requests section */}
        <button
          type="button"
          className="flex items-center justify-between w-full py-2 border-t border-border/50 text-xs text-muted-foreground hover:text-foreground transition-colors duration-200 group"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          data-ocid="key-requests-toggle"
        >
          <span className="font-medium">Return Requests</span>
          {expanded ? (
            <ChevronUp className="w-3.5 h-3.5 group-hover:text-primary transition-colors" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 group-hover:text-primary transition-colors" />
          )}
        </button>

        {expanded && <RequestsPanel keyId={keyItem.id} />}
      </CardContent>
    </Card>
  );
}

export function KeyCardSkeleton() {
  return (
    <Card className="border border-border bg-card">
      <CardHeader className="pb-3 pt-4 px-4">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1.5 flex-1">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-48" />
          </div>
          <Skeleton className="h-7 w-7 rounded" />
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <div className="flex gap-4">
          <Skeleton className="w-[120px] h-[120px] rounded-lg" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-3/4" />
            <Skeleton className="h-7 w-28 rounded" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
