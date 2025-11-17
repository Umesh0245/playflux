// MySQL User Interface (no Mongoose needed)
export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  avatar?: string;
  role: 'user' | 'admin';
  created_at?: Date;
  updated_at?: Date;
}

// Type for creating a new user (without id and timestamps)
export interface IUserCreate {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  role?: 'user' | 'admin';
}

// Type for user response (without password)
export interface IUserResponse {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'admin';
  created_at?: Date;
  updated_at?: Date;
}
