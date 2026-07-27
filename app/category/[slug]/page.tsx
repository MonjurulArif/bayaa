import ProductCard from "@/components/home/ProductCard";
import {
  getProductsByCategory,
  sortProducts,
} from "@/services/product.service";
import SortSelect from "@/components/category/SortSelect";

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sort?: string }>;
}) {
  const { slug } = await params;
  const { sort } = await searchParams;

  let products = await getProductsByCategory(slug);
  products = await sortProducts(products, sort);

  return (
    <div className="mx-auto max-w-7xl p-6">
      <h1 className="mb-6 text-3xl font-bold">{slug}</h1>

      <div className="mb-6">
        <SortSelect slug={slug} sort={sort} />
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
