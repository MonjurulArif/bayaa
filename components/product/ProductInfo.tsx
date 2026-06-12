import { Product } from "@/types/product";

type Props = {
  product: Product;
};

export default function ProductInfo({ product }: Props) {
  return (
    <div>
      <h1 className="text-3xl font-bold ">{product.title}</h1>
      <p className="mt-4 text-2xl text-red-600 font-bold">৳ {product.price}</p>
      <p className="mt-4 text-gray-600">
        This is a sample product description.
      </p>
    </div>
  );
}
