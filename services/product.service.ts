import { products } from "@/data/products";
import { Product } from "@/types/products";

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

export async function sortProducts(products: Product[], sort?: string) {
  const sorted = [...products];

  switch (sort) {
    case "price-asc":
      sorted.sort((a, b) => a.price - b.price);
      break;

    case "price-desc":
      sorted.sort((a, b) => b.price - a.price);
      break;

    case "name":
      sorted.sort((a, b) => a.name.localeCompare(b.name));
      break;
  }

  return sorted;
}
