export interface AuthUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar?: string;
  token?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

export interface LoginResponse {
  token: string;
  user?: AuthUser;
}

export interface RegisterResponse {
  id: number;
  token: string;
  user?: AuthUser;
}

export interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  loginLoading: boolean;
  registerLoading: boolean;
  error: string | null;
  loginError: string | null;
  registerError: string | null;
}

export interface PasswordResetRequest {
  email: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
} 