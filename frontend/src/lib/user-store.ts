import { create } from "zustand";
import { persist } from "zustand/middleware";

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
  login: (email: string, password: string) => void;
  signup: (name: string, email: string, password: string) => void;
  logout: () => void;
  addOrder: (order: Order) => void;
  updateUser: (userData: Partial<User>) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      orders: [],

      login: (email: string, password: string) => {
        // Mock login - in real app, this would call an API
        set({
          user: {
            id: "1",
            name: email.split("@")[0],
            email,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
          },
        });
      },

      signup: (name: string, email: string, password: string) => {
        // Mock signup - in real app, this would call an API
        set({
          user: {
            id: "1",
            name,
            email,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
          },
        });
      },

      logout: () => {
        set({ user: null });
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
    }),
    {
      name: "playflux-user",
    }
  )
);
