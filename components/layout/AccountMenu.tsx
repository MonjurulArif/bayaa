"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

import { logout } from "@/store/slices/authSlice";
import Link from "next/link";

export default function AccountMenu() {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="rounded-md border px-4 py-2 bg-black text-white cursor-pointer"
      >
        Account ▼
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 rounded-lg border bg-white text-black shadow-lg z-50">
          <Link href="/profile" className="block px-4 py-3 hover:bg-gray-100">
            Profile
          </Link>
          <Link href="/orders" className="block px-4 py-3 hover:bg-gray-100">
            Orders
          </Link>

          <Link href="/wishlist" className="block px-4 py-3 hover:bg-gray-100">
            Wishlist
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-left cursor-pointer px-4 py-3 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
