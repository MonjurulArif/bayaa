import AuthGuard from "@/components/auth/AuthGuard";

export default function OrdersPage() {
  return (
    <AuthGuard>
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">My Orders</h1>

        <div className="border rounded p-4">
          <p className="font-semibold">Order #1001</p>

          <p>Status: Processing</p>

          <p>Total: ৳1999</p>
        </div>
      </div>
    </AuthGuard>
  );
}
