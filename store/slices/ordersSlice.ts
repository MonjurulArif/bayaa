import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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

interface OrderState {
  orders: Order[];
}

const initialState: OrderState = {
  orders: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.unshift(action.payload);
    },
  },
});

export const { addOrder } = orderSlice.actions;

export default orderSlice.reducer;
