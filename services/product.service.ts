import { Product } from "@/types/product";

export async function getProducts(): Promise<Product[]> {
  return [
    {
      id: 1,
      title: "Wireless Earbuds",
      price: 1200,
      thumbnail: "https://picsum.photos/300?random=1",
    },
    {
      id: 2,
      title: "Power Bank",
      price: 1500,
      thumbnail: "https://picsum.photos/300?random=2",
    },
    {
      id: 3,
      title: "Smart Watch",
      price: 2500,
      thumbnail: "https://picsum.photos/300?random=3",
    },
    {
      id: 4,
      title: "Bluetooth Speaker",
      price: 1800,
      thumbnail: "https://picsum.photos/300?random=4",
    },
  ];
}
