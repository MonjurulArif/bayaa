"use client";

import ProductCard from "./ProductCard";
import { useRecentlyViewedStore } from "@/store/recentlyViewedStore";

export default function RecentlyViewed() {
  const products = useRecentlyViewedStore((state) => state.items);

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="mt-12">
      <h2 className="mb-6 text-2xl font-bold">Recently Viewed</h2>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
