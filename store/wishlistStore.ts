import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types/products";

interface WishlistStore {
  items: Product[];

  addToWishlist: (product: Product) => void;
  removeFromWishlist: (id: number) => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set) => ({
      items: [],

      addToWishlist: (product) =>
        set((state) => {
          const existing = state.items.find((item) => item.id === product.id);

          if (existing) return state;

          return { items: [...state.items, product] };
        }),

      removeFromWishlist: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
    }),
    {
      name: "wishlist-storage",
    }
  )
);
