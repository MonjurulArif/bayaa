"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

import AuthGuard from "@/components/auth/AuthGuard";

import { addOrder } from "@/store/slices/ordersSlice";
import { clearCart } from "@/store/slices/cartSlice";

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const cartItems = useSelector((state: RootState) => state.cart.items);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");

  const handlePlaceOrder = () => {
    if (!name || !phone || !address || !city) {
      alert("Please fill up all field ");
      return;
    }

    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    dispatch(
      addOrder({
        id: Date.now().toString(),
        date: new Date().toLocaleDateString(),
        items: cartItems,
        total,
        status: "pending",
      }),
    );

    dispatch(clearCart());

    router.push("/orders");
  };

  return (
    <AuthGuard>
      <div className="mx-auto max-w-6xl p-6">
        <h1 className="mb-8 text-3xl font-bold">Checkout</h1>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Delivery Info */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Delivery Information</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded border p-3"
              />
              <input
                type="text"
                placeholder="Mobile Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded border p-3"
              />
              <textarea
                placeholder="Delivery Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={4}
                className="w-full rounded border p-3"
              />
              <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full border rounded p-3"
              />
            </div>
          </div>
          {/* Order Summery */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="border rounded-lg p-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span>৳{item.price * item.quantity}</span>
                </div>
              ))}
              <hr className="my-4" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total: </span>
                <span>৳{total}</span>
              </div>
              <button
                onClick={handlePlaceOrder}
                className="mt-6 w-full rounded bg-black py-3 text-white cursor-pointer"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
