"use client";

import { useState, useMemo } from "react";
import { useReviewStore } from "@/store/reviewStore";
import toast from "react-hot-toast";

interface Props {
  productId: number;
}

export default function ProductReviews({ productId }: Props) {
  const allReviews = useReviewStore((state) => state.reviews);

  const reviews = useMemo(
    () => allReviews.filter((r) => r.productId === productId),
    [allReviews, productId],
  );

  const addReview = useReviewStore((state) => state.addReview);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (!comment.trim()) {
      toast.error("Please write a review");
      return;
    }

    addReview({
      productId,
      rating,
      comment,
    });

    setComment("");
    setRating(5);

    toast.success("Review submitted");
  };

  return (
    <div className="mt-12">
      <h2 className="mb-6 text-2xl font-bold">Reviews</h2>
      <div className="mb-6 rounded-lg border p-4">
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="mb-3 border rounded p-2"
        >
          <option value="5">5⭐</option>
          <option value="4">4⭐</option>
          <option value="3">3⭐</option>
          <option value="2">2⭐</option>
          <option value="1">1⭐</option>
        </select>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your review..."
          rows={4}
          className="w-full rounded border p-2"
        ></textarea>
        <button
          onClick={handleSubmit}
          className="mt-3 rounded bg-black px-4 py-2 text-white"
        >
          Submit Review
        </button>
      </div>
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="rounded border p-4">
            <div>{"⭐".repeat(review.rating)}</div>

            <p className="mt-2">{review.comment}</p>

            <p className="mt-2 text-sm text-gray-500">{review.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
