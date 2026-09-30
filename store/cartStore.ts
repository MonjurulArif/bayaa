import { create } from "zustand";
import { persist } from "zustand/middleware";
import toast from "react-hot-toast";
import type { CartItem } from "@/services/cart.service";

interface CartStore {
  items: CartItem[];

  setCart: (items: CartItem[]) => void;

  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],

      setCart: (items) => set({ items }),

      clearCart: () =>
        set({
          items: [],
        }),
    }),
    {
      name: "cart-storage",
    },
  ),
);
