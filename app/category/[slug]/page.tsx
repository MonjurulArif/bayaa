import ProductGrid from "@/components/home/ProductGrid";
import { getProductsByCategory } from "@/services/product.service";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;

  const products = await getProductsByCategory(slug);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold capitalize">{slug}</h1>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {products.map((product) => (
          <div key={product.id}>{product.title}</div>
        ))}
      </div>
    </div>
  );
}
