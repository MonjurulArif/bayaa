"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

import AuthGuard from "@/components/auth/AuthGuard";

export default function OrdersPage() {
  const orders = useSelector((state: RootState) => state.order.orders);

  return (
    <AuthGuard>
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">My Orders</h1>

        {orders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="border rounded-lg p-4">
                <div className="mb-3">
                  <p>
                    <strong>Order ID:</strong> {order.id}
                  </p>

                  <p>
                    <strong>Date:</strong> {order.date}
                  </p>

                  <p>
                    <strong>Status:</strong> {order.status}
                  </p>
                </div>

                <div className="space-y-2">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <span>
                        {item.name}
                        {" × "}
                        {item.quantity}
                      </span>

                      <span>৳{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <hr className="my-3" />

                <div className="font-bold">Total: ৳{order.total}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AuthGuard>
  );
}
