import ProductCard from "@/components/home/ProductCard";
import { getProductsByCategory } from "@/services/product.service";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const products = await getProductsByCategory(slug);

  return (
    <div className="mx-auto max-w-7xl p-6">
      <h1 className="mb-6 text-3xl font-bold">{slug}</h1>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
