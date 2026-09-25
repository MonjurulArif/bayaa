import { Product } from "@/types/products";

type Props = {
  product: Product;
};

export default function ProductInfo({ product }: Props) {
  return (
    <div>
      <h1 className="text-3xl font-bold ">{product.name}</h1>
      <div className="mt-2">
        {product.reviews > 0 ? (
          <span>
            ⭐ {product.rating} ({product.reviews})
          </span>
        ) : (
          <span className="text-gray-500">No reviews yet</span>
        )}
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
