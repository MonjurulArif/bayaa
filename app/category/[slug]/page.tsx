type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold capitalize">{slug}</h1>
      <p className="mt-4">Products for {slug}</p>
    </div>
  );
}
