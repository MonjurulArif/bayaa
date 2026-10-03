import { apiFetch } from "./api";

export interface CreateOrderPayload {
  items: {
    productId: number;
    quantity: number;
  }[];

  customerName: string;
  mobile: string;
  email?: string;

  division: string;
  district: string;
  area: string;
  address: string;

  paymentMethod: string;
}

export interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
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

export interface AdminOrder {
  id: number;
  orderNumber: string;
  customerName: string;
  mobile: string;
  totalAmount: number;
  status: string;
  createdAt: string;
}

export async function createOrder(payload: CreateOrderPayload) {
  const response = await apiFetch(`/orders`, {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message);
  }

  return response.json();
}

export async function getOrders(): Promise<Order[]> {
  const response = await apiFetch(`/orders`);

  if (!response.ok) {
    throw new Error("Failed to load orders");
  }

  return response.json();
}

export async function getOrder(id: number): Promise<Order> {
  const response = await apiFetch(`/orders/${id}`);

  if (!response.ok) {
    throw new Error("Failed to load order");
  }

  return response.json();
}

export async function getAdminOrder(id: number): Promise<Order> {
  const response = await apiFetch(`/orders/admin/${id}`);

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
}

export async function getAllOrders(): Promise<AdminOrder[]> {
  const response = await apiFetch("/orders/admin");

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
}

export async function updateOrderStatus(orderId: number, status: string) {
  const response = await apiFetch(`/orders/${orderId}/status`, {
    method: "PUT",
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
}
