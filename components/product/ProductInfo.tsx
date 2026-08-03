import { Product } from "@/types/products";

type Props = {
  product: Product;
};

export default function ProductInfo({ product }: Props) {
  return (
    <div>
      <h1 className="text-3xl font-bold ">{product.name}</h1>
      <div className="mt-2">
        <span className="text-yellow-500">⭐ {product.rating}</span>

        <span className="ml-2 text-gray-500">({product.reviews} reviews)</span>
      </div>

      <p className="mt-4 text-2xl text-red-600 font-bold">৳ {product.price}</p>

      <div className="mt-2">
        {product.stock > 0 ? (
          <span className="font-medium text-green-600">
            In Stock ({product.stock})
          </span>
        ) : (
          <span className="font-medium text-red-600">Out of Stock</span>
        )}
      </div>
      <p className="mt-4 text-gray-600">{product.description}</p>
    </div>
  );
}
