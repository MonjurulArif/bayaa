import { apiFetch } from "@/services/api";

export interface WishlistProduct {
  id: number;
  name: string;
  slug: string;
  price: number;
  thumbnail: string;
  rating: number;
}

export async function getWishlist(): Promise<WishlistProduct[]> {
  const response = await apiFetch("/wishlist");

  if (!response.ok) {
    throw new Error("Failed to load wishlist");
  }

  return response.json();
}

export async function addWishlist(productId: number) {
  const response = await apiFetch("/wishlist", {
    method: "POST",
    body: JSON.stringify({ productId }),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message);
  }

  return response.json();
}

export async function removeWishlist(productId: number) {
  const response = await apiFetch(`/wishlist/${productId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message);
  }

  return true;
}
