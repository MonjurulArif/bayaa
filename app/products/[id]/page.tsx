import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import AddToCartButton from "@/components/product/AddToCartButton";

import { getProductById } from "@/services/product.service";

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = getProductById(Number(id));

  if (!product) {
    return <div className="p-6">Product Not Found</div>;
  }

  return (
    <div className="mx-auto max-w-6xl p-6">
      <div className="grid gap-8 md:grid-cols-2">
        <ProductGallery image={product.thumbnail} name={product.name} />

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
