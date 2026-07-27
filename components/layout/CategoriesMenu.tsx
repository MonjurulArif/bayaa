"use client";

import Link from "next/link";
import { useState } from "react";

const CategoriesMenu = () => {
  const [open, setOpen] = useState(false);

  const categories = [
    "electronics",
    "fashion",
    "books",
    "sports",
    "cars",
    "tools",
  ];

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="font-medium text-black">
        Categories ▼
      </button>

      {open && (
        <div
          className="
            absolute
            left-0
            mt-2
            w-48
            rounded-lg
            border
            bg-white
            text-black
            shadow-lg
            z-50
          "
        >
          {categories.map((category) => (
            <Link
              key={category}
              href={`/category/${category}`}
              className="
                block
                px-4
                py-3
                capitalize
                hover:bg-gray-100
              "
            >
              {category}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoriesMenu;
