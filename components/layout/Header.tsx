"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, Heart } from "lucide-react";

import SearchBar from "../common/SearchBar";
import AccountMenu from "./AccountMenu";
import CategoriesMenu from "./CategoriesMenu";

import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";

import { getCart } from "@/services/cart.service";
import { getWishlist } from "@/services/wishlist.service";

export default function Header() {
  const auth = useAuthStore((state) => state.isLoggedIn);

  const cartItems = useCartStore((state) => state.items);
  const setCart = useCartStore((state) => state.setCart);

  const wishListItems = useWishlistStore((state) => state.items);
  const setWishlist = useWishlistStore((state) => state.setWishlist);

  useEffect(() => {
    if (!auth) {
      setCart([]);
      setWishlist([]);
      return;
    }

    const loadData = async () => {
      try {
        const [cartData, wishlistData] = await Promise.all([
          getCart(),
          getWishlist(),
        ]);

        console.log("HEADER - Cart from API:", cartData);

        setCart(cartData);

        setWishlist(wishlistData);
      } catch (error) {
        console.log(error);
      }
    };

    loadData();
  }, [auth, setCart, setWishlist]);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center gap-4 p-4">
        <Link href="/">
          <h1 className="text-xl font-bold text-black">Bayaa</h1>
        </Link>

        <CategoriesMenu />

        <div className="flex-1">
          <SearchBar />
        </div>

        <Link href="/wishlist" className="relative">
          <Heart size={24} className="cursor-pointer text-black" />

          {wishListItems.length > 0 && (
            <span className="absolute -right-2 -top-2 rounded-full bg-red-500 px-2 text-xs text-white">
              {wishListItems.length}
            </span>
          )}
        </Link>

        <Link href="/cart" className="relative">
          <ShoppingCart size={24} className="cursor-pointer text-black" />

          {cartCount > 0 && (
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              {cartCount}
            </span>
          )}
        </Link>

        {auth ? (
          <AccountMenu />
        ) : (
          <Link
            href="/login"
            className="rounded-md bg-black px-4 py-2 text-white"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
}
