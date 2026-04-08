import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  useNavigate,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { Layout } from "./components/Layout";
import { LoadingPage } from "./components/ui/LoadingSpinner";
import { useAuth } from "./hooks/useAuth";

// ── Lazy page imports ────────────────────────────────────────────────
const DashboardPage = lazy(() => import("./pages/Dashboard"));
const FinderPage = lazy(() => import("./pages/Finder"));
const LoginPage = lazy(() => import("./pages/Login"));

// ── Root route ──────────────────────────────────────────────────────
const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Toaster richColors position="top-right" />
    </>
  ),
});

// ── Auth-protected wrapper ───────────────────────────────────────────
function ProtectedDashboard() {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  if (isLoading) {
    return <LoadingPage label="Loading..." />;
  }

  if (!isAuthenticated) {
    navigate({ to: "/login" });
    return null;
  }

  return (
    <Layout>
      <Suspense fallback={<LoadingPage />}>
        <DashboardPage />
      </Suspense>
    </Layout>
  );
}

// ── Routes ───────────────────────────────────────────────────────────
const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: ProtectedDashboard,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: () => (
    <Suspense fallback={<LoadingPage />}>
      <LoginPage />
    </Suspense>
  ),
});

const finderRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/find/$keyId",
  component: () => (
    <Suspense fallback={<LoadingPage />}>
      <FinderPage />
    </Suspense>
  ),
});

// ── Router ────────────────────────────────────────────────────────────
const routeTree = rootRoute.addChildren([
  dashboardRoute,
  loginRoute,
  finderRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
