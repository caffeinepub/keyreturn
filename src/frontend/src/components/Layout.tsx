import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link, useRouterState } from "@tanstack/react-router";
import { Key, LogOut } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { shortPrincipal, logout } = useAuth();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-sm sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-foreground hover:text-primary transition-colors duration-200"
            data-ocid="nav-logo"
          >
            <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
              <Key className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display font-semibold text-sm tracking-tight">
              KeyReturn
            </span>
          </Link>

          <nav className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground font-mono hidden sm:block">
              {shortPrincipal}
            </span>
            <Separator orientation="vertical" className="h-4 hidden sm:block" />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => logout()}
              className="gap-2 text-muted-foreground hover:text-foreground"
              data-ocid="nav-logout"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="text-xs">Sign out</span>
            </Button>
          </nav>
        </div>

        {/* Sub-nav tabs */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex gap-0 border-t border-border/50">
          <NavTab href="/" label="My Keys" active={currentPath === "/"} />
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-muted/40 border-t border-border py-4">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between text-xs text-muted-foreground">
          <span>KeyReturn — Lost Key Recovery System</span>
          <span>
            © {new Date().getFullYear()}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== "undefined" ? window.location.hostname : "",
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}

interface NavTabProps {
  href: string;
  label: string;
  active: boolean;
}

function NavTab({ href, label, active }: NavTabProps) {
  return (
    <Link
      to={href}
      className={[
        "px-4 py-2 text-xs font-medium border-b-2 transition-colors duration-200",
        active
          ? "border-primary text-primary"
          : "border-transparent text-muted-foreground hover:text-foreground hover:border-border",
      ].join(" ")}
      data-ocid="nav-tab"
    >
      {label}
    </Link>
  );
}
