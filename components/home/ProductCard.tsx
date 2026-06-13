import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  return (
    <Link href={`/products/${product.id}`}>
      <div className="overflow-hidden rounded-lg border bg-white hover:shadow-lg transition cursor-pointer">
        <Image
          src={product.thumbnail}
          alt={product.title}
          width={300}
          height={300}
          className="h-48 w-full object-cover"
        ></Image>
        <div className="p-3">
          <h3 className="line-clamp-2 text-sm text-black">{product.title}</h3>

          <div className="mt-2">
            <span className="font-bold text-pink-600">৳ {product.price}</span>

            {product.originalPrice && (
              <span className="ml-2 text-sm text-gray-400 line-through">
                ৳ {product.originalPrice}
              </span>
            )}
          </div>

          <div className="mt-2 flex justify-between text-xs text-gray-500">
            <span>⭐ {product.rating}</span>

            <span>{product.sold} sold</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
