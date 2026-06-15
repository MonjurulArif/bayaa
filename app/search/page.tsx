type Props = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Search Results</h1>

      <p className="mt-4">Keyword: {q}</p>
    </div>
  );
}
