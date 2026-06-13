export default function CartPage() {
  return (
    <div className="mx-auto max-w-5xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Shopping Cart</h1>

      <div className="rounded-lg border p-4">
        <p>Wireless Earbuds</p>
        <p>৳1200</p>
      </div>

      <div className="mt-6">
        <button className="rounded-lg bg-pink-600 px-6 py-3 text-white">
          Checkout
        </button>
      </div>
    </div>
  );
}
