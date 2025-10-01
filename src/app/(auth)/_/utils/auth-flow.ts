import { AuthenticationFlowId } from "../enums";

export function requiresMFA(flows: AuthenticationFlow[]) {
  return flows.some((flow) => flow.id === AuthenticationFlowId.MfaAuthenticate);
}

export function requiresVerifyEmail(flows: AuthenticationFlow[]) {
  return flows.some((flow) => flow.id === AuthenticationFlowId.VerifyEmail);
}

export function requiresReauthenticate(flows: AuthenticationFlow[]) {
  return flows.some((flow) => flow.id === AuthenticationFlowId.Reauthenticate);
}

export function requiresMFAReauthenticate(flows: AuthenticationFlow[]) {
  return flows.some(
    (flow) => flow.id === AuthenticationFlowId.MfaReauthenticate
  );
}

export function isInitiatingTOTP(meta: unknown): boolean {
  return (
    typeof meta === "object" &&
    meta !== null &&
    "secret" in meta &&
    "totp_url" in meta
  );
}
