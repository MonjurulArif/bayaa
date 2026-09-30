"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import {
  getCart,
  updateCartItem,
  removeCartItem,
} from "@/services/cart.service";

export default function CartPage() {
  const items = useCartStore((state) => state.items);

  const setCart = useCartStore((state) => state.setCart);

  const handleQuantityChange = async (productId: number, quantity: number) => {
    try {
      await updateCartItem(productId, quantity);

      const cart = await getCart();

      setCart(cart);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveFromCart = async (productId: number) => {
    try {
      await removeCartItem(productId);

      const cart = await getCart();

      setCart(cart);
    } catch (error) {
      console.log(error);
    }
  };

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.productId}
                className="border rounded-lg p-4 flex gap-4"
              >
                <img
                  src={item.thumbnail}
                  alt={item.name}
                  className="w-24 h-24 rounded object-cover"
                />

                <div className="flex-1">
                  <h2 className="font-semibold">{item.name}</h2>

                  <p>৳{item.price}</p>

                  <div className="mt-3 flex gap-2 items-center">
                    <button
                      disabled={item.quantity <= 1}
                      onClick={() =>
                        handleQuantityChange(item.productId, item.quantity - 1)
                      }
                      className="px-3 py-1 border rounded cursor-pointer"
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        handleQuantityChange(item.productId, item.quantity + 1)
                      }
                      className="px-3 py-1 border rounded cursor-pointer"
                    >
                      +
                    </button>

                    <button
                      onClick={() => handleRemoveFromCart(item.productId)}
                      className="ml-4 text-red-500 cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 border-t pt-4">
            <h2 className="text-xl font-bold">Total: ৳{total}</h2>

            <Link
              href={"/checkout"}
              className="mt-4 inline-block rounded bg-black px-6 py-3 text-white"
            >
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
