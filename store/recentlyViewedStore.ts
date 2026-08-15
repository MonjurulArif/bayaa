import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types/products";

interface RecentlyViewedStore {
  items: Product[];

  addProduct: (product: Product) => void;
}

export const useRecentlyViewedStore = create<RecentlyViewedStore>()(
  persist(
    (set, get) => ({
      items: [],

      addProduct: (product) => {
        const existing = get().items.filter((item) => item.id !== product.id);

        set({
          items: [product, ...existing].slice(0, 8),
        });
      },
    }),
    {
      name: "recently-viewed-storage",
    },
  ),
);
