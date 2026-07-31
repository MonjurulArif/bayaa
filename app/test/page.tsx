"use client";

import { useCartStore } from "@/store/cartStore";

export default function TestPage() {
  const addToCart = useCartStore((state) => state.addToCart);
  const items = useCartStore((state) => state.items);

  return (
    <div className="p-8">
      <button
        onClick={() =>
          addToCart({
            id: 1,
            name: "Wireless Earbuds",
            price: 1500,
            category: "electronics",
            description: "High quality wireless earbuds",
            thumbnail: "https://example.com/earbuds.jpg",
          })
        }
        className="bg-black text-white px-4 py-2"
      >
        Add Item
      </button>
      <p className="mt-4">Cart items: {items.length}</p>
    </div>
  );
}
