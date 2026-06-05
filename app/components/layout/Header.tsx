export default function Header() {
  return (
    <header className="sticky top-0 bg-white border-b z-50">
      <div className="max-w-7xl mx-auto p-4 flex items-center gap-4">
        <h1 className="font-bold text-xl">Bayaa</h1>
        <input
          type="text"
          placeholder="Search Products..."
          id=""
          className="flex-1 border rounded-lg px-4 py-2"
        />
        <button>🛒</button>
      </div>
    </header>
  );
}
