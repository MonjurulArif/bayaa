export interface Product {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  sold?: number;
  thumbnail: string;

  category: string;
}
