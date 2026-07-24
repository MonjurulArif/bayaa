import ProductCard from "./ProductCard";
import { getProducts } from "@/services/product.service";

export default async function ProductGrid() {
  const products = await getProducts();

  return (
    <section className="mx-auto max-w-7xl p-4">
      <h2 className="mb-4 text-2xl font-bold">Recomended Products</h2>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product}></ProductCard>
        ))}
      </div>
    </section>
  );
}
