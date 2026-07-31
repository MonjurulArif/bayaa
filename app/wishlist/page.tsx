"use client";

import Link from "next/link";
import { useWishlistStore } from "@/store/wishlistStore";

export default function WishlistPage() {
  const items = useWishlistStore((state) => state.items);

  const removeFromWishlist = useWishlistStore(
    (state) => state.removeFromWishlist,
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>

      {items.length === 0 ? (
        <p>No products in wishlist.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {items.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
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
                  removeFromWishlist(product.id);
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
