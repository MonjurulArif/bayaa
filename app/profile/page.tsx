"use client";

import { useDispatch, UseDispatch } from "react-redux";
import { logout } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";

import AuthGuard from "@/components/auth/AuthGuard";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  return (
    <AuthGuard>
      <div className="mx-auto max-w-3xl p-6">
        <h1 className="mb-8 text-3xl font-bold">My Profile</h1>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="First Name"
            className="w-full rounded border p-3"
          />

          <input
            type="text"
            placeholder="Last Name"
            className="w-full rounded border p-3"
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full rounded border p-3"
          />

          <input
            type="text"
            placeholder="Phone Number"
            className="w-full rounded border p-3"
          />
          <select className="w-full rounded border p-3">
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <input type="date" className="w-full rounded border p-3" />
          <button
            className="
            rounded
            bg-black
            px-6
            py-3
            text-white cursor-pointer
          "
          >
            Save Profile
          </button>
          <button
            onClick={handleLogout}
            className="mt-4 rounded bg-red-500 px-6 py-3 text-white cursor-pointer"
          >
            Logout
          </button>
          <Link
            href="/orders"
            className="inline-block text-blue-600 cursor-pointer"
          >
            My Orders
          </Link>
        </div>
      </div>
    </AuthGuard>
  );
}
