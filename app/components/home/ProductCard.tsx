type Props = {
  name: string;
  price: number;
};

export default function ProductCard({ name, price }: Props) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="h-48 bg-gray-200" />
      <div className="p-3">
        <h3 className="text-sm">{name}</h3>
        <p className="text-red-600 font-bold">৳ {price}</p>
        <p className="text-xs text-gray-500">★ 4.8 | 1.2k sold</p>
      </div>
    </div>
  );
}
