"use client";

import { Heart } from "lucide-react";

import { useDispatch, useSelector } from "react-redux";

import { Product } from "@/types/product";
import { RootState } from "@/store/store";

import {
  addToWishlist,
  removeFromWishlist,
} from "@/store/slices/wishlistSlice";

interface Props {
  product: Product;
}

export default function WishlistButton({ product }: Props) {
  const dispatch = useDispatch();

  const wishListItems = useSelector((state: RootState) => state.wishlist.items);

  const isWishlisted = wishListItems.some((items) => items.id === product.id);

  const handleWishList = () => {
    if (isWishlisted) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
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
