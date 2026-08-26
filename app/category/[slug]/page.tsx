import ProductCard from "@/components/home/ProductCard";
import SortSelect from "@/components/category/SortSelect";
import CategoryFilters from "@/components/category/CategoryFilters";

import { getCategoryBySlug } from "@/services/category.service";
import { getProducts } from "@/services/product.service";

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    sort?: string;
    price?: string;
    rating?: string;
    stock?: string;
    page?: string;
  }>;
}) {
  const { slug } = await params;
  const { sort, price, rating, stock, page } = await searchParams;

  const category = await getCategoryBySlug(slug);

  if (!category) {
    return <div>Category not found</div>;
  }

  const result = await getProducts({
    categoryId: category.id,
    sort,
    minPrice:
      price === "under1000"
        ? 0
        : price === "1000to2000"
          ? 1000
          : price === "above2000"
            ? 2000
            : undefined,
    maxPrice:
      price === "under1000" ? 999 : price === "1000to2000" ? 2000 : undefined,
    rating: rating ? Number(rating) : undefined,
    inStock: stock === "true",
    page: Number(page ?? 1),
    pageSize: 20,
  });

  const products = result.products;

  return (
    <div className="mx-auto max-w-7xl p-6">
      <h1 className="mb-6 text-3xl font-bold">{category.name}</h1>

      <div className="mb-6">
        <SortSelect slug={slug} sort={sort} />
        <CategoryFilters slug={slug} />
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
