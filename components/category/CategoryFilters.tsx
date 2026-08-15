"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  slug: string;
}

export default function CategoryFilters({ slug }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set(key, value);
    router.push(`/category/${slug}?${params.toString()}`);
  };
  return (
    <div className="mb-6 rounded-lg border p-4">
      <h3 className="mb-3 font-semibold">Filters</h3>

      <div className="space-y-2">
        <h4 className="font-medium">Price</h4>

        <a onClick={() => updateFilter("price", "under1000")} className="block">
          Under ৳1000
        </a>

        <a
          onClick={() => updateFilter("price", "1000to2000")}
          className="block"
        >
          ৳1000 - ৳2000
        </a>

        <a onClick={() => updateFilter("price", "above2000")} className="block">
          Above ৳2000
        </a>
      </div>

      <div className="mt-4">
        <h4 className="font-medium">Rating</h4>

        <a onClick={() => updateFilter("rating", "4")} className="block">
          4★ & above
        </a>
        <a onClick={() => updateFilter("rating", "3")} className="block">
          3★ & above
        </a>
        <a onClick={() => updateFilter("rating", "2")} className="block">
          2★ & above
        </a>
        <a onClick={() => updateFilter("rating", "1")} className="block">
          1★ & above
        </a>
      </div>

      <div className="mt-4">
        <h4 className="font-medium">Stock</h4>

        <a onClick={() => updateFilter("stock", "true")} className="block">
          In Stock
        </a>
      </div>
      <button
        onClick={() => router.push(`/category/${slug}`)}
        className="mt-6 cursor-pointer rounded bg-gray-200 px-4 py-2 text-black"
      >
        Clear Filters
      </button>
    </div>
  );
}
