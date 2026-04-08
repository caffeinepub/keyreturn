import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Key as KeyIcon, Plus, Search } from "lucide-react";
import { useState } from "react";
import { CreateKeyModal } from "../components/CreateKeyModal";
import { KeyCard, KeyCardSkeleton } from "../components/KeyCard";
import { useListKeys } from "../hooks/useKeys";
import type { Key } from "../types";

export default function Dashboard() {
  const { data: keys, isLoading } = useListKeys();
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filtered: Key[] = (keys ?? []).filter((k) =>
    k.tag.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6" data-ocid="dashboard-page">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-xl font-bold text-foreground">
            My Keys
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Manage your registered keys and return requests.
          </p>
        </div>
        <Button
          onClick={() => setModalOpen(true)}
          className="gap-2 shrink-0"
          data-ocid="add-key-btn"
        >
          <Plus className="w-4 h-4" />
          Add Key
        </Button>
      </div>

      {/* Search bar — only shown when keys exist */}
      {(keys?.length ?? 0) > 0 && (
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Search by tag…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
            data-ocid="search-input"
            aria-label="Search keys by tag"
          />
        </div>
      )}

      {/* Content area */}
      {isLoading ? (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          data-ocid="keys-loading"
        >
          {Array.from({ length: 3 }).map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholders
            <KeyCardSkeleton key={i} />
          ))}
        </div>
      ) : search && filtered.length === 0 ? (
        <div
          className="rounded-xl border border-border bg-muted/30 py-12 text-center"
          data-ocid="search-empty"
        >
          <p className="text-sm text-muted-foreground">
            No keys matching{" "}
            <span className="font-medium text-foreground">"{search}"</span>.
          </p>
          <button
            type="button"
            onClick={() => setSearch("")}
            className="text-xs text-primary hover:underline mt-1.5 inline-block"
            data-ocid="search-clear-btn"
          >
            Clear search
          </button>
        </div>
      ) : (keys?.length ?? 0) === 0 ? (
        <div className="rounded-xl border border-border bg-muted/30">
          <EmptyState
            icon={KeyIcon}
            title="No keys registered yet"
            description="Add your first key to generate a QR code and start tracking return requests."
            action={{
              label: "Add your first key",
              onClick: () => setModalOpen(true),
              "data-ocid": "empty-state-add-key-btn",
            }}
          />
        </div>
      ) : (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          data-ocid="keys-grid"
        >
          {filtered.map((key) => (
            <KeyCard key={key.id.toString()} keyItem={key} />
          ))}
        </div>
      )}

      <CreateKeyModal open={modalOpen} onOpenChange={setModalOpen} />
    </div>
  );
}
