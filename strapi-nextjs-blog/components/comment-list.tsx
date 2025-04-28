import { formatDate } from "@/lib/utils"

type Comment = {
  id: string
  attributes: {
    content: string
    authorName: string
    publishedAt: string
  }
}

export default function CommentList({ comments }: { comments: Comment[] }) {
  if (comments.length === 0) {
    return <div className="text-gray-500 italic">No comments yet. Be the first to comment!</div>
  }

  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <div key={comment.id} className="border-b pb-4">
          <div className="flex justify-between mb-2">
            <span className="font-medium">{comment.attributes.authorName}</span>
            <span className="text-sm text-gray-500">{formatDate(comment.attributes.publishedAt)}</span>
          </div>
          <p>{comment.attributes.content}</p>
        </div>
      ))}
    </div>
  )
}
