import { Product } from "@/types/products";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export interface ProductQuery {
  search?: string;
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  rating?: number;
  sort?: string;
  page?: number;
  pageSize?: number;
}

export interface ProductResponse {
  totalProducts: number;
  page: number;
  pageSize: number;
  products: Product[];
}

// Get products with search, filtering, sorting and pagination
export async function getProducts(
  query: ProductQuery = {},
): Promise<ProductResponse> {
  const params = new URLSearchParams();

  if (query.search) {
    params.set("search", query.search);
  }

  if (query.categoryId !== undefined) {
    params.set("categoryId", query.categoryId.toString());
  }

  if (query.minPrice !== undefined) {
    params.set("minPrice", query.minPrice.toString());
  }

  if (query.maxPrice !== undefined) {
    params.set("maxPrice", query.maxPrice.toString());
  }

  if (query.rating !== undefined) {
    params.set("rating", query.rating.toString());
  }

  if (query.inStock !== undefined) {
    params.set("inStock", query.inStock.toString());
  }

  if (query.sort) {
    params.set("sort", query.sort);
  }

  params.set("page", (query.page ?? 1).toString());
  params.set("pageSize", (query.pageSize ?? 20).toString());

  const response = await fetch(`${API_URL}/products?${params.toString()}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Failed to fetch products: ${response.status} ${text}`);
  }

  return response.json();
}

// Get a single product by ID
export async function getProductById(id: number): Promise<Product | undefined> {
  const response = await fetch(`${API_URL}/products/${id}`);

  if (response.status === 404) {
    return undefined;
  }

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  return response.json();
}

// Get product by slug
export async function getProductsBySlug(
  slug: string,
): Promise<Product | undefined> {
  const response = await fetch(
    `${API_URL}/products/${encodeURIComponent(slug)}`,
  );

  if (response.status === 404) {
    return undefined;
  }

  if (!response.ok) {
    console.log("Status:", response.status);
    console.log("URL:", response.url);

    const text = await response.text();
    console.log(text);

    throw new Error(`Failed: ${response.status}`);
  }

  return response.json();
}

// Get products by category slug
export async function getProductsByCategory(
  slug: string,
  query: Omit<ProductQuery, "categoryId"> = {},
): Promise<ProductResponse> {
  const params = new URLSearchParams();

  if (query.minPrice !== undefined) {
    params.set("minPrice", query.minPrice.toString());
  }

  if (query.maxPrice !== undefined) {
    params.set("maxPrice", query.maxPrice.toString());
  }

  if (query.inStock !== undefined) {
    params.set("inStock", query.inStock.toString());
  }

  if (query.sort) {
    params.set("sort", query.sort);
  }

  params.set("page", (query.page ?? 1).toString());
  params.set("pageSize", (query.pageSize ?? 20).toString());

  const response = await fetch(
    `${API_URL}/products/category/${encodeURIComponent(slug)}?${params.toString()}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products by category");
  }

  return response.json();
}

// Search products
export async function searchProducts(
  query: string,
  page = 1,
  pageSize = 20,
): Promise<ProductResponse> {
  return getProducts({
    search: query,
    page,
    pageSize,
  });
}

// Get related products
export async function getRelatedProducts(
  categoryId: number,
  currentProductId: number,
): Promise<Product[]> {
  const response = await getProducts({
    categoryId,
    page: 1,
    pageSize: 8,
  });

  return response.products.filter((product) => product.id !== currentProductId);
}
