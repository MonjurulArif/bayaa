import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types/products";
import toast from "react-hot-toast";

interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  items: CartItem[];

  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],

      addToCart: (product) => {
        if (product.stock <= 0) {
          toast.error("Out of stock");
          return;
        }

        let added = false;

        set((state) => {
          const existingItem = state.items.find(
            (item) => item.id === product.id,
          );

          if (existingItem) {
            if (existingItem.quantity >= product.stock) {
              toast.error(`Only ${product.stock} item(s) available in stock.`);
              return state;
            }

            added = true;

            return {
              items: state.items.map((item) =>
                item.id === product.id
                  ? {
                      ...item,
                      quantity: item.quantity + 1,
                    }
                  : item,
              ),
            };
          }

          added = true;

          return {
            items: [
              ...state.items,
              {
                ...product,
                quantity: 1,
              },
            ],
          };
        });
        if (added) {
          toast.success(`${product.name} is added to cart!`);
        }
      },
      increaseQuantity: (id) => {
        set((state) => {
          const item = state.items.find((item) => item.id === id);

          if (!item) return state;

          if (item.quantity >= item.stock) {
            toast.error(`Only ${item.stock} item(s) available in stock.`);

            return state;
          }

          return {
            items: state.items.map((item) =>
              item.id === id
                ? {
                    ...item,
                    quantity: item.quantity + 1,
                  }
                : item,
            ),
          };
        });
      },
      decreaseQuantity: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id && item.quantity > 1
              ? {
                  ...item,
                  quantity: item.quantity - 1,
                }
              : item,
          ),
        })),

      removeFromCart: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

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
