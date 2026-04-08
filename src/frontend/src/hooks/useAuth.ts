import { useInternetIdentity } from "@caffeineai/core-infrastructure";

export function useAuth() {
  const { identity, loginStatus, login, clear } = useInternetIdentity();

  const isAuthenticated = loginStatus === "success" && identity !== undefined;
  const isLoading =
    loginStatus === "initializing" || loginStatus === "logging-in";
  const principal = identity?.getPrincipal();

  const principalText = principal?.toText();
  const shortPrincipal = principalText
    ? `${principalText.slice(0, 5)}...${principalText.slice(-3)}`
    : undefined;

  return {
    identity,
    principal,
    principalText,
    shortPrincipal,
    isAuthenticated,
    isLoading,
    loginStatus,
    login,
    logout: clear,
  };
}
