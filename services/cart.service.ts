import { apiFetch } from "./api";

export interface CartItem {
  productId: number;
  name: string;
  slug: string;
  price: number;
  thumbnail: string;
  quantity: number;
  stock: number;
}

export async function getCart(): Promise<CartItem[]> {
  const response = await apiFetch("/cart");

  if (!response.ok) {
    throw new Error("Failed to load cart");
  }

  return response.json();
}

export async function addToCart(productId: number, quantity: 1) {
  const response = await apiFetch(
    `/cart?productId=${productId}&quantity=${quantity}`,
    {
      method: "POST",
    },
  );

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
}

export async function updateCartItem(productId: number, quantity: number) {
  const response = await apiFetch(`/cart/${productId}?quantity=${quantity}`, {
    method: "PUT",
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
}

export async function removeCartItem(productId: number) {
  const response = await apiFetch(`/cart/${productId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return true;
}

export async function clearCart() {
  const response = await apiFetch("/cart", {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return true;
}
