"use client";

import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

export default function SignupPage() {
  const [emailOrMobile, setEmailOrMobile] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    toast.success("Account Created");
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
        className="w-full rounded bg-black py-3 text-white"
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
