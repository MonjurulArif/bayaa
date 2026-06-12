import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import AddToCartButton from "@/components/product/AddToCartButton";

const product = {
  id: 1,
  title: "Airbuds Pro gen 3",
  price: 1999,
  thumbnail: "https://picsum.photos/500",
};
export default async function ProductDetails() {
  return (
    <div className="mx-auto max-w-6xl p-6">
      <div className="grid gap-8 md:grid-cols-2">
        <ProductGallery
          image={product.thumbnail}
          title={product.title}
        ></ProductGallery>
      </div>
      <ProductInfo product={product}></ProductInfo>
      <AddToCartButton></AddToCartButton>
    </div>
  );
}
