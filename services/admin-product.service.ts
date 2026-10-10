import { apiFetch } from "./api";

export interface AdminProduct {
  id: number;
  name: string;
  slug: string;
  price: number;
  description: string;
  thumbnail: string;
  categoryId: number | null;
  category: string;
  stock: number;
  rating: number;
  reviews: number;
}

export interface ProductCategory {
  id: number;
  name: string;
  slug: string;
}

export interface ProductListResult {
  totalProducts: number;
  page: number;
  pageSize: number;
  totalPages: number;
  products: AdminProduct[];
}

export interface ProductPayload {
  name: string;
  slug: string;
  price: number;
  description: string;
  thumbnail: string;
  categoryId: number;
  stock: number;
}

async function getErrorMessage(response: Response): Promise<string> {
  const message = await response.text();

  return message || `Request failed with status ${response.status}`;
}

export async function getAdminProducts(
  search: string,
  page: number,
  pageSize = 10,
): Promise<ProductListResult> {
  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
  });

  if (search.trim()) {
    params.set("search", search.trim());
  }

  const response = await apiFetch(`/products?${params.toString()}`);

  if (!response.ok) throw new Error(await getErrorMessage(response));

  const data = (await response.json()) as Record<string, unknown>;

  return {
    totalProducts: Number(data.totalProducts ?? data.totalProducts ?? 0),
    page: Number(data.page ?? data.page ?? page),
    pageSize: Number(data.pageSize ?? data.pageSize ?? pageSize),
    totalPages: Number(data.totalPages ?? data.totalPages ?? 0),
    products: (data.products ?? data.products ?? []) as AdminProduct[],
  };
}

export async function getAdminProduct(id: number): Promise<AdminProduct> {
  const response = await apiFetch(`/products/id/${id}`);

  if (!response.ok) {
    throw new Error(await getErrorMessage(response));
  }

  return response.json();
}

export async function getProductCategories(): Promise<ProductCategory[]> {
  const response = await apiFetch("/categories");

  if (!response.ok) {
    throw new Error(await getErrorMessage(response));
  }

  const data: unknown = await response.json();

  if (Array.isArray(data)) {
    return data as ProductCategory[];
  }

  if (data && typeof data === "object") {
    const result = data as Record<string, unknown>;
    return (result.categories ?? result.Categories ?? []) as ProductCategory[];
  }

  return [];
}

export async function createAdminProduct(payload: ProductPayload) {
  const response = await apiFetch("/products", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(await getErrorMessage(response));
  }

  return response.json();
}

export async function updateAdminProduct(
  id: number,
  payload: ProductPayload,
): Promise<void> {
  const response = await apiFetch(`/products/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(await getErrorMessage(response));
  }
}

export async function deleteAdminProduct(id: number): Promise<void> {
  const response = await apiFetch(`/products/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(await getErrorMessage(response));
  }
}
