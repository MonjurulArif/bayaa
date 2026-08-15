import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import AddToCartButton from "@/components/product/AddToCartButton";
import WishlistButton from "@/components/product/WishlistButton";
import ProductCard from "@/components/home/ProductCard";
import {
  getRelatedProducts,
  getProductsBySlug,
} from "@/services/product.service";

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await getProductsBySlug(slug);

  if (!product) {
    return <div className="p-6">Product Not Found</div>;
  }

  const relatedProducts = await getRelatedProducts(
    product.category,
    product.id,
  );

  return (
    <div className="mx-auto max-w-6xl p-6">
      <div className="grid gap-8 md:grid-cols-2">
        <ProductGallery image={product.thumbnail} name={product.name} />

        <div>
          <ProductInfo product={product} />

          <div className="mt-6">
            <AddToCartButton product={product} />
          </div>
          <div className="mt-4">
            <WishlistButton product={product} />
          </div>
        </div>
      </div>
      <div className="mt-16">
        <h2 className="mb-4 text-2xl font-bold">Related Products</h2>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {relatedProducts.map((item) => (
            <ProductCard key={item.id} product={item}></ProductCard>
          ))}
        </div>
      </div>
    </div>
  );
}
