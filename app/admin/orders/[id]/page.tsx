"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { getAdminOrder, updateOrderStatus } from "@/services/order.service";

interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
}

interface Order {
  id: number;
  orderNumber: string;

  customerName: string;
  mobile: string;
  email: string;

  division: string;
  district: string;
  area: string;
  address: string;

  paymentMethod: string;
  paymentStatus: string;

  subtotal: number;
  deliveryCharge: number;
  totalAmount: number;

  status: string;
  createdAt: string;

  items: OrderItem[];
}

export default function AdminOrderDetailsPage() {
  const params = useParams();

  const orderId = Number(params.id);

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const loadOrder = async () => {
    try {
      setLoading(true);

      const data = await getAdminOrder(orderId);

      setOrder(data);
    } catch (error) {
      console.error(error);

      toast.error(
        error instanceof Error ? error.message : "Failed to load order",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!Number.isNaN(orderId)) {
      loadOrder();
    }
  }, [orderId]);

  const handleStatusChange = async (newStatus: string) => {
    if (!order) {
      toast.error("Order not found");
      return;
    }

    try {
      setUpdatingStatus(true);

      await updateOrderStatus(order.id, newStatus);

      setOrder((currentOrder) =>
        currentOrder ? { ...currentOrder, status: newStatus } : currentOrder,
      );

      toast.success("Order status updated successfully");
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update order status",
      );
    } finally {
      setUpdatingStatus(false);
    }
  };

  if (loading) {
    return <div className="mx-auto max-w-6xl p-6">Loading order...</div>;
  }

  if (!order) {
    return (
      <div className="mx-auto max-w-6xl p-6">
        <p>Order not found.</p>
        <Link href="/admin/orders">
          <button className="mt-3 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
            Back to Orders
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Link
            href="/admin/orders"
            className="mb-2 inline-block text-sm text-gray-600 hover:text-black"
          >
            ← Back to Orders
          </Link>

          <h1 className="text-3xl font-bold">Order {order.orderNumber}</h1>

          <p className="mt-1 text-sm text-gray-500">
            Placed on {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Order Status</label>

          <select
            value={order.status}
            onChange={(e) => setOrder({ ...order, status: e.target.value })}
            disabled={updatingStatus}
            className="rounded border bg-white px-3 py-2 text-gray-900"
          >
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <button
            type="button"
            onClick={() => handleStatusChange(order.status)}
            disabled={updatingStatus}
            className="ml-2 rounded bg-black px-4 py-2 text-white hover:bg-gray-800 disabled:opacity-50"
          >
            {updatingStatus ? "Updating..." : "Update"}
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 text-gray-900">
        {/* Customer Information */}
        <div className="rounded-lg border bg-white p-5 text-gray-900">
          <h2 className="mb-4 text-xl font-semibold">Customer Information</h2>

          <div className="space-y-2 text-sm">
            <p>
              <span className="font-medium">Name:</span> {order.customerName}
            </p>

            <p>
              <span className="font-medium">Mobile:</span> {order.mobile}
            </p>

            {order.email && (
              <p>
                <span className="font-medium">Email:</span> {order.email}
              </p>
            )}
          </div>
        </div>

        {/* Delivery Address */}
        <div className="rounded-lg border bg-white p-5 text-gray-900">
          <h2 className="mb-4 text-xl font-semibold">Delivery Address</h2>

          <div className="space-y-2 text-sm">
            <p>{order.address}</p>
            <p>{order.area}</p>
            <p>{order.district}</p>
            <p>{order.division}</p>
          </div>
        </div>

        {/* Payment */}
        <div className="rounded-lg border bg-white p-5 text-gray-900">
          <h2 className="mb-4 text-xl font-semibold">Payment Information</h2>

          <div className="space-y-2 text-sm">
            <p>
              <span className="font-medium">Method:</span> {order.paymentMethod}
            </p>

            <p>
              <span className="font-medium">Payment Status:</span>{" "}
              {order.paymentStatus}
            </p>
          </div>
        </div>

        {/* Order Summary */}
        <div className="rounded-lg border bg-white p-5 text-gray-900">
          <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>৳{order.subtotal}</span>
            </div>

            <div className="flex justify-between">
              <span>Delivery Charge</span>
              <span>৳{order.deliveryCharge}</span>
            </div>

            <div className="flex justify-between border-t pt-2 text-base font-bold">
              <span>Total</span>
              <span>৳{order.totalAmount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="mt-6 rounded-lg border bg-white p-5 text-gray-900">
        <div className="border-b p-5">
          <h2 className="text-xl font-semibold">Order Items</h2>
        </div>

        {order.items.length === 0 ? (
          <p className="p-5 text-gray-500">No order items found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full bg-white text-left text-gray-900">
              <thead className="bg-gray-100 text-gray-900">
                <tr>
                  <th className="p-4">Product</th>

                  <th className="p-4 text-center">Quantity</th>

                  <th className="p-4 text-right">Unit Price</th>

                  <th className="p-4 text-right">Total</th>
                </tr>
              </thead>

              <tbody className="text-gray-900">
                {order.items.map((item) => (
                  <tr key={item.id} className="border-t text-gray-900">
                    <td className="p-4">
                      <p className="font-medium">{item.productName}</p>

                      <p className="text-xs text-gray-500">
                        Product ID: {item.productId}
                      </p>
                    </td>

                    <td className="p-4 text-center">{item.quantity}</td>

                    <td className="p-4 text-right">৳{item.unitPrice}</td>

                    <td className="p-4 text-right font-medium">
                      ৳{(item.unitPrice * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
