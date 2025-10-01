interface Authenticated {
  user: User;
  methods: (EmailPasswordStrategy | TwoFactorStrategy)[];
}

interface AuthenticationFlow {
  id: import("../enums").AuthenticationFlowId;
  is_pending?: boolean;
  provider?: AuthenticationProvider;
}

interface AuthenticationMeta {
  access_token?: string;
  is_authenticated: boolean | null;
  session_token?: string;
}

interface AuthenticationProvider {
  client_id?: string;
  flows: import("../enums").AuthenticationProviderFlow[];
  id: string;
  name: string;
}

interface EmailPasswordStrategy {
  at: EpochTimeStamp;
  email: string;
  method: import("../enums").AuthenticatedMethod.Password;
}

interface RecoveryCodesAuthenticator {
  created_at: number;
  last_used_at: number;
  total_code_count: number;
  type: Type;
  unused_code_count: number;
}

interface SensitiveRecoveryCodes extends RecoveryCodesAuthenticator {
  unused_codes: string[];
}

interface Session {
  created_at: number;
  id: string;
  ip: string;
  is_current: string;
  last_seen_at?: number;
  user_agent: string;
}

interface TOTPAuthenticator {
  created_at: number;
  last_used_at: number;
  type: import("../enums").TwoFactorAuthenticationType;
}

interface TwoFactorStrategy {
  at: number;
  method: import("../enums").AuthenticatedMethod.Mfa;
  reauthenticated: boolean;
  type: import("../enums").Authenticated2FAType;
}

interface User {
  display: string;
  email: string;
  has_usable_password: boolean;
  id: number;
}
