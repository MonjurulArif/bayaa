"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";

import AuthGuard from "@/components/auth/AuthGuard";

import { addOrder } from "@/store/slices/ordersSlice";
import { clearCart } from "@/store/slices/cartSlice";

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const cartItems = useSelector((state: RootState) => state.cart.items);

  const subTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const deliveryCharge = 70;

  const grandTotal = subTotal + deliveryCharge;

  const profile = useSelector((state: RootState) => state.profile);

  const [name, setName] = useState(
    `${profile.firstName} ${profile.lastName}`.trim(),
  );
  const [phone, setPhone] = useState(profile.phone || "");
  const [email, setEmail] = useState(profile.email || "");
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
  const [area, setArea] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const handlePlaceOrder = () => {
    if (!name || !phone || !division || !district || !area || !address) {
      alert("Please fill up all field ");
      return;
    }

    dispatch(
      addOrder({
        id: `ORD-${Date.now().toString()}`,
        date: new Date().toLocaleDateString(),
        items: cartItems,
        total: grandTotal,
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
                className="w-full border rounded p-3"
              />

              <input
                type="email"
                placeholder="Email (optional)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded p-3"
              />
              <select
                value={division}
                onChange={(e) => setDivision(e.target.value)}
                className="w-full border rounded p-3"
              >
                <option value="">Select Division</option>
                <option>Dhaka</option>
                <option>Chittagong</option>
                <option>Sylhet</option>
                <option>Rajshahi</option>
                <option>Khulna</option>
                <option>Barisal</option>
                <option>Rangpur</option>
                <option>Mymensingh</option>
              </select>
              <input
                type="text"
                placeholder="District"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full border rounded p-3"
              />

              <input
                type="text"
                placeholder="Area"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full border rounded p-3"
              />

              <textarea
                placeholder="House, Road, Area Details"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={4}
                className="w-full border rounded p-3"
              />
              <div className="space-y-2">
                <h3 className="font-semibold">Payment Method</h3>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={paymentMethod === "COD"}
                    onChange={() => setPaymentMethod("COD")}
                  />
                  Cash On Delivery
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={paymentMethod === "bkash"}
                    onChange={() => setPaymentMethod("bkash")}
                  />
                  bKash
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={paymentMethod === "nagad"}
                    onChange={() => setPaymentMethod("nagad")}
                  />
                  Nagad
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")}
                  />
                  Card
                </label>
              </div>
            </div>
          </div>

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
                <span>Subtotal: </span>
                <span>৳{subTotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span>৳{deliveryCharge}</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>৳{grandTotal}</span>
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
