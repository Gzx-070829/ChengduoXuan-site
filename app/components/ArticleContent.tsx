import { markdownToHtml } from "../../lib/content";

type ArticleContentProps = {
  content: string;
};

export default function ArticleContent({ content }: ArticleContentProps) {
  const html = markdownToHtml(content);

  return <article className="article-content markdown-body" dangerouslySetInnerHTML={{ __html: html }} />;
}
