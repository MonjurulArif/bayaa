import { apiFetch } from "./api";

export interface AdminCategory {
  id: number;
  name: string;
  slug: string;
}

export interface CategoryPayload {
  name: string;
  slug: string;
}

async function getErrorMessage(response: Response): Promise<string> {
  const message = await response.text();
  return message || `Request failed (${response.status})`;
}

export async function getAdminCategories(): Promise<AdminCategory[]> {
  const response = await apiFetch("/categories");

  if (!response.ok) {
    throw new Error(await getErrorMessage(response));
  }

  const data: unknown = await response.json();

  if (Array.isArray(data)) {
    return data as AdminCategory[];
  }

  if (data && typeof data === "object") {
    const result = data as Record<string, unknown>;
    const categories = result.categories ?? result.Categories;

    if (Array.isArray(categories)) {
      return categories as AdminCategory[];
    }
  }

  throw new Error("Unexpected categories API response.");
}

export async function createAdminCategory(
  payload: CategoryPayload,
): Promise<void> {
  const response = await apiFetch("/categories", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(await getErrorMessage(response));
  }
}

export async function updateAdminCategory(
  id: number,
  payload: CategoryPayload,
): Promise<void> {
  const response = await apiFetch(`/categories/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(await getErrorMessage(response));
  }
}

export async function deleteAdminCategory(id: number): Promise<void> {
  const response = await apiFetch(`/categories/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(await getErrorMessage(response));
  }
}
