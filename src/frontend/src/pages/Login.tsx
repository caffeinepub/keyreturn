import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { Key, Shield, Smartphone } from "lucide-react";
import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

export default function LoginPage() {
  const { login, isLoading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: "/" });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div
      className="min-h-screen flex flex-col bg-background"
      data-ocid="login-page"
    >
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo + title */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary shadow-subtle">
              <Key className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground">
                KeyReturn
              </h1>
              <p className="text-muted-foreground mt-1 text-sm">
                Lost Key Recovery System
              </p>
            </div>
          </div>

          {/* Feature highlights */}
          <div className="bg-card border border-border rounded-xl p-6 space-y-4 shadow-subtle">
            <FeatureRow
              icon={Key}
              title="Register your keys"
              desc="Add a tag, generate a QR code, and attach it to your keychain."
            />
            <FeatureRow
              icon={Smartphone}
              title="Finders scan the QR"
              desc="Anyone who finds your keys can submit their contact info."
            />
            <FeatureRow
              icon={Shield}
              title="You stay in control"
              desc="Your personal info is never shown — finders reach you through the app."
            />
          </div>

          {/* Sign-in block */}
          <div className="space-y-3">
            <Button
              size="lg"
              className="w-full"
              onClick={() => login()}
              disabled={isLoading}
              data-ocid="login-ii-btn"
            >
              {isLoading ? "Connecting..." : "Sign in with Internet Identity"}
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              Secure, passwordless login powered by the Internet Computer.
            </p>
          </div>
        </div>
      </div>

      <footer className="py-4 text-center text-xs text-muted-foreground border-t border-border bg-muted/30">
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
      </footer>
    </div>
  );
}

function FeatureRow({
  icon: Icon,
  title,
  desc,
}: {
  icon: typeof Key;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex gap-3">
      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
        <Icon className="w-4 h-4 text-primary" />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
    </div>
  );
}
