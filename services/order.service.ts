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

export async function createOrder(payload: CreateOrderPayload) {
  const response = await apiFetch("/orders", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message);
  }

  return response.json();
}

export async function getOrders() {
  const response = await apiFetch("/orders");

  if (!response.ok) {
    throw new Error("Failed to load orders");
  }

  return response.json();
}

export async function getOrder(id: number) {
  const response = await apiFetch(`/orders/${id}`);

  if (!response.ok) {
    throw new Error("Failed to load order");
  }

  return response.json();
}
