import { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: 1,
    name: "Airbuds Pro Gen 3",
    price: 1999,
    category: "Electronics",
    description: "Premium wireless earbuds.",
    thumbnail: "https://picsum.photos/id/1/500",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 2999,
    category: "Electronics",
    description: "Fitness tracking smartwatch.",
    thumbnail: "https://picsum.photos/id/2/500",
  },
  {
    id: 3,
    name: "Power Bank",
    price: 1499,
    category: "Accessories",
    description: "10000mAh fast charging.",
    thumbnail: "https://picsum.photos/id/3/500",
  },
];

export function getProducts(): Product[] {
  return products;
}

export function getProductById(id: number): Product | undefined {
  return products.find((product) => product.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(
    (product) => product.category.toLowerCase() === category.toLowerCase(),
  );
}

export function searchProducts(keyword: string): Product[] {
  const search = keyword.toLowerCase();

  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(search) ||
      product.description.toLowerCase().includes(search),
  );
}
