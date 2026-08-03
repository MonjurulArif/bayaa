"use client";

import Link from "next/link";
import { useOrderStore } from "@/store/ordersStore";
import AuthGuard from "@/components/auth/AuthGuard";

export default function OrdersPage() {
  const { orders } = useOrderStore();

  return (
    <AuthGuard>
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">My Orders</h1>

        {orders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Link
                href={`/orders/${order.id}`}
                key={order.id}
                className="block border rounded-lg p-4 hover:bg-gray-50"
              >
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

                  <p>
                    <strong>Customer:</strong> {order.customerName}
                  </p>

                  <p>
                    <strong>Phone:</strong> {order.phone}
                  </p>

                  {order.email && (
                    <p>
                      <strong>Email:</strong> {order.email}
                    </p>
                  )}

                  <p>
                    <strong>Address:</strong> {order.area}, {order.district},{" "}
                    {order.division}
                  </p>

                  <p>
                    <strong>Details:</strong> {order.address}
                  </p>

                  <p>
                    <strong>Payment:</strong> {order.paymentMethod}
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
              </Link>
            ))}
          </div>
        )}
      </div>
    </AuthGuard>
  );
}
