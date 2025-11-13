import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "@/components/Cart";
import { mockProducts } from "./mock-data";

interface CartStore {
  items: CartItem[];
  addItem: (productId: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      
      addItem: (productId: string) => {
        const product = mockProducts.find((p) => p.id === productId);
        if (!product) return;

        set((state) => {
          const existing = state.items.find((item) => item.id === productId);
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.id === productId
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }
          return {
            items: [...state.items, { ...product, quantity: 1 }],
          };
        });
      },
      
      updateQuantity: (id: string, quantity: number) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        }));
      },
      
      removeItem: (id: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },
      
      clearCart: () => {
        set({ items: [] });
      },
    }),
    {
      name: "playflux-cart",
    }
  )
);
