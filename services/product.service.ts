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

export async function getRelatedProducts(
  category: string,
  currentProductId: number,
) {
  return products
    .filter(
      (product) =>
        product.category === category && product.id !== currentProductId,
    )
    .slice(0, 8);
}

export async function getProductsBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export async function filterProducts(products: Product[], price?: string) {
  if (!price) return products;

  switch (price) {
    case "under1000":
      return products.filter((p) => p.price < 1000);
    case "1000to2000":
      return products.filter((p) => p.price >= 1000 && p.price <= 2000);
    case "above2000":
      return products.filter((p) => p.price > 2000);
    default:
      return products;
  }
}

export async function filterByRating(products: Product[], rating?: string) {
  if (!rating) return products;

  return products.filter((p) => p.rating >= Number(rating));
}

export async function filterByStock(products: Product[], stock?: string) {
  if (stock !== "true") return products;

  return products.filter((p) => p.stock > 0);
}
