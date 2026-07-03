"use client";

import Link from "next/link";

import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/store/store";

import { removeFromWishlist } from "@/store/slices/wishlistSlice";

export default function WishlistPage() {
  const dispatch = useDispatch();

  const items = useSelector((state: RootState) => state.wishlist.items);

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
                  dispatch(removeFromWishlist(product.id));
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
