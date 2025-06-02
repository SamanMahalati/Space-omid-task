import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User, UserState } from '@/types/user';

// Define the initial state
const initialState: UserState = {
  users: [],
  userDetails: null,
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  totalUsers: 0,
  creatingUser: false,
  updatingUser: false,
  deletingUser: false,
  crudError: null,
};

// Create axios instance with base URL
const api = axios.create({
  baseURL: 'https://reqres.in/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'x-api-key': 'reqres-free-v1'
  }
});

// Add request interceptor to add delay and ensure API key
api.interceptors.request.use(async (config) => {
  // Add a small delay to prevent rate limiting
  await new Promise(resolve => setTimeout(resolve, 100));
  
  // Ensure API key is set for each request
  if (config.headers) {
    config.headers['x-api-key'] = 'reqres-free-v1';
  }
  
  return config;
});

// Define the async thunks for fetching data
export const fetchUsers = createAsyncThunk(
  'user/fetchUsers',
  async (page: number = 1) => {
    try {
      const response = await api.get(`/users?page=${page}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }
);

export const fetchUserDetails = createAsyncThunk(
  'user/fetchUserDetails',
  async (userId: string) => {
    try {
      // Convert userId to number and ensure it's valid
      const numericId = parseInt(userId, 10);
      if (isNaN(numericId)) {
        throw new Error('Invalid user ID');
      }

      const response = await api.get(`/users/${numericId}`);
      
      // Check if we have valid data
      if (!response.data || !response.data.data) {
        throw new Error('User not found');
      }

      return response.data.data;
    } catch (error) {
      console.error('Error fetching user details:', error);
      throw error;
    }
  }
);

// Define async thunks for CRUD operations
export const createUser = createAsyncThunk(
  'user/createUser',
  async (userData: { name: string; job: string }) => {
    try {
      const response = await api.post('/users', userData);
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ userId, userData }: { userId: number; userData: { name: string; job: string } }) => {
    try {
      const response = await api.put(`/users/${userId}`, userData);
      return response.data;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }
);

export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (userId: number) => {
    try {
      await api.delete(`/users/${userId}`);
      return userId;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }
);

// Create the user slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchUsers
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data;
        state.currentPage = action.payload.page;
        state.totalPages = action.payload.total_pages;
        state.totalUsers = action.payload.total;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      })
      // Handle fetchUserDetails
      .addCase(fetchUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetails = action.payload;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch user details';
      })
      // Handle createUser
      .addCase(createUser.pending, (state) => {
        state.creatingUser = true;
        state.crudError = null;
      })
      .addCase(createUser.fulfilled, (state) => {
        state.creatingUser = false;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.creatingUser = false;
        state.crudError = action.error.message || 'Failed to create user';
      })
      // Handle updateUser
      .addCase(updateUser.pending, (state) => {
        state.updatingUser = true;
        state.crudError = null;
      })
      .addCase(updateUser.fulfilled, (state) => {
        state.updatingUser = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.updatingUser = false;
        state.crudError = action.error.message || 'Failed to update user';
      })
      // Handle deleteUser
      .addCase(deleteUser.pending, (state) => {
        state.deletingUser = true;
        state.crudError = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.deletingUser = false;
        state.users = state.users.filter(user => user.id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.deletingUser = false;
        state.crudError = action.error.message || 'Failed to delete user';
      });
  },
});

export const { setCurrentPage } = userSlice.actions;
export default userSlice.reducer; 