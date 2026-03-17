import {
  getArticleBySlug,
  getArticlesMeta,
  type Article,
  type ArticleMeta,
} from "./content";

const AI_COLUMN = "ai";

export type AIArticleMeta = ArticleMeta;
export type AIArticle = Article;

export function getAIArticlesMeta(): AIArticleMeta[] {
  return getArticlesMeta(AI_COLUMN);
}

export function getAIArticleBySlug(slug: string): AIArticle | null {
  return getArticleBySlug(AI_COLUMN, slug);
}

