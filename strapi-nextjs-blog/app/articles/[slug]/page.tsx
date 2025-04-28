import { fetchArticleBySlug } from "@/lib/api";
import Image from "next/image";
import { formatDate } from "@/lib/utils";
import CommentList from "@/components/comment-list";
import CommentForm from "@/components/comment-form";
import { notFound } from "next/navigation";
import AuthorCard from "@/components/author-card";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const article = await fetchArticleBySlug(params?.slug);

  if (!article) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: article.attributes.title,
    description:
      article.attributes.excerpt ||
      `Article by ${
        article.attributes.author.data?.attributes.username || "Unknown"
      }`,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = await fetchArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{article.attributes.title}</h1>

        <div className="flex items-center text-gray-600 mb-6">
          <span>
            By{" "}
            {article.attributes.author.data?.attributes.username || "Unknown"}
          </span>
          <span className="mx-2">•</span>
          <span>{formatDate(article.attributes.publishedAt)}</span>
        </div>
      </div>

      {article.attributes.coverImage?.data && (
        <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
          <Image
            src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${article.attributes.coverImage.data.attributes.url}`}
            alt={article.attributes.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <div
        className="prose prose-lg max-w-none mb-12 rich-text"
        dangerouslySetInnerHTML={{ __html: article.attributes.content }}
      />

      {article.attributes.author.data && (
        <div className="my-12">
          <AuthorCard author={article.attributes.author.data} />
        </div>
      )}

      <div className="border-t pt-8">
        <h2 className="text-2xl font-bold mb-6">Comments</h2>
        <CommentList comments={article.attributes.comments?.data || []} />
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Leave a comment</h3>
          <CommentForm articleId={article.id} />
        </div>
      </div>
    </article>
  );
}
