import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import AddToCartButton from "@/components/product/AddToCartButton";

const product = {
  id: 1,
  name: "Airbuds Pro Gen 3",
  price: 1999,
  category: "Electronics",
  description:
    "Premium wireless earbuds with noise cancellation and long battery life.",
  thumbnail: "https://picsum.photos/500",
};

export default async function ProductDetails() {
  return (
    <div className="mx-auto max-w-6xl p-6">
      <div className="grid gap-8 md:grid-cols-2">
        <ProductGallery image={product.thumbnail} title={product.name} />

        <div>
          <ProductInfo product={product} />

          <div className="mt-6">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
