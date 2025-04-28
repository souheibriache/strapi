"use client"

import type React from "react"

import { useState } from "react"
import { createComment } from "@/lib/api"
import { useRouter } from "next/navigation"

export default function CommentForm({ articleId }: { articleId: string }) {
  const [authorName, setAuthorName] = useState("")
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")
    setSuccess(false)

    try {
      await createComment({
        authorName,
        content,
        article: articleId,
        publishedAt: new Date().toISOString(),
      })

      setAuthorName("")
      setContent("")
      setSuccess(true)
      router.refresh()
    } catch (err) {
      setError("Failed to submit comment. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          Your comment has been submitted successfully!
        </div>
      )}

      <div>
        <label htmlFor="authorName" className="block mb-1 font-medium">
          Your Name
        </label>
        <input
          id="authorName"
          type="text"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>

      <div>
        <label htmlFor="content" className="block mb-1 font-medium">
          Comment
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-3 py-2 border rounded-md h-32"
          required
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
      >
        {isSubmitting ? "Submitting..." : "Submit Comment"}
      </button>
    </form>
  )
}
