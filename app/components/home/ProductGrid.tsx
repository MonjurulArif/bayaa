import ProductCard from "./ProductCard";

const products = Array.from({ length: 12 }).map((_, i) => ({
  id: i,
  name: `Product ${i + 1}`,
  price: 1000 + i * 100,
}));

export default function ProductGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          name={product.name}
          price={product.price}
        ></ProductCard>
      ))}
    </div>
  );
}
