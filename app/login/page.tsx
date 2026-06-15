import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="mx-auto mt-10 max-w-md rounded-lg border p-6">
      <h1 className="mb-6 text-center text-3xl font-bold">Login</h1>

      <input
        type="text"
        placeholder="Email or Mobile Number"
        className="mb-4 w-full rounded border p-3"
      />

      <input
        type="password"
        placeholder="Password"
        className="mb-4 w-full rounded border p-3"
      />

      <button className="w-full rounded bg-black py-3 text-white">Login</button>

      <p className="mt-4 text-center text-sm">
        Don't have an account?{" "}
        <Link href="/signup" className="font-semibold text-blue-600">
          Sign Up
        </Link>
      </p>
    </div>
  );
}
