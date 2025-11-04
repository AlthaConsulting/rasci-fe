export enum Authenticated2FAType {
  RecoveryCodes = "recovery_codes",
  Totp = "totp",
}

export enum AuthenticatedMethod {
  Mfa = "mfa",
  Password = "password",
}

export enum AuthenticationFlowId {
  Login = "login",
  MfaAuthenticate = "mfa_authenticate",
  MfaReauthenticate = "mfa_reauthenticate",
  ProviderRedirect = "provider_redirect",
  ProviderSignup = "provider_signup",
  ProviderToken = "provider_token",
  Reauthenticate = "reauthenticate",
  Signup = "signup",
  VerifyEmail = "verify_email",
}

export enum AuthenticationProviderFlow {
  ProviderRedirect = "provider_redirect",
  ProviderToken = "provider_token",
}

export enum TwoFactorAuthenticationType {
  RecoveryCodes = "recovery_codes",
  Totp = "totp",
}
