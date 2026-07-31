"use client";

import { useCartStore } from "@/store/cartStore";
import { Product } from "@/types/products";

interface Props {
  product: Product;
}

export default function AddToCartButton({ product }: Props) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <button
      onClick={() => addToCart(product)}
      className="mt-6 rounded-lg bg-pink-600 px-6 py-3 text-white cursor-pointer"
    >
      Add To Cart
    </button>
  );
}
