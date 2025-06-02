import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthState, LoginRequest, RegisterRequest, LoginResponse, RegisterResponse, AuthUser } from '@/types/auth';
import { authApi } from '@/services/authApi';

// Helper functions for token management
const getStoredToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth_token');
  }
  return null;
};

const getStoredUser = (): AuthUser | null => {
  if (typeof window !== 'undefined') {
    const storedUser = localStorage.getItem('auth_user');
    return storedUser ? JSON.parse(storedUser) : null;
  }
  return null;
};

const setStoredAuth = (token: string, user: AuthUser) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('auth_user', JSON.stringify(user));
  }
};

const clearStoredAuth = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
  }
};

// Async thunks
export const loginUser = createAsyncThunk<
  LoginResponse,
  LoginRequest,
  { rejectValue: string }
>(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authApi.login(credentials);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

export const registerUser = createAsyncThunk<
  RegisterResponse,
  RegisterRequest,
  { rejectValue: string }
>(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authApi.register(userData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Registration failed');
    }
  }
);

export const verifyToken = createAsyncThunk<
  AuthUser,
  void,
  { rejectValue: string }
>(
  'auth/verifyToken',
  async (_, { rejectWithValue }) => {
    try {
      const token = getStoredToken();
      if (!token) {
        throw new Error('No token found');
      }
      
      const user = await authApi.verifyToken(token);
      return user;
    } catch (error: any) {
      clearStoredAuth();
      return rejectWithValue(error.message || 'Token verification failed');
    }
  }
);

export const requestPasswordReset = createAsyncThunk<
  { message: string },
  string,
  { rejectValue: string }
>(
  'auth/requestPasswordReset',
  async (email, { rejectWithValue }) => {
    try {
      const response = await authApi.requestPasswordReset(email);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Password reset request failed');
    }
  }
);

export const logoutUser = createAsyncThunk<
  void,
  void,
  { rejectValue: string }
>(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authApi.logout();
      clearStoredAuth();
    } catch (error: any) {
      // Even if logout fails on server, clear local storage
      clearStoredAuth();
      return rejectWithValue(error.message || 'Logout failed');
    }
  }
);

// Initial state
const initialState: AuthState = {
  user: getStoredUser(),
  token: getStoredToken(),
  isAuthenticated: !!getStoredToken(),
  loading: false,
  loginLoading: false,
  registerLoading: false,
  error: null,
  loginError: null,
  registerError: null,
};

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearLoginError: (state) => {
      state.loginError = null;
    },
    clearRegisterError: (state) => {
      state.registerError = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    updateUserProfile: (state, action) => {
      if (state.user && state.token) {
        const updatedUser = { ...state.user, ...action.payload };
        state.user = updatedUser;
        setStoredAuth(state.token, updatedUser);
      }
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.loginLoading = true;
        state.loginError = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.user = action.payload.user || null;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.loginError = null;
        
        if (action.payload.user) {
          setStoredAuth(action.payload.token, action.payload.user);
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginLoading = false;
        state.loginError = action.payload || 'Login failed';
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      });

    // Register
    builder
      .addCase(registerUser.pending, (state) => {
        state.registerLoading = true;
        state.registerError = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.registerLoading = false;
        state.user = action.payload.user || null;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.registerError = null;
        
        if (action.payload.user) {
          setStoredAuth(action.payload.token, action.payload.user);
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerLoading = false;
        state.registerError = action.payload || 'Registration failed';
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      });

    // Verify Token
    builder
      .addCase(verifyToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyToken.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.token = action.payload.token || state.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(verifyToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Token verification failed';
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      });

    // Password Reset
    builder
      .addCase(requestPasswordReset.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(requestPasswordReset.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(requestPasswordReset.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Password reset request failed';
      });

    // Logout
    builder
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = null;
        state.loginError = null;
        state.registerError = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        // Even if logout fails, clear the auth state
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = action.payload || 'Logout failed';
      });
  },
});

export const { clearLoginError, clearRegisterError, clearError, updateUserProfile } = authSlice.actions;
export default authSlice.reducer; 