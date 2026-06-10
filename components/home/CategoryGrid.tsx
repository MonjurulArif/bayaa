const categories = [
  "Phones",
  "Fashion",
  "Beauty",
  "Electronics",
  "Sports",
  "Books",
  "Home",
  "More",
];

export default function CategoryGrid() {
  return (
    <div className="grid grid-cols-4 md:grid-cols-8 gap-4 p-4">
      {categories.map((category) => (
        <div key={category} className="text-center border rounded-lg p-4">
          <div className="w-12 h-12 mx-auto bg-gray-200 rounded-full" />
          <p className="mt-2 text-sm">{category}</p>
        </div>
      ))}
    </div>
  );
}
