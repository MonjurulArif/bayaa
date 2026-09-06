"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AuthGuard from "@/components/auth/AuthGuard";
import { getOrders } from "@/services/order.service";

interface OrderItem {
  productId: number;
  productName: string;
  unitPrice: number;
  quantity: number;
}

interface Order {
  id: number;
  orderNumber: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  items: OrderItem[];
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await getOrders();
        setOrders(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadOrders();
  }, []);

  if (loading) {
    return (
      <AuthGuard>
        <div className="p-6">Loading orders...</div>
      </AuthGuard>
    );
  }

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
                    <strong>Order No: </strong> {order.orderNumber}
                  </p>

                  <p>
                    <strong>Date:</strong> <strong>Date:</strong>{" "}
                    {`${String(new Date(order.createdAt).getDate()).padStart(2, "0")}-${new Date(
                      order.createdAt,
                    ).toLocaleString("en-US", { month: "short" })}-${new Date(
                      order.createdAt,
                    ).getFullYear()}`}
                  </p>

                  <p>
                    <strong>Status:</strong> {order.status}
                  </p>
                </div>

                <div className="space-y-2">
                  {order.items.map((item) => (
                    <div key={item.productId} className="flex justify-between">
                      <span>
                        {item.productName}
                        {" × "}
                        {item.quantity}
                      </span>

                      <span>৳{item.unitPrice * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <hr className="my-3" />

                <div className="font-bold">Total: ৳{order.totalAmount}</div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </AuthGuard>
  );
}
