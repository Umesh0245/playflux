import { create } from "zustand";
import { persist } from "zustand/middleware";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export interface Address {
  id: string;
  label: string; // e.g., "Home", "Work", "Office"
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  bio?: string;
  dateOfBirth?: string;
  addresses?: Address[];
}

interface Order {
  id: string;
  date: string;
  total: number;
  status: "delivered" | "shipped" | "processing";
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }>;
}

interface UserStore {
  user: User | null;
  orders: Order[];
  token: string | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  addOrder: (order: Order) => void;
  updateUser: (userData: Partial<User>) => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  updateAddress: (id: string, address: Partial<Address>) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      orders: [],
      token: null,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || 'Login failed');
          }

          set({
            user: {
              id: data.data.user.id,
              name: data.data.user.name,
              email: data.data.user.email,
              avatar: data.data.user.avatar,
            },
            token: data.data.token,
            isLoading: false,
          });
        } catch (error: any) {
          set({ 
            error: error.message || 'Login failed', 
            isLoading: false 
          });
          throw error;
        }
      },

      signup: async (name: string, email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch(`${API_URL}/auth/signup`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || 'Signup failed');
          }

          set({
            user: {
              id: data.data.user.id,
              name: data.data.user.name,
              email: data.data.user.email,
              avatar: data.data.user.avatar,
            },
            token: data.data.token,
            isLoading: false,
          });
        } catch (error: any) {
          set({ 
            error: error.message || 'Signup failed', 
            isLoading: false 
          });
          throw error;
        }
      },

      logout: () => {
        set({ user: null, token: null });
      },

      addOrder: (order: Order) => {
        set((state) => ({
          orders: [order, ...state.orders],
        }));
      },

      updateUser: (userData: Partial<User>) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        }));
      },

      addAddress: (address: Omit<Address, 'id'>) => {
        set((state) => {
          if (!state.user) return state;
          const newAddress: Address = {
            ...address,
            id: Date.now().toString(),
          };
          // If this is the first address or marked as default, make it default
          const addresses = state.user.addresses || [];
          if (newAddress.isDefault || addresses.length === 0) {
            addresses.forEach(addr => addr.isDefault = false);
            newAddress.isDefault = true;
          }
          return {
            user: {
              ...state.user,
              addresses: [...addresses, newAddress],
            },
          };
        });
      },

      updateAddress: (id: string, addressUpdate: Partial<Address>) => {
        set((state) => {
          if (!state.user || !state.user.addresses) return state;
          const addresses = state.user.addresses.map(addr => 
            addr.id === id ? { ...addr, ...addressUpdate } : addr
          );
          return {
            user: {
              ...state.user,
              addresses,
            },
          };
        });
      },

      deleteAddress: (id: string) => {
        set((state) => {
          if (!state.user || !state.user.addresses) return state;
          const addresses = state.user.addresses.filter(addr => addr.id !== id);
          // If we deleted the default address, make the first one default
          if (addresses.length > 0 && !addresses.some(addr => addr.isDefault)) {
            addresses[0].isDefault = true;
          }
          return {
            user: {
              ...state.user,
              addresses,
            },
          };
        });
      },

      setDefaultAddress: (id: string) => {
        set((state) => {
          if (!state.user || !state.user.addresses) return state;
          const addresses = state.user.addresses.map(addr => ({
            ...addr,
            isDefault: addr.id === id,
          }));
          return {
            user: {
              ...state.user,
              addresses,
            },
          };
        });
      },
    }),
    {
      name: "playflux-user",
    }
  )
);
