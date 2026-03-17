import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type ArticleContentProps = {
  content: string;
};

export default function ArticleContent({ content }: ArticleContentProps) {
  return (
    <article className="article-content markdown-body">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </article>
  );
}
