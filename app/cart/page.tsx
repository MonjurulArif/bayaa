"use client";

import { useSelector, UseSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function CartPage() {
  const items = useSelector((state: RootState) => state.cart.items);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {items.map((item: any) => (
            <div
              key={item.id}
              className="
                border
                rounded-lg
                p-4
                flex
                gap-4
                items-center
              "
            >
              <img
                src={item.thumbnail}
                alt={item.name}
                className="w-24 h-24 object-cover rounded"
              />

              <div>
                <h2 className="font-semibold">{item.name}</h2>

                <p>৳{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
