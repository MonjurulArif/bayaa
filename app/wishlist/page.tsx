"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  getWishlist,
  removeWishlist,
  WishlistProduct,
} from "@/services/wishlist.service";
import toast from "react-hot-toast";
import { useWishlistStore } from "@/store/wishlistStore";

export default function WishlistPage() {
  const [items, setItems] = useState<WishlistProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const setWishlist = useWishlistStore((state) => state.setWishlist);

  const removeWishlistItem = useWishlistStore(
    (state) => state.removeWishlistItem,
  );

  useEffect(() => {
    const loadWishlist = async () => {
      try {
        const data = await getWishlist();

        setItems(data);
        setWishlist(data);
      } catch (error) {
        console.error("Failed to load wishlist:", error);
        toast.error("Failed to load wishlist");
      } finally {
        setLoading(false);
      }
    };

    loadWishlist();
  }, [setWishlist]);

  const handleRemove = async (productId: number) => {
    try {
      await removeWishlist(productId);

      setItems((prev) => prev.filter((item) => item.id !== productId));

      removeWishlistItem(productId);

      toast.success("Removed from wishlist");
    } catch (error) {
      console.error("Failed to remove wishlist item:", error);
      toast.error("Failed to remove item");
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl p-6">
        <h1 className="mb-6 text-3xl font-bold">My Wishlist</h1>

        <p>Loading wishlist...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>

      {items.length === 0 ? (
        <p>No products in wishlist.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {items.map((product) => (
            <Link key={product.id} href={`/products/${product.slug}`}>
              <div className="border rounded-lg p-3 hover:shadow-lg">
                <img
                  src={product.thumbnail}
                  alt={product.name}
                  className="
                    h-40
                    w-full
                    object-cover
                    rounded
                  "
                />

                <h3 className="mt-2 font-medium">{product.name}</h3>

                <p className="font-bold">৳{product.price}</p>
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleRemove(product.id);
                }}
                className="mt-3
                    w-full
                    rounded
                    bg-red-500
                    py-2
                    text-white cursor-pointer"
              >
                Remove
              </button>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
