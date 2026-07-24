import { products } from "@/data/products";

export async function getProducts() {
  return products;
}

export async function getProductById(id: number) {
  return products.find((p) => p.id === id);
}

export async function getProductsByCategory(slug: string) {
  return products.filter((p) => p.category === slug);
}

export async function searchProducts(query: string) {
  const search = query.toLowerCase();

  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(search) ||
      p.description.toLowerCase().includes(search),
  );
}
