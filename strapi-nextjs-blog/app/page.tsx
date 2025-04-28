import ArticleGrid from "@/components/article-grid"
import { fetchArticles } from "@/lib/api"

export default async function Home() {
  const articles = await fetchArticles()

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Latest Articles</h1>
      <ArticleGrid articles={articles} />
    </div>
  )
}
