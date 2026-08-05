"use client";

import { useCartStore } from "@/store/cartStore";
import { Product } from "@/types/products";
import toast from "react-hot-toast";

interface Props {
  product: Product;
}

export default function AddToCartButton({ product }: Props) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <button
      onClick={() => addToCart(product)}
      className={`rounded px-4 py-2 text-white ${
        product.stock === 0
          ? "cursor-not-allowed bg-gray-400"
          : "bg-black cursor-pointer"
      }`}
    >
      {product.stock === 0 ? "Out of Stock" : "Add To Cart"}
    </button>
  );
}
