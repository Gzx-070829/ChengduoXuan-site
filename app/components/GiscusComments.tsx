"use client";

import { useEffect, useMemo, useRef } from "react";

type GiscusCommentsProps = {
  category: string;
  slug: string;
};

const requiredKeys = [
  "NEXT_PUBLIC_GISCUS_REPO",
  "NEXT_PUBLIC_GISCUS_REPO_ID",
  "NEXT_PUBLIC_GISCUS_CATEGORY_ID",
] as const;

export default function GiscusComments({ category, slug }: GiscusCommentsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const config = useMemo(
    () => ({
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
      repoId: process.env.NEXT_PUBLIC_GISCUS_REPO_ID,
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY ?? "General",
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
      mapping: process.env.NEXT_PUBLIC_GISCUS_MAPPING ?? "pathname",
      reactionsEnabled: process.env.NEXT_PUBLIC_GISCUS_REACTIONS_ENABLED ?? "1",
      emitMetadata: process.env.NEXT_PUBLIC_GISCUS_EMIT_METADATA ?? "0",
      inputPosition: process.env.NEXT_PUBLIC_GISCUS_INPUT_POSITION ?? "top",
      lang: process.env.NEXT_PUBLIC_GISCUS_LANG ?? "zh-CN",
      loading: process.env.NEXT_PUBLIC_GISCUS_LOADING ?? "lazy",
    }),
    [],
  );

  const missingConfig = requiredKeys.some((key) => !process.env[key]);

  useEffect(() => {
    if (missingConfig || !containerRef.current) {
      return;
    }

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("data-repo", config.repo ?? "");
    script.setAttribute("data-repo-id", config.repoId ?? "");
    script.setAttribute("data-category", config.category);
    script.setAttribute("data-category-id", config.categoryId ?? "");
    script.setAttribute("data-mapping", config.mapping);
    if (config.mapping !== "pathname") {
      script.setAttribute("data-term", `${category}/${slug}`);
    }
    script.setAttribute("data-reactions-enabled", config.reactionsEnabled);
    script.setAttribute("data-emit-metadata", config.emitMetadata);
    script.setAttribute("data-input-position", config.inputPosition);
    script.setAttribute("data-theme", "preferred_color_scheme");
    script.setAttribute("data-lang", config.lang);
    script.setAttribute("data-loading", config.loading);

    containerRef.current.innerHTML = "";
    containerRef.current.appendChild(script);
  }, [category, config, missingConfig, slug]);

  return (
    <section style={{ marginTop: 40 }} aria-label="comments section">
      <h2 style={{ fontSize: 24, marginBottom: 12 }}>评论</h2>
      {missingConfig ? (
        <p style={{ opacity: 0.8, lineHeight: 1.7 }}>
          评论功能尚未配置。请先在 GitHub 完成 giscus 设置，再补齐
          <code> NEXT_PUBLIC_GISCUS_*</code> 环境变量。
        </p>
      ) : (
        <div ref={containerRef} />
      )}
    </section>
  );
}
