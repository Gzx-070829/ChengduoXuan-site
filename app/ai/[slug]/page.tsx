import BackHomeLink from "../../components/BackHomeLink";

export default function Article({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <main style={{ padding: 40 }}>
      <h1>Article: {params.slug}</h1>
      <p>This is a placeholder article page.</p>
      <BackHomeLink />
    </main>
  );
}
