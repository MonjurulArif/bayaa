"use client";

import { useRouter } from "next/navigation";

export default function SortSelect({
  slug,
  sort,
}: {
  slug: string;
  sort?: string;
}) {
  const router = useRouter();

  return (
    <select
      defaultValue={sort || ""}
      onChange={(e) => {
        router.push(`/category/${slug}?sort=${e.target.value}`);
      }}
      className="border rounded p-2"
    >
      <option value="">Default</option>

      <option value="price-asc">Price: Low to High</option>

      <option value="price-desc">Price: High to Low</option>

      <option value="name-asc">Name A-Z</option>

      <option value="name-desc">Name Z-A</option>
    </select>
  );
}
