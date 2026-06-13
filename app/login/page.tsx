export default function LoginPage() {
  return (
    <div className="mx-auto max-w-md p-6">
      <h1 className="mb-6 text-3xl font-bold">Login</h1>

      <input
        type="email"
        placeholder="Email"
        className="mb-4 w-full rounded border p-3"
      />

      <input
        type="password"
        placeholder="Password"
        className="mb-4 w-full rounded border p-3"
      />

      <button className="w-full rounded bg-black py-3 text-white">Login</button>
    </div>
  );
}
