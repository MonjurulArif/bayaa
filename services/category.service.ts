const API_URL = "http://localhost:5091/api";

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export async function getCategories(): Promise<Category[]> {
  const response = await fetch(`${API_URL}/categories`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  return response.json();
}

export async function getCategoryBySlug(
  slug: string,
): Promise<Category | null> {
  const response = await fetch(
    `${API_URL}/categories/slug/${encodeURIComponent(slug)}`,
    {
      cache: "no-store",
    },
  );

  if (response.status === 404) {
    return null;
  }
  if (!response.ok) {
    throw new Error("Failed to fetch category");
  }
  return response.json();
}
