import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useCreateKey } from "../hooks/useKeys";

interface CreateKeyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateKeyModal({ open, onOpenChange }: CreateKeyModalProps) {
  const [tag, setTag] = useState("");
  const [description, setDescription] = useState("");
  const [tagError, setTagError] = useState("");
  const createKey = useCreateKey();

  function handleClose() {
    if (createKey.isPending) return;
    setTag("");
    setDescription("");
    setTagError("");
    onOpenChange(false);
  }

  function validate() {
    if (!tag.trim()) {
      setTagError("Tag is required.");
      return false;
    }
    setTagError("");
    return true;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    createKey.mutate(
      { tag: tag.trim(), description: description.trim() || undefined },
      {
        onSuccess: () => {
          toast.success(`Key "${tag.trim()}" created`);
          handleClose();
        },
        onError: () => toast.error("Failed to create key"),
      },
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md" data-ocid="create-key-modal">
        <DialogHeader>
          <DialogTitle className="font-display text-lg">
            Add New Key
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 pt-1">
          <div className="space-y-1.5">
            <Label htmlFor="key-tag" className="text-sm font-medium">
              Tag <span className="text-destructive">*</span>
            </Label>
            <Input
              id="key-tag"
              placeholder="e.g. House Front Door, Office Cabinet"
              value={tag}
              onChange={(e) => {
                setTag(e.target.value);
                if (tagError && e.target.value.trim()) setTagError("");
              }}
              onBlur={validate}
              disabled={createKey.isPending}
              aria-invalid={!!tagError}
              aria-describedby={tagError ? "tag-error" : undefined}
              data-ocid="create-key-tag-input"
              autoFocus
            />
            {tagError && (
              <p id="tag-error" className="text-xs text-destructive">
                {tagError}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="key-description" className="text-sm font-medium">
              Description{" "}
              <span className="text-muted-foreground font-normal">
                (optional)
              </span>
            </Label>
            <Textarea
              id="key-description"
              placeholder="Additional details about the key or its location…"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={createKey.isPending}
              rows={3}
              className="resize-none"
              data-ocid="create-key-desc-input"
            />
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={createKey.isPending}
              data-ocid="create-key-cancel-btn"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={createKey.isPending}
              data-ocid="create-key-submit-btn"
            >
              {createKey.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-1.5" />
                  Creating…
                </>
              ) : (
                "Create Key"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
