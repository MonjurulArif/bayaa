import { apiFetch } from "./api";

export interface Review {
  id: number;
  userId: number;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateReviewPayload {
  rating: number;
  comment: string;
}

export interface UpdateReviewPayload {
  rating: number;
  comment: string;
}

export async function getProductReviews(productId: number): Promise<Review[]> {
  const response = await apiFetch(`/Reviews?productId=${productId}`);

  if (!response.ok) {
    const message = await response.text();

    throw new Error(message || "Failed to load reviews");
  }

  return response.json();
}

export async function createReview(
  productId: number,
  data: CreateReviewPayload,
) {
  const response = await apiFetch(`/Reviews?productId=${productId}`, {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const message = await response.text();

    throw new Error(message || "Failed to create review");
  }

  return response.json();
}

export async function updateReview(
  reviewId: number,
  data: UpdateReviewPayload,
) {
  const response = await apiFetch(`/Reviews/${reviewId}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const message = await response.text();

    throw new Error(message || "Failed to update review");
  }

  return response.json();
}

export async function deleteReview(reviewId: number) {
  const response = await apiFetch(`/Reviews/${reviewId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const message = await response.text();

    throw new Error(message || "Failed to delete review");
  }

  return true;
}
