"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import AuthGuard from "@/components/auth/AuthGuard";
import { getOrder } from "@/services/order.service";

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

export default function OrderDetailsPage() {
  const params = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const data = await getOrder(Number(params.id));
        setOrder(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadOrder();
  }, [params.id]);

  if (loading) {
    return (
      <AuthGuard>
        <div className="mx-auto max-w-4xl p-6">
          <h1 className="text-2xl font-bold">Loading order...</h1>
        </div>
      </AuthGuard>
    );
  }

  if (!order) {
    return (
      <AuthGuard>
        <div className="mx-auto max-w-4xl p-6">
          <h1 className="text-2xl font-bold">Order Not Found</h1>

          <Link href="/orders" className="mt-4 inline-block text-blue-600">
            Back to Orders
          </Link>
        </div>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <div className="mx-auto max-w-4xl p-6">
        <h1 className="mb-6 text-3xl font-bold">Order Details</h1>

        <div className="rounded-lg border p-6">
          <p>
            <strong>Order ID:</strong> #{order.id}
          </p>
          <p>
            <strong>Order No: </strong> {order.orderNumber}
          </p>

          <p>
            <strong>Date:</strong>{" "}
            {`${String(new Date(order.createdAt).getDate()).padStart(2, "0")}-${new Date(
              order.createdAt,
            ).toLocaleString("en-US", { month: "short" })}-${new Date(
              order.createdAt,
            ).getFullYear()}`}
          </p>

          <p>
            <strong>Status:</strong> {order.status}
          </p>

          <hr className="my-4" />

          <h2 className="mb-3 text-xl font-semibold">Ordered Items</h2>

          {order.items.map((item) => (
            <div key={item.productId} className="mb-2 flex justify-between">
              <span>
                {item.productName} × {item.quantity}
              </span>

              <span className="ml-3">৳{item.unitPrice * item.quantity}</span>
            </div>
          ))}

          <hr className="my-4" />

          <div className="text-xl font-bold">Total: ৳{order.totalAmount}</div>
        </div>
      </div>
    </AuthGuard>
  );
}
