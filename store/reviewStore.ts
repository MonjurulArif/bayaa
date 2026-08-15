import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Review {
  id: string;
  productId: number;
  rating: number;
  comment: string;
  date: string;
}

interface ReviewStore {
  reviews: Review[];

  addReview: (review: Omit<Review, "id" | "date">) => void;
}

export const useReviewStore = create<ReviewStore>()(
  persist(
    (set) => ({
      reviews: [],

      addReview: (review) =>
        set((state) => ({
          reviews: [
            {
              ...review,
              id: Date.now().toString(),
              date: new Date().toLocaleDateString(),
            },
            ...state.reviews,
          ],
        })),
    }),
    {
      name: "review-storage",
    },
  ),
);
