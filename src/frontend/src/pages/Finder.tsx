import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "@tanstack/react-router";
import { CheckCircle2, Key, MapPin } from "lucide-react";
import { useState } from "react";
import { useGetKey } from "../hooks/useKeys";
import { useSubmitReturnRequest } from "../hooks/useRequests";
import { isKeyReturned } from "../types";

type FormState = "idle" | "submitting" | "success";

export default function FinderPage() {
  const { keyId: keyIdParam } = useParams({ from: "/find/$keyId" });
  const keyId = (() => {
    try {
      return BigInt(keyIdParam);
    } catch {
      return null;
    }
  })();

  const { data: key, isLoading, isError } = useGetKey(keyId);
  const submitRequest = useSubmitReturnRequest();

  const [finderName, setFinderName] = useState("");
  const [finderContact, setFinderContact] = useState("");
  const [nameError, setNameError] = useState("");
  const [contactError, setContactError] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");

  function validate() {
    let valid = true;
    if (!finderName.trim()) {
      setNameError("Your name is required.");
      valid = false;
    } else {
      setNameError("");
    }
    if (!finderContact.trim()) {
      setContactError("Phone or email is required.");
      valid = false;
    } else {
      setContactError("");
    }
    return valid;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate() || !keyId) return;
    setFormState("submitting");
    try {
      await submitRequest.mutateAsync({
        keyId,
        finderName: finderName.trim(),
        finderContact: finderContact.trim(),
      });
      setFormState("success");
    } catch {
      setFormState("idle");
    }
  }

  const keyNotAvailable =
    !isLoading && (!key || isKeyReturned(key) || isError || keyId === null);

  return (
    <div
      className="min-h-screen bg-background flex items-center justify-center px-4 py-12"
      data-ocid="finder-page"
    >
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
            <Key className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-2xl font-display font-semibold text-foreground">
            Lost Key Found
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Help reunite this key with its owner
          </p>
        </div>

        {/* Card */}
        <div className="bg-card border border-border rounded-xl shadow-subtle overflow-hidden">
          {/* Key info band */}
          <div className="px-6 py-5 border-b border-border bg-muted/30">
            {isLoading ? (
              <div className="space-y-2" data-ocid="finder-loading">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-64" />
              </div>
            ) : keyId === null || isError ? (
              <div
                className="text-center py-1"
                data-ocid="finder-error-invalid"
              >
                <p className="text-destructive font-medium text-sm">
                  This QR code appears to be invalid.
                </p>
              </div>
            ) : !key || isKeyReturned(key) ? (
              <div
                className="text-center py-1"
                data-ocid="finder-error-returned"
              >
                <p className="text-destructive font-medium text-sm">
                  {!key
                    ? "This key tag could not be found."
                    : "This key has already been returned to its owner."}
                </p>
                <p className="text-muted-foreground text-xs mt-1">
                  No further action is needed — thank you!
                </p>
              </div>
            ) : (
              <div
                className="flex items-start gap-3"
                data-ocid="finder-key-info"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-foreground font-display truncate">
                    {key.tag}
                  </p>
                  {key.description && (
                    <p className="text-sm text-muted-foreground mt-0.5 break-words">
                      {key.description}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Form or result */}
          <div className="px-6 py-6">
            {formState === "success" ? (
              <div className="text-center py-4" data-ocid="finder-success">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-3">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-lg font-display font-semibold text-foreground">
                  Thank you!
                </h2>
                <p className="text-muted-foreground text-sm mt-1 leading-relaxed">
                  Your details have been sent to the owner. They'll reach out to
                  arrange a pickup soon. You're making someone's day! 🙌
                </p>
              </div>
            ) : keyNotAvailable ? (
              <p
                className="text-center text-sm text-muted-foreground py-2"
                data-ocid="finder-no-action"
              >
                There's nothing to do here. Thank you for scanning!
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="space-y-1.5">
                  <Label htmlFor="finder-name">Your Name</Label>
                  <Input
                    id="finder-name"
                    data-ocid="finder-name-input"
                    placeholder="e.g. Alex Johnson"
                    value={finderName}
                    onChange={(e) => setFinderName(e.target.value)}
                    onBlur={() => {
                      if (!finderName.trim())
                        setNameError("Your name is required.");
                      else setNameError("");
                    }}
                    aria-describedby={nameError ? "name-error" : undefined}
                    aria-invalid={!!nameError}
                    disabled={formState === "submitting"}
                  />
                  {nameError && (
                    <p
                      id="name-error"
                      className="text-destructive text-xs"
                      role="alert"
                    >
                      {nameError}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="finder-contact">Phone or Email</Label>
                  <Input
                    id="finder-contact"
                    data-ocid="finder-contact-input"
                    placeholder="e.g. +1 555 0100 or alex@example.com"
                    value={finderContact}
                    onChange={(e) => setFinderContact(e.target.value)}
                    onBlur={() => {
                      if (!finderContact.trim())
                        setContactError("Phone or email is required.");
                      else setContactError("");
                    }}
                    aria-describedby={
                      contactError ? "contact-error" : undefined
                    }
                    aria-invalid={!!contactError}
                    disabled={formState === "submitting"}
                  />
                  {contactError && (
                    <p
                      id="contact-error"
                      className="text-destructive text-xs"
                      role="alert"
                    >
                      {contactError}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  data-ocid="finder-submit-btn"
                  disabled={
                    formState === "submitting" || submitRequest.isPending
                  }
                >
                  {formState === "submitting" || submitRequest.isPending
                    ? "Sending..."
                    : "Notify the Owner"}
                </Button>

                {submitRequest.isError && (
                  <p
                    className="text-destructive text-xs text-center"
                    role="alert"
                  >
                    Something went wrong. Please try again.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Your contact details are only shared with the key owner.
        </p>

        <p className="text-center text-xs text-muted-foreground mt-3">
          © {new Date().getFullYear()}. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
              typeof window !== "undefined" ? window.location.hostname : "",
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-foreground transition-colors duration-200"
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </div>
  );
}
