import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;

// Fetch all published articles
export async function fetchArticles() {
  try {
    const response = await axios.get(`${API_URL}/api/articles`, {
      params: {
        "filters[state][$eq]": "published",
        populate: "*",
        sort: "publishedAt:desc",
      },
    });

    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
}

// Fetch a single article by slug
export async function fetchArticleBySlug(slug: string) {
  try {
    const response = await axios.get(`${API_URL}/api/articles`, {
      params: {
        "filters[slug][$eq]": slug,
        populate: "*",
      },
    });

    return response.data.data[0] || null;
  } catch (error) {
    console.error("Error fetching article:", error);
    return null;
  }
}

// Fetch articles by the logged-in user
export async function fetchUserArticles(token: string) {
  try {
    const response = await axios.get(`${API_URL}/api/articles`, {
      params: {
        populate: "*",
        sort: "publishedAt:desc",
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching user articles:", error);
    return [];
  }
}

// Create a new comment
export async function createComment(commentData: {
  authorName: string;
  content: string;
  article: string;
  publishedAt: string;
}) {
  try {
    const response = await axios.post(`${API_URL}/api/comments`, {
      data: commentData,
    });

    return response.data;
  } catch (error) {
    console.error("Error creating comment:", error);
    throw error;
  }
}

// Create a new article (for authenticated users)
export async function createArticle(articleData: any, token: string) {
  try {
    const response = await axios.post(
      `${API_URL}/api/articles`,
      {
        data: articleData,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error creating article:", error);
    throw error;
  }
}

// Update an article (for authenticated users)
export async function updateArticle(
  id: string,
  articleData: any,
  token: string
) {
  try {
    const response = await axios.put(
      `${API_URL}/api/articles/${id}`,
      {
        data: articleData,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error updating article:", error);
    throw error;
  }
}

// Delete an article (for authenticated users)
export async function deleteArticle(id: string, token: string) {
  try {
    const response = await axios.delete(`${API_URL}/api/articles/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error deleting article:", error);
    throw error;
  }
}
