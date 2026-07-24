"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (!query.trim()) return;

    router.push(`/search?query=${encodeURIComponent(query)}`);
  };

  return (
    <div className="relative w-1/2">
      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
      ></Search>
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
        className="w-full pl-11 pr-4 py-3 text-black rounded-full border "
      />
      <button
        onClick={handleSearch}
        className="absolute cursor-pointer text-black right-4 top-1/2 -translate-y-1/2"
      >
        Search
      </button>
    </div>
  );
}
