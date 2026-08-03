"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useOrderStore } from "@/store/ordersStore";

export default function OrderDetailsPage() {
  const params = useParams();

  const order = useOrderStore((state) =>
    state.orders.find((o) => o.id === params.id),
  );

  if (!order) {
    return (
      <div className="mx-auto max-w-4xl p-6">
        <h1 className="text-2xl font-bold">Order Not Found</h1>

        <Link href="/orders" className="mt-4 inline-block text-blue-600">
          Back to Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Order Details</h1>

      <div className="rounded-lg border p-6">
        <p>
          <strong>Order ID:</strong> {order.id}
        </p>

        <p>
          <strong>Date:</strong> {order.date}
        </p>

        <p>
          <strong>Status:</strong> {order.status}
        </p>

        <hr className="my-4" />

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

        <hr className="my-4" />

        <p>
          <strong>Division:</strong> {order.division}
        </p>

        <p>
          <strong>District:</strong> {order.district}
        </p>

        <p>
          <strong>Area:</strong> {order.area}
        </p>

        <p>
          <strong>Address:</strong> {order.address}
        </p>

        <p>
          <strong>Payment:</strong> {order.paymentMethod}
        </p>

        <hr className="my-4" />

        <h2 className="mb-3 text-xl font-semibold">Ordered Items</h2>

        {order.items.map((item) => (
          <div key={item.id} className="mb-2 flex justify-between">
            <span>
              {item.name} × {item.quantity}
            </span>

            <span>৳{item.price * item.quantity}</span>
          </div>
        ))}

        <hr className="my-4" />

        <div className="text-xl font-bold">Total: ৳{order.total}</div>
      </div>
    </div>
  );
}
