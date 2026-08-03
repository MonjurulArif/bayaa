"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginPage() {
  const login = useAuthStore((state) => state.login);
  const router = useRouter();

  const [emailOrMobile, setEmailOrMobile] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!emailOrMobile || !password) {
      toast.error("Please enter email or mobile number and password");
      return;
    }

    login({
      emailOrMobile,

      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      gender: "",
      birthDate: "",

      division: "",
      district: "",
      area: "",
      address: "",
    });

    router.push("/");
  };

  return (
    <div className="mx-auto mt-10 max-w-md rounded-lg border p-6">
      <h1 className="mb-6 text-center text-3xl font-bold">Login</h1>

      <input
        type="text"
        placeholder="Email or Mobile Number"
        value={emailOrMobile}
        onChange={(e) => setEmailOrMobile(e.target.value)}
        className="mb-4 w-full rounded border p-3"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-4 w-full rounded border p-3"
      />

      <button
        onClick={handleLogin}
        className="w-full rounded bg-black py-3 text-white cursor-pointer"
      >
        Login
      </button>

      <p className="mt-4 text-center text-sm">
        Don't have an account?{" "}
        <Link
          href="/signup"
          className="font-semibold text-blue-600 cursor-pointer"
        >
          Create Account
        </Link>
      </p>
    </div>
  );
}
