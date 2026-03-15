export default function Article({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <main style={{ padding: 40 }}>
      <h1>BCI Article: {params.slug}</h1>
      <p>This is a placeholder BCI article page.</p>
    </main>
  );
}