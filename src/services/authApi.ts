import { LoginRequest, RegisterRequest, LoginResponse, RegisterResponse, AuthUser } from '@/types/auth';

// Mock API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock users database
const mockUsers: AuthUser[] = [
  {
    id: 1,
    email: 'admin@teamhub.com',
    first_name: 'Admin',
    last_name: 'User',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
  },
  {
    id: 2,
    email: 'john@teamhub.com',
    first_name: 'John',
    last_name: 'Doe',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
  }
];

// Mock passwords (in real app, these would be hashed)
const mockPasswords: Record<string, string> = {
  'admin@teamhub.com': 'admin123',
  'john@teamhub.com': 'password123'
};

// Generate mock JWT token
const generateMockToken = (userId: number): string => {
  return `mock_jwt_token_${userId}_${Date.now()}`;
};

export const authApi = {
  // Login user
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    await delay(1000); // Simulate network delay

    const { email, password } = credentials;
    
    // Check if user exists
    const user = mockUsers.find(u => u.email === email);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Check password
    if (mockPasswords[email] !== password) {
      throw new Error('Invalid email or password');
    }

    // Generate token
    const token = generateMockToken(user.id);

    return {
      token,
      user: { ...user, token }
    };
  },

  // Register user
  register: async (userData: RegisterRequest): Promise<RegisterResponse> => {
    await delay(1200); // Simulate network delay

    const { email, password, first_name, last_name } = userData;

    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Create new user
    const newUser: AuthUser = {
      id: mockUsers.length + 1,
      email,
      first_name,
      last_name,
      avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&sig=${Date.now()}`
    };

    // Add to mock database
    mockUsers.push(newUser);
    mockPasswords[email] = password;

    // Generate token
    const token = generateMockToken(newUser.id);

    return {
      id: newUser.id,
      token,
      user: { ...newUser, token }
    };
  },

  // Verify token
  verifyToken: async (token: string): Promise<AuthUser> => {
    await delay(500); // Simulate network delay

    // Extract user ID from mock token
    const tokenParts = token.split('_');
    if (tokenParts.length < 4 || tokenParts[0] !== 'mock' || tokenParts[1] !== 'jwt' || tokenParts[2] !== 'token') {
      throw new Error('Invalid token');
    }

    const userId = parseInt(tokenParts[3]);
    const user = mockUsers.find(u => u.id === userId);
    
    if (!user) {
      throw new Error('User not found');
    }

    return { ...user, token };
  },

  // Request password reset
  requestPasswordReset: async (email: string): Promise<{ message: string }> => {
    await delay(800); // Simulate network delay

    const user = mockUsers.find(u => u.email === email);
    if (!user) {
      throw new Error('No user found with this email address');
    }

    // In a real app, this would send an email
    return {
      message: 'Password reset instructions have been sent to your email address'
    };
  },

  // Logout (client-side only for mock)
  logout: async (): Promise<void> => {
    await delay(300); // Simulate network delay
    // In a real app, this might invalidate the token on the server
    return;
  }
}; 