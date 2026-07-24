"use client";

import { useDispatch } from "react-redux";
import { addToCart } from "@/store/slices/cartSlice";
import { Product } from "@/types/products";

interface Props {
  product: Product;
}

export default function AddToCartButton({ product }: Props) {
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => dispatch(addToCart(product))}
      className="mt-6 rounded-lg bg-pink-600 px-6 py-3 text-white cursor-pointer"
    >
      Add To Cart
    </button>
  );
}
