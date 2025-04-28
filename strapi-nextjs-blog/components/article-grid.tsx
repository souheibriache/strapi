import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/lib/utils";

type Article = {
  id: string;
  title: string;
  slug: string;
  publishedAt: string;
  state?: string;
  coverImage: {
    url: string;
  };
  author: {
    username: string;
  };
};

export default function ArticleGrid({
  articles,
  showStatus = true,
}: {
  articles: Article[];
  showStatus?: boolean;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {articles.map((article) => (
        <Link
          key={article.id}
          href={`/articles/${article?.slug}`}
          className="group"
        >
          <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="relative h-48 w-full bg-gray-200">
              {article?.coverImage ? (
                <Image
                  src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${article.coverImage?.url}`}
                  alt={article?.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  No image
                </div>
              )}
            </div>

            <div className="p-4">
              <h2 className="text-xl font-bold mb-2 group-hover:text-green-600 transition-colors">
                {article.title}
              </h2>

              <div className="flex items-center text-sm text-gray-600 mb-2">
                <span>By {article?.author?.username || "Unknown"}</span>
                <span className="mx-1">•</span>
                <span>{formatDate(article?.publishedAt)}</span>
              </div>

              {showStatus && article?.state && (
                <div
                  className={`inline-block px-2 py-1 text-xs rounded-full ${
                    article.state === "published"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {article.state}
                </div>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
