import Image from "next/image";
import { Product } from "@/types/product";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  return (
    <div className="overflow-hidden rounded-lg border bg-white">
      <Image
        src={product.thumbnail}
        alt={product.title}
        width={300}
        height={300}
        className="h-48 w-full object-cover"
      ></Image>
      <div className="p-3">
        <h3 className="line-clamp-2 text-sm">{product.title}</h3>
        <p className="mt-2 font-bold text-pink-600">{product.price}</p>
      </div>
    </div>
  );
}
