import Link from "next/link";
import { getCategories } from "@/services/category.service";

export default async function CategoryGrid() {
  const categories = await getCategories();

  return (
    <div className="grid grid-cols-2 gap-4 p-4 md:grid-cols-4">
      <h2 className="mb-4 text-2xl font-bold">Categories</h2>
      <div className="grid grid-cols-3 gap-2 md:grid-cols-3">
        {categories.map((category) => (
          <Link key={category.id} href={`/category/${category.slug}`}>
            <div className="rounded-lg border p-3 text-center hover:bg-gray-100">
              {category.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
