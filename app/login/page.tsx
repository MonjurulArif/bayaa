"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { loginUser } from "@/services/auth.service";

export default function LoginPage() {
  const login = useAuthStore((state) => state.login);
  const router = useRouter();

  const [emailOrMobile, setEmailOrMobile] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const data = await loginUser(emailOrMobile, password);

      login(data.token, data.user);

      toast.success("Login successful");

      router.push("/");
    } catch (error) {
      console.log(error);
      toast.error(error instanceof Error ? error.message : "Login failed");
    }
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
        type="button"
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
