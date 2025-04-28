"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { logout, getSession } from "@/lib/auth"

export default function Navbar() {
  const pathname = usePathname()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState("")

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession()
      setIsLoggedIn(!!session)
      setUsername(session?.user?.username || "")
    }

    checkSession()
  }, [pathname])

  const handleLogout = () => {
    logout()
    setIsLoggedIn(false)
    setUsername("")
  }

  return (
    <nav className="bg-green-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Strapi Blog
        </Link>

        <div className="flex items-center space-x-6">
          <Link href="/" className={pathname === "/" ? "font-bold" : ""}>
            Home
          </Link>

          {isLoggedIn ? (
            <>
              <Link href="/dashboard" className={pathname.startsWith("/dashboard") ? "font-bold" : ""}>
                Dashboard
              </Link>
              <div className="flex items-center">
                <span className="mr-2">Hello, {username}</span>
                <button
                  onClick={handleLogout}
                  className="bg-white text-green-600 px-3 py-1 rounded-md text-sm hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <Link href="/login" className={pathname === "/login" ? "font-bold" : ""}>
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
