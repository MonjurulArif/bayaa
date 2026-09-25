"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { useAuthStore } from "@/store/authStore";

import {
  createReview,
  deleteReview,
  getProductReviews,
  updateReview,
  Review,
} from "@/services/review.service";

interface Props {
  productId: number;
}

export default function ProductReviews({ productId }: Props) {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const user = useAuthStore((state) => state.user);

  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const [submitting, setSubmitting] = useState(false);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editRating, setEditRating] = useState(5);
  const [editComment, setEditComment] = useState("");

  const loadReviews = async () => {
    try {
      setLoading(true);

      const data = await getProductReviews(productId);

      setReviews(data);
    } catch (error) {
      console.error("Failed to load reviews:", error);
      toast.error("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, [productId]);

  const hasReviewed = reviews.some((review) => review.userId === user?.id);

  const handleSubmit = async () => {
    if (!isLoggedIn) {
      toast.error("Please login to write a review");
      return;
    }

    if (!comment.trim()) {
      toast.error("Please write a comment");
      return;
    }

    try {
      setSubmitting(true);

      await createReview(productId, {
        rating,
        comment: comment.trim(),
      });

      setRating(5);
      setComment("");

      toast.success("Review submitted successfully");

      await loadReviews();
    } catch (error) {
      console.error("Failed to create review:", error);

      toast.error(
        error instanceof Error ? error.message : "Failed to submit review",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const startEditing = (review: Review) => {
    setEditingId(review.id);
    setEditRating(review.rating);
    setEditComment(review.comment);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditRating(5);
    setEditComment("");
  };

  const handleUpdate = async (reviewId: number) => {
    if (!editComment.trim()) {
      toast.error("Please write a comment");
      return;
    }

    try {
      setSubmitting(true);

      await updateReview(reviewId, {
        rating: editRating,
        comment: editComment.trim(),
      });

      toast.success("Review updated successfully");

      cancelEditing();

      await loadReviews();
    } catch (error) {
      console.error("Failed to update review:", error);

      toast.error(
        error instanceof Error ? error.message : "Failed to update review",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (reviewId: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this review?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteReview(reviewId);

      toast.success("Review deleted successfully");

      await loadReviews();
    } catch (error) {
      console.error("Failed to delete review:", error);

      toast.error(
        error instanceof Error ? error.message : "Failed to delete review",
      );
    }
  };

  return (
    <section className="mt-10 border-t pt-8">
      <h2 className="mb-6 text-2xl font-bold text-black">Customer Reviews</h2>

      {isLoggedIn && !hasReviewed ? (
        <div className="mb-8 rounded-lg border p-5">
          <h3 className="mb-4 text-lg font-semibold">Write a Review</h3>

          <label className="mb-2 block text-sm font-medium">Rating</label>

          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="mb-4 rounded border p-2"
            disabled={submitting}
          >
            <option value={5}>★★★★★ - 5</option>
            <option value={4}>★★★★☆ - 4</option>
            <option value={3}>★★★☆☆ - 3</option>
            <option value={2}>★★☆☆☆ - 2</option>
            <option value={1}>★☆☆☆☆ - 1</option>
          </select>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your review..."
            rows={4}
            disabled={submitting}
            className="mb-3 w-full rounded border p-3"
          />

          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className="rounded bg-black px-5 py-2 text-white disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      ) : isLoggedIn ? (
        <div className="mb-8 rounded-lg border p-5">
          <p className="text-green-600">
            You have already reviewed this product.
          </p>
        </div>
      ) : (
        <div className="mb-8 rounded-lg border p-5">
          <p className="text-gray-600">Please login to write a review.</p>
        </div>
      )}

      {loading ? (
        <p>Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p className="text-gray-600">
          No reviews yet. Be the first to review this product.
        </p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => {
            const isOwner = user?.id === review.userId;

            return (
              <div key={review.id} className="rounded-lg border p-5">
                {editingId === review.id ? (
                  <>
                    <select
                      value={editRating}
                      onChange={(e) => setEditRating(Number(e.target.value))}
                      className="mb-3 rounded border p-2"
                      disabled={submitting}
                    >
                      <option value={5}>★★★★★ - 5</option>
                      <option value={4}>★★★★☆ - 4</option>
                      <option value={3}>★★★☆☆ - 3</option>
                      <option value={2}>★★☆☆☆ - 2</option>
                      <option value={1}>★☆☆☆☆ - 1</option>
                    </select>

                    <textarea
                      value={editComment}
                      onChange={(e) => setEditComment(e.target.value)}
                      rows={4}
                      disabled={submitting}
                      className="mb-3 w-full rounded border p-3"
                    />

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleUpdate(review.id)}
                        disabled={submitting}
                        className="rounded bg-black px-4 py-2 text-white"
                      >
                        {submitting ? "Updating..." : "Update"}
                      </button>

                      <button
                        type="button"
                        onClick={cancelEditing}
                        disabled={submitting}
                        className="rounded border px-4 py-2"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">{review.userName}</p>

                        <p className="text-yellow-500">
                          {"★".repeat(review.rating)}
                          {"☆".repeat(5 - review.rating)}
                        </p>
                      </div>

                      {isOwner && (
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => startEditing(review)}
                            className="rounded border px-3 py-1 text-sm"
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(review.id)}
                            className="rounded bg-red-500 px-3 py-1 text-sm text-white"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>

                    <p className="mt-3 text-gray-700">{review.comment}</p>

                    <p className="mt-2 text-sm text-gray-500">
                      {new Date(
                        review.updatedAt ?? review.createdAt,
                      ).toLocaleDateString()}
                    </p>
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
