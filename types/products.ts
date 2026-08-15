export interface Product {
  id: number;
  slug: string;

  name: string;
  price: number;
  thumbnail: string;
  category: string;
  description: string;

  rating: number;
  reviews: number;
  stock: number;
}
