export default function SignupPage() {
  return (
    <div className="mx-auto mt-10 max-w-md rounded-lg border p-6">
      <h1 className="mb-6 text-center text-3xl font-bold">Create Account</h1>

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

      <button className="w-full rounded bg-black py-3 text-white">
        Create Account
      </button>
    </div>
  );
}
