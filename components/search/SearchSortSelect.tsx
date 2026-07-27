"use client";

import { useRouter } from "next/navigation";

export default function SearchSortSelect({
  query,
  sort,
}: {
  query: string;
  sort?: string;
}) {
  const router = useRouter();

  return (
    <select
      defaultValue={sort || ""}
      onChange={(e) => {
        router.push(`/search?query=${query}&sort=${e.target.value}`);
      }}
      className="border rounded p-2"
    >
      <option value="">Default</option>

      <option value="price-asc">Price: Low to High</option>

      <option value="price-desc">Price: High to Low</option>

      <option value="name">Name A-Z</option>
    </select>
  );
}
