export default function HeroBanner() {
  return (
    <section className="mx-auto max-w-7xl p-4">
      <div className="rounded-xl bg-gradient-to-r from-orange-500 to-pink-600 p-12 text-white">
        <h1 className="text-4xl font-bold">Mega Sale</h1>

        <p className="mt-4 text-lg">Up to 70% Off On Selected Products</p>

        <button className="mt-6 rounded-lg bg-white px-5 py-2 text-black">
          Shop Now
        </button>
      </div>
    </section>
  );
}
