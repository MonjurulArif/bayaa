"use client";

import { Heart } from "lucide-react";
import { useWishlistStore } from "@/store/wishlistStore";
import { Product } from "@/types/products";

interface Props {
  product: Product;
}

export default function WishlistButton({ product }: Props) {
  const wishListItems = useWishlistStore((state) => state.items);
  const removeFromWishlist = useWishlistStore(
    (state) => state.removeFromWishlist,
  );
  const addToWishlist = useWishlistStore((state) => state.addToWishlist);

  const isWishlisted = wishListItems.some((items) => items.id === product.id);

  const handleWishList = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <button
      onClick={handleWishList}
      className="flex items-center gap-2 rounded border px-4 py-2 cursor-pointer"
    >
      <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
      {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
    </button>
  );
}
