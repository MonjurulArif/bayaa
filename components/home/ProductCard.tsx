"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";

import { Product } from "@/types/products";
import {
  addWishlist,
  removeWishlist,
  getWishlist,
} from "@/services/wishlist.service";

import toast from "react-hot-toast";
import AddToCartButton from "../product/AddToCartButton";
import { useAuthStore } from "@/store/authStore";
import { useWishlistStore } from "@/store/wishlistStore";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  const wishlishItems = useWishlistStore((state) => state.items);

  const addToWishlistItem = useWishlistStore((state) => state.addWishlistItem);

  const removeFromWishlist = useWishlistStore(
    (state) => state.removeWishlistItem,
  );

  const isWishlisted = wishlishItems.some((item) => item.id === product.id);

  const toggleWishlist = async () => {
    if (!isLoggedIn) {
      toast.error("Please login to add to wishlist");
      return;
    }
    try {
      if (isWishlisted) {
        await removeFromWishlist(product.id);

        removeWishlist(product.id);

        toast.success("Removed from wishlist");
      } else {
        await addWishlist(product.id);

        addToWishlistItem({
          id: product.id,
          name: product.name,
          slug: product.slug,
          price: product.price,
          thumbnail: product.thumbnail,
          rating: product.rating,
        });

        toast.success("Added to wishlist");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to add to wishlist");
    }
  };

  return (
    <div className="border rounded-lg p-3 hover:shadow-lg">
      <div className="flex justify-end">
        <button onClick={toggleWishlist}>
          <Heart size={22} fill={isWishlisted ? "currentColor" : "none"} />
        </button>
      </div>

      <Link href={`/products/${product.slug}`}>
        <div className="overflow-hidden rounded-lg border bg-white hover:shadow-lg transition cursor-pointer">
          <Image
            src={product.thumbnail}
            alt={product.name}
            width={300}
            height={300}
            className="h-48 w-full object-cover"
          ></Image>
          <div className="p-3">
            <h3 className="line-clamp-2 text-sm text-black">{product.name}</h3>

            <div className="mt-2">
              <span className="font-bold text-pink-600">৳ {product.price}</span>

              {/* {product.originalPrice && (
              <span className="ml-2 text-sm text-gray-400 line-through">
                ৳ {product.originalPrice}
              </span>
            )} */}
            </div>

            <div className="mt-1 text-sm text-yellow-500">
              ⭐ {product.rating} ({product.reviews})
            </div>
            <div className="mt-1 text-sm">
              {product.stock > 0 ? (
                <span className="text-green-600">
                  In Stock ({product.stock})
                </span>
              ) : (
                <span className="text-red-600">Out of Stock</span>
              )}
            </div>
          </div>
        </div>
      </Link>
      <AddToCartButton product={product} />
    </div>
  );
}
