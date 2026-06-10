export default function HeroBanner() {
  return (
    // <div className="p-4">
    //   <div className="h-56 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white text-3xl font-bold">
    //     Mega Sale
    //   </div>
    // </div>
    <section className="mx-auto max-w-7xl p-4">
      <div className="flex h-64 items-center justify-center rounded-xl bg-gradient-to-r from-pink-500 to-orange-500">
        <div className="text-center text-white">
          <h2 className="text-4xl font-bold">Mega Sale</h2>

          <p className="mt-2">Up to 70% Off</p>
        </div>
      </div>
    </section>
  );
}
