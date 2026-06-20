import Image from "next/image";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

import HeroBanner from "../components/home/HeroBanner";
import CategoryGrid from "../components/home/CategoryGrid";
import ProductGrid from "../components/home/ProductGrid";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroBanner />

        <CategoryGrid />

        <section className="p-4">
          <h2 className="text-2xl font-bold ">Just for You</h2>
        </section>

        <ProductGrid />
      </main>
      <Footer />
    </>
  );
}
