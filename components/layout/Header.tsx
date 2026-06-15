import Link from "next/link";
import { ShoppingCart, User } from "lucide-react";
import SearchBar from "../common/SearchBar";

export default function Header() {
  return (
    <header className="sticky top-0 bg-white border-b z-50">
      <div className="max-w-7xl mx-auto p-4 flex items-center gap-4">
        <h1 className="font-bold text-xl text-black">Bayaa</h1>
        <div className="flex-1">
          <SearchBar></SearchBar>
        </div>
        <Link href="/cart">
          <ShoppingCart
            size={24}
            className="cursor-pointer text-black"
          ></ShoppingCart>
        </Link>
        <Link
          href="/login"
          className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white"
        >
          Sign In
        </Link>
      </div>
    </header>
  );
}
