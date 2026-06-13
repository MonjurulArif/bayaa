import Link from "next/link";

const categories = ["electronics", "fashion", "phones", "beauty"];

export default function CategoryGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 p-4 md:grid-cols-4">
      {categories.map((category) => (
        <Link key={category} href={`/category/${category}`}>
          <div className="rounded-lg border p-6 text-center hover:bg-gray-100">
            {category}
          </div>
        </Link>
      ))}
    </div>
  );
}
