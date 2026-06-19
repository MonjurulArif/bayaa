"use client";

import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/store/slices/cartSlice";
import { RootState } from "@/store/store";

export default function TestPage() {
  const dispatch = useDispatch();

  const items = useSelector((state: RootState) => state.cart.items);

  return (
    <div className="p-8">
      <button
        onClick={() => dispatch(addToCart({ id: 1, name: "Wireless Earbuds" }))}
        className="bg-black text-white px-4 py-2"
      >
        Add Item
      </button>
      <p className="mt-4">Cart items: {items.length}</p>
    </div>
  );
}
