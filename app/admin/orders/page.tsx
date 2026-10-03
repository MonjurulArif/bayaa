"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  AdminOrder,
  getAllOrders,
  updateOrderStatus,
} from "@/services/order.service";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await getAllOrders();

        console.log("API Orders:", data);

        setOrders(data);
      } catch (error) {
        console.error("Failed to load orders:", error);
      }
    };

    loadOrders();
  }, []);

  useEffect(() => {
    console.log("STATE ORDERS:", orders);
  }, [orders]);

  return (
    <div className="mx-auto max-w-7xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Orders</h1>
      <p className="mb-4 text-gray-600">Total Orders: {orders.length}</p>
      <table className="w-full border bg-white text-gray-900">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-3 text-left">Order #</th>
            <th className="border p-3 text-left">Customer</th>
            <th className="border p-3 text-left">Mobile</th>
            <th className="border p-3 text-left">Total</th>
            <th className="border p-3 text-left">Status</th>
            <th className="border p-3 text-left">Date</th>
            <th className="border p-3 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan={7} className="border p-6 text-center text-gray-500">
                No orders found.
              </td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr key={order.id} className="text-gray-900 hover:bg-gray-50">
                <td className="border p-3">{order.orderNumber}</td>

                <td className="border p-3">{order.customerName}</td>

                <td className="border p-3">{order.mobile}</td>

                <td className="border p-3">৳{order.totalAmount}</td>

                <td className="border p-3">
                  <select
                    value={order.status}
                    onChange={async (e) => {
                      try {
                        await updateOrderStatus(order.id, e.target.value);

                        setOrders((currentOrders) =>
                          currentOrders.map((currentOrder) =>
                            currentOrder.id === order.id
                              ? {
                                  ...currentOrder,
                                  status: e.target.value,
                                }
                              : currentOrder,
                          ),
                        );
                      } catch (error) {
                        console.error("Failed to update order status:", error);
                      }
                    }}
                    className="rounded border px-2 py-1 text-gray-900"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>

                <td className="border p-3">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>

                <td className="border p-3">
                  <Link
                    href={`/admin/orders/${order.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
