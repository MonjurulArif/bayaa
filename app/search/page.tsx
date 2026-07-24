import ProductCard from "@/components/home/ProductCard";
import { searchProducts } from "@/services/product.service";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const { query } = await searchParams;

  const products = query ? await searchProducts(query) : [];

  console.log("Products: ", products);

  if (!query) {
    return (
      <div>
        <h1 className="mb-6 text-3xl font-bold mx-auto">Search Results</h1>
        <p className="text-center">Please enter a search term</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div>
        <h1 className="mb-6 text-3xl font-bold mx-auto">Search Results</h1>
        <p className="text-center">No Products Found</p>
      </div>
    );
  }
  return (
    <div className="mx-auto max-w-7xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Search Results</h1>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
