This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
## 为文章页接入 giscus 评论（AI / BCI）

### 你需要先在 GitHub 做的准备
1. **公开一个仓库**（可以用本站仓库，也可以新建一个专门放评论的仓库）。
2. 进入 [giscus.app](https://giscus.app/zh-CN)，按页面引导：
   - 给仓库安装 giscus GitHub App。
   - 选择 Discussion 分类（建议 `General`）。
   - 复制配置里给出的关键参数（`repo`、`repoId`、`categoryId`）。
3. 在项目根目录新建 `.env.local`，填入这些环境变量（见下方模板）。

### 环境变量模板
可以直接复制下面内容到 `.env.local`：

```env
NEXT_PUBLIC_GISCUS_REPO=你的GitHub用户名/你的仓库名
NEXT_PUBLIC_GISCUS_REPO_ID=R_kgDOxxxxxx
NEXT_PUBLIC_GISCUS_CATEGORY=General
NEXT_PUBLIC_GISCUS_CATEGORY_ID=DIC_kwDOxxxxxx

# 可选项（不写也有默认值）
NEXT_PUBLIC_GISCUS_MAPPING=pathname
NEXT_PUBLIC_GISCUS_REACTIONS_ENABLED=1
NEXT_PUBLIC_GISCUS_EMIT_METADATA=0
NEXT_PUBLIC_GISCUS_INPUT_POSITION=top
NEXT_PUBLIC_GISCUS_LANG=zh-CN
NEXT_PUBLIC_GISCUS_LOADING=lazy
```

### 代码加在什么地方
- 新增组件：`app/components/GiscusComments.tsx`
  - 用来统一渲染 giscus。
  - 默认根据系统浅色/深色自动切换主题（`preferred_color_scheme`）。
- 接入页面：
  - `app/ai/[slug]/page.tsx`
  - `app/bci/[slug]/page.tsx`

目前只在 **AI 和 BCI 的文章详情页** 显示评论，不会影响首页和栏目列表页。

### 以后其他栏目如何复用
如果你要给其他栏目（比如 `daily` 或 `programming`）加评论，只需要在对应详情页里做两步：

1. 引入组件：
```tsx
import GiscusComments from "../../components/GiscusComments";
```
2. 在文章底部加一行：
```tsx
<GiscusComments category="daily" slug={slug} />
```

把 `category` 换成栏目名即可。这样不同栏目的同名 slug 也能区分开。
