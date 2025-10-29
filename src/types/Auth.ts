export interface AuthState {
  email: string;
  password: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface AuthStateStore {
  status: AuthStatus;
  user: User | null;
  error: string | null;
  checkingAuthentication: (credentials: {
    email: string;
    password: string;
  }) => Promise<void>;
  checkAuthToken: () => Promise<void>;
  logout: () => void;
}

export type AuthStatus = "checking" | "authenticated" | "not-authenticated";
