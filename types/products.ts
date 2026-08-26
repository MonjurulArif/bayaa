export interface Product {
  id: number;
  slug: string;
  name: string;
  price: number;
  thumbnail: string;
  categoryId: number | null;
  category: string;
  description: string;
  rating: number;
  reviews: number;
  stock: number;
}
