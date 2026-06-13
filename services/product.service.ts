import { Product } from "@/types/product";

export async function getProducts(): Promise<Product[]> {
  return [
    {
      id: 1,
      title: "Wireless Earbuds",
      price: 1200,
      originalPrice: 1800,
      rating: 4.8,
      sold: 2300,
      category: "electronics",
      thumbnail: "https://picsum.photos/300?random=1",
    },
    {
      id: 2,
      title: "Power Bank 20000mAh",
      price: 1500,
      originalPrice: 2200,
      rating: 4.6,
      sold: 1800,
      category: "electronics",
      thumbnail: "https://picsum.photos/300?random=2",
    },
    {
      id: 3,
      title: "Running Shoes",
      price: 2200,
      originalPrice: 3000,
      rating: 4.7,
      sold: 950,
      category: "fashion",
      thumbnail: "https://picsum.photos/300?random=3",
    },
    {
      id: 4,
      title: "Men's T-Shirt",
      price: 800,
      originalPrice: 1200,
      rating: 4.5,
      sold: 3200,
      category: "fashion",
      thumbnail: "https://picsum.photos/300?random=4",
    },
    {
      id: 5,
      title: "Smartphone X",
      price: 25000,
      originalPrice: 29000,
      rating: 4.9,
      sold: 750,
      category: "phones",
      thumbnail: "https://picsum.photos/300?random=5",
    },
    {
      id: 6,
      title: "Phone Case",
      price: 350,
      originalPrice: 500,
      rating: 4.4,
      sold: 5000,
      category: "phones",
      thumbnail: "https://picsum.photos/300?random=6",
    },
    {
      id: 7,
      title: "Face Wash",
      price: 450,
      originalPrice: 650,
      rating: 4.3,
      sold: 2100,
      category: "beauty",
      thumbnail: "https://picsum.photos/300?random=7",
    },
    {
      id: 8,
      title: "Lipstick",
      price: 600,
      originalPrice: 900,
      rating: 4.7,
      sold: 1300,
      category: "beauty",
      thumbnail: "https://picsum.photos/300?random=8",
    },
  ];
}

export async function getProductsByCategory(
  category: string,
): Promise<Product[]> {
  const product = await getProducts();

  return product.filter((p) => p.category === category);
}
