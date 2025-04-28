import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { format } from "date-fns"

// Format date for display
export function formatDate(dateString: string): string {
  if (!dateString) return "Unknown date"

  try {
    const date = new Date(dateString)
    return format(date, "MMMM d, yyyy")
  } catch (error) {
    console.error("Error formatting date:", error)
    return "Invalid date"
  }
}

// Function to generate a slug from a title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
