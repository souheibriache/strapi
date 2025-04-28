"use client"

import axios from "axios"

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL
const TOKEN_KEY = "strapi_token"
const USER_KEY = "strapi_user"

type User = {
  id: number
  username: string
  email: string
}

type Session = {
  jwt: string
  user: User
} | null

// Login function
export async function login(email: string, password: string): Promise<Session> {
  try {
    const response = await axios.post(`${API_URL}/api/auth/local`, {
      identifier: email,
      password,
    })

    const { jwt, user } = response.data

    // Store in localStorage
    localStorage.setItem(TOKEN_KEY, jwt)
    localStorage.setItem(USER_KEY, JSON.stringify(user))

    return { jwt, user }
  } catch (error) {
    console.error("Login error:", error)
    throw error
  }
}

// Logout function
export function logout(): void {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

// Get current session
export async function getSession(): Promise<Session> {
  if (typeof window === "undefined") {
    return null
  }

  const jwt = localStorage.getItem(TOKEN_KEY)
  const userStr = localStorage.getItem(USER_KEY)

  if (!jwt || !userStr) {
    return null
  }

  try {
    const user = JSON.parse(userStr)
    return { jwt, user }
  } catch (error) {
    console.error("Error parsing user data:", error)
    return null
  }
}
