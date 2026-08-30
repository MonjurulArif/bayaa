"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { registerUser } from "@/services/auth.service";

export default function SignupPage() {
  const router = useRouter();
  const [emailOrMobile, setEmailOrMobile] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async () => {
    if (!emailOrMobile || !password) {
      toast.error("Please enter email or mobile number and password");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Password and confirm password does not match");
      return;
    }

    try {
      const data = await registerUser(emailOrMobile, password);

      toast.success("Account Created Successfully");

      router.push("/login");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Registration failed",
      );
    }
  };
  return (
    <div className="mx-auto mt-10 max-w-md rounded-lg border p-6">
      <h1 className="mb-6 text-center text-3xl font-bold">Create Account</h1>

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

      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="mb-4 w-full rounded border p-3"
      />

      <button
        onClick={handleSignup}
        className="w-full rounded bg-black py-3 text-white cursor-pointer"
      >
        Create Account
      </button>

      <div className="text-center">
        <Link href="/login" className="text-blue-600">
          Already have an account?
        </Link>
      </div>
    </div>
  );
}
