"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthGuard from "@/components/auth/AuthGuard";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import toast from "react-hot-toast";
import { createOrder } from "@/services/order.service";

export default function CheckoutPage() {
  const router = useRouter();

  const cart = useCartStore((state) => state.items);

  const user = useAuthStore((state) => state.user);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
  const [area, setArea] = useState("");
  const [address, setAddress] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("");
  const [placingOrder, setPlacingOrder] = useState(false);

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const deliveryCharge = 70;

  const total = subtotal + deliveryCharge;

  useEffect(() => {
    if (!user) return;

    setName(`${user.firstName ?? ""} ${user.lastName ?? ""}`.trim());

    setPhone(user.mobile ?? "");
    setEmail(user.email ?? "");

    setDivision(user.division ?? "");
    setDistrict(user.district ?? "");
    setArea(user.area ?? "");
    setAddress(user.address ?? "");
  }, [user]);

  const clearCart = useCartStore((state) => state.clearCart);

  const handlePlaceOrder = async () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    if (
      !name.trim() ||
      !phone.trim() ||
      !division.trim() ||
      !district.trim() ||
      !area.trim() ||
      !address.trim()
    ) {
      toast.error("Please fill up all delivery information");
      return;
    }

    if (!paymentMethod) {
      toast.error("Please select a payment method");
      return;
    }

    try {
      setPlacingOrder(true);
      const order = await createOrder({
        items: cart.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),

        customerName: name.trim(),
        mobile: phone.trim(),
        email: email.trim() || undefined,

        division: division.trim(),
        district: district.trim(),
        area: area.trim(),
        address: address.trim(),

        paymentMethod,
      });

      clearCart();

      toast.success("Order placed successfully");

      router.push(`/orders/${order.id}`);
    } catch (error) {
      console.error("Order creation failed: ", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to place order",
      );
    } finally {
      setPlacingOrder(false);
    }
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
                    checked={paymentMethod === "Bkash"}
                    onChange={() => setPaymentMethod("Bkash")}
                  />
                  bKash
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={paymentMethod === "Nagad"}
                    onChange={() => setPaymentMethod("Nagad")}
                  />
                  Nagad
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={paymentMethod === "Rocket"}
                    onChange={() => setPaymentMethod("Rocket")}
                  />
                  Rocket
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={paymentMethod === "Card"}
                    onChange={() => setPaymentMethod("Card")}
                  />
                  Card
                </label>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="border rounded-lg p-4">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span>৳{item.price * item.quantity}</span>
                </div>
              ))}
              <hr className="my-4" />
              <div>
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>৳{subtotal}</span>
                </div>

                <div className="flex justify-between">
                  <span>Delivery Charge</span>
                  <span>৳{deliveryCharge}</span>
                </div>

                <hr className="my-3" />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>৳{total}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={handlePlaceOrder}
                disabled={placingOrder || cart.length === 0}
                className="mt-6 w-full rounded bg-black py-3 text-white cursor-pointer disabled:cursor-not-allowed disabled:opacity-70"
              >
                {placingOrder ? "Placing Order..." : "Place Order"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
