"use client";

import { addToCart, getCart } from "@/services/cart.service";
import { useCartStore } from "@/store/cartStore";
import { Product } from "@/types/products";
import toast from "react-hot-toast";

interface Props {
  product: Product;
}

export default function AddToCartButton({ product }: Props) {
  const setCart = useCartStore((state) => state.setCart);

  const handleAddToCart = async () => {
    try {
      await addToCart(product.id, 1);

      const cart = await getCart();

      setCart(cart);

      toast.success("Added to cart");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
      );
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={product.stock === 0}
      className={`rounded px-4 py-2 text-white ${
        product.stock === 0
          ? "cursor-not-allowed bg-gray-400"
          : "cursor-pointer bg-black"
      }`}
    >
      {product.stock === 0 ? "Out of Stock" : "Add To Cart"}
    </button>
  );
}
