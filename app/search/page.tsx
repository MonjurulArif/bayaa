import ProductCard from "@/components/home/ProductCard";
import { searchProducts } from "@/services/product.service";
import SearchSortSelect from "@/components/search/SearchSortSelect";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; sort?: string }>;
}) {
  const { query, sort } = await searchParams;

  if (!query) {
    return (
      <div>
        <h1 className="mb-6 text-3xl font-bold mx-auto">Search Results</h1>
        <p className="text-center">Please enter a search term</p>
      </div>
    );
  }

  const result = query
    ? await searchProducts(query)
    : {
        products: [],
        totalProducts: 0,
        page: 1,
        pageSize: 20,
      };

  const products = result.products;

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
      <div className="mb-6">
        <SearchSortSelect query={query} sort={sort} />
      </div>

      <h1 className="mb-6 text-3xl font-bold">Search Results</h1>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
