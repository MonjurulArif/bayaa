import Image from "next/image";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

import HeroBanner from "../components/home/HeroBanner";
import CategoryGrid from "../components/home/CategoryGrid";
import ProductGrid from "../components/home/ProductGrid";
import RecentlyViewed from "../components/home/RecentlyViewed";

import { getProducts } from "@/services/product.service";

export default async function Home() {
  const result = await getProducts({
    page: 1,
    pageSize: 20,
  });

  return (
    <>
      <Header />
      <main>
        <HeroBanner />

        <CategoryGrid />

        <section className="p-4">
          <h2 className="text-2xl font-bold ">Just for You</h2>
        </section>

        <ProductGrid
          initialProducts={result.products}
          initialPage={result.page}
          totalProducts={result.totalProducts}
          pageSize={20}
        />
        <RecentlyViewed />
      </main>
      <Footer />
    </>
  );
}
