"use client";

import Link from "next/link";
import { ShoppingCart, User, Heart } from "lucide-react";
import SearchBar from "../common/SearchBar";

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function Header() {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const wishListItems = useSelector((state: RootState) => state.wishlist.items);

  const auth = useSelector((state: RootState) => state.auth);

  return (
    <header className="sticky top-0 bg-white border-b z-50">
      <div className="max-w-7xl mx-auto p-4 flex items-center gap-4">
        <h1 className="font-bold text-xl text-black">Bayaa</h1>
        <div className="flex-1">
          <SearchBar></SearchBar>
        </div>
        <Link href="/wishlist" className="relative">
          <Heart size={24} className="text-black cursor-pointer"></Heart>
          {wishListItems.length > 0 && (
            <span className="absolute -right-2 -top-2 rounded-full bg-red-500 px-2 text-xs text-white">
              {wishListItems.length}
            </span>
          )}
        </Link>
        <Link href="/cart" className="relative">
          <ShoppingCart
            size={24}
            className="cursor-pointer text-black"
          ></ShoppingCart>
          {cartItems.length > 0 && (
            <span className="absolute -right-2 -top-2 rounded-full bg-red-500 px-2 text-xs text-white">
              {cartItems.length}
            </span>
          )}
        </Link>

        {auth.isAuthenticated ? (
          <Link href="/profile" className="font-medium text-black">
            Account
          </Link>
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
