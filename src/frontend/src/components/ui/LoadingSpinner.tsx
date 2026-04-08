import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  label?: string;
}

const sizeMap = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
};

export function LoadingSpinner({
  size = "md",
  className,
  label,
}: LoadingSpinnerProps) {
  return (
    <div
      className={cn("flex items-center justify-center gap-2", className)}
      aria-live="polite"
      aria-label={label ?? "Loading"}
    >
      <Loader2
        className={cn("animate-spin text-primary", sizeMap[size])}
        aria-hidden="true"
      />
      {label && <span className="text-sm text-muted-foreground">{label}</span>}
    </div>
  );
}

export function LoadingPage({ label }: { label?: string }) {
  return (
    <div className="flex-1 flex items-center justify-center min-h-[50vh]">
      <LoadingSpinner size="lg" label={label ?? "Loading..."} />
    </div>
  );
}
