import ProductCard from "./ProductCard";
import { getProducts } from "@/services/product.service";

export default async function ProductGrid() {
  const products = await getProducts();

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product}></ProductCard>
      ))}
    </div>
  );
}
