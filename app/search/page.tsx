import ProductCard from "@/components/home/ProductCard";
import SearchSortSelect from "@/components/search/SearchSortSelect";
import { getProducts } from "@/services/product.service";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; sort?: string; page?: string }>;
}) {
  const { query, sort, page } = await searchParams;

  if (!query) {
    return (
      <div>
        <h1 className="mb-6 text-3xl font-bold mx-auto">Search Results</h1>
        <p className="text-center">Please enter a search term</p>
      </div>
    );
  }

  const result = await getProducts({
    search: query,
    sort,
    page: Number(page ?? 1),
    pageSize: 20,
  });

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
