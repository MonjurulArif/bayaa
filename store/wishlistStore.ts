import { create } from "zustand";

export interface WishlistItem {
  id: number;
  name: string;
  slug: string;
  price: number;
  thumbnail: string;
  rating: number;
}

interface WishlistStore {
  items: WishlistItem[];

  setWishlist: (items: WishlistItem[]) => void;

  addWishlistItem: (item: WishlistItem) => void;

  removeWishlistItem: (productId: number) => void;

  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>((set) => ({
  items: [],

  setWishlist: (items) =>
    set({
      items,
    }),

  addWishlistItem: (item) =>
    set((state) => ({
      items: state.items.some((x) => x.id === item.id)
        ? state.items
        : [...state.items, item],
    })),

  removeWishlistItem: (productId) =>
    set((state) => ({
      items: state.items.filter((x) => x.id !== productId),
    })),

  clearWishlist: () =>
    set({
      items: [],
    }),
}));
