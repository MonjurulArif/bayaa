"use client";

import { useEffect } from "react";
import { Product } from "@/types/products";
import { useRecentlyViewedStore } from "@/store/recentlyViewedStore";

interface Props {
  product: Product;
}

export default function TrackRecentlyViewed({ product }: Props) {
  const addProduct = useRecentlyViewedStore((state) => state.addProduct);

  useEffect(() => {
    addProduct(product);
  }, [product, addProduct]);

  return null;
}
