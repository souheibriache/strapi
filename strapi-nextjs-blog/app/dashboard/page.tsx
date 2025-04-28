import { fetchUserArticles } from "@/lib/api";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import ArticleGrid from "@/components/article-grid";

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const articles = await fetchUserArticles(session.jwt);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Articles</h1>
        <Link
          href="/dashboard/new-article"
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          Create New Article
        </Link>
      </div>

      {articles.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-medium text-gray-600">
            You haven't created any articles yet
          </h2>
          <p className="mt-2 text-gray-500">
            Get started by creating your first article
          </p>
        </div>
      ) : (
        <ArticleGrid articles={articles} showStatus />
      )}
    </div>
  );
}
