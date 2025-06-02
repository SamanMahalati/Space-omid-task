export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface UserState {
  users: User[];
  userDetails: User | null;
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  totalUsers: number;
  creatingUser: boolean;
  updatingUser: boolean;
  deletingUser: boolean;
  crudError: string | null;
} 