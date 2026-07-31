import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types/products";

interface OrderItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
  status: string;
}

interface OrderStore {
  orders: Order[];

  addOrder: (order: Order) => void;
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set) => ({
      orders: [],
      addOrder: (order: Order) =>
        set((state) => ({ orders: [...state.orders, order] })),
    }),
    { name: "order-storage" },
  ),
);
