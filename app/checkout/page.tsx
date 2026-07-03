"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

import AuthGuard from "@/components/auth/AuthGuard";

export default function CheckoutPage() {
  const items = useSelector((state: RootState) => state.cart.items);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <AuthGuard>
      <div className="mx-auto max-w-6xl p-6">
        <h1 className="mb-8 text-3xl font-bold">Checkout</h1>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Receiver Name"
              className="w-full rounded border p-3"
            />
            <textarea
              placeholder="Delivery Address"
              rows={4}
              className="w-full rounded border p-3"
            />
            <input
              type="text"
              placeholder="Order Note (Optiona)"
              className="w-full rounded border p-3"
            />
            <button className="w-full rounded bg-black py-3 text-white cursor-pointer">
              Place Order
            </button>
          </div>

          <div>
            <h2 className="mb-4 text-xl fond-bold">Order Summery</h2>
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between border-b pb-3"
                >
                  <div>
                    <p>{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <div>৳{item.price * item.quantity}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 border-t pt-4">
              <span>Total: </span>
              <span>৳{total}</span>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
