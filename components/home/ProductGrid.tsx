"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/types/products";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

interface ProductGridProps {
  initialProducts: Product[];
  initialPage: number;
  totalProducts: number;

  search?: string;
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  inStock?: boolean;
  sort?: string;

  pageSize?: number;
}

export default function ProductGrid({
  initialProducts,
  initialPage,
  totalProducts,

  search,
  categoryId,
  minPrice,
  maxPrice,
  rating,
  inStock,
  sort,

  pageSize = 20,
}: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const [page, setPage] = useState(initialPage);

  const [loading, setLoading] = useState(false);

  const hasMore = products.length < totalProducts;

  async function loadMore() {
    if (loading || !hasMore) {
      return;
    }

    setLoading(true);

    try {
      const params = new URLSearchParams();

      if (search) {
        params.set("search", search);
      }

      if (categoryId !== undefined) {
        params.set("categoryId", categoryId.toString());
      }

      if (minPrice !== undefined) {
        params.set("minPrice", minPrice.toString());
      }

      if (maxPrice !== undefined) {
        params.set("maxPrice", maxPrice.toString());
      }

      if (rating !== undefined) {
        params.set("rating", rating.toString());
      }

      if (inStock !== undefined) {
        params.set("inStock", inStock.toString());
      }

      if (sort) {
        params.set("sort", sort);
      }

      params.set("page", (page + 1).toString());

      params.set("pageSize", pageSize.toString());

      const url = `${API_URL}/products?${params.toString()}`;

      console.log("Loading:", url);

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to load products: ${response.status}`);
      }

      const result = await response.json();

      console.log("API result:", result);
      console.log("New products:", result.products);

      // Append new products
      setProducts((currentProducts) => {
        const updatedProducts = [...currentProducts, ...result.products];

        console.log("Updated products:", updatedProducts);

        return updatedProducts;
      });

      setPage(page + 1);
    } catch (error) {
      console.error("Failed to load more products", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto max-w-7xl p-4">
      <h2 className="mb-4 text-2xl font-bold">Recommended Products</h2>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {hasMore && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={loadMore}
            disabled={loading}
            className="rounded-lg border px-6 py-3 font-medium hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}

      {!hasMore && products.length > 0 && (
        <p className="mt-8 text-center text-gray-500">All products loaded</p>
      )}
    </section>
  );
}
