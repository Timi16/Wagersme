"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type User = {
  id: string
  name: string
  email: string
  kycVerified: boolean
}

type AuthContextType = {
  user: User | null
  signIn: (email: string, password: string) => Promise<void>
  signUp: (name: string, email: string, password: string) => Promise<void>
  signOut: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in from localStorage
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user")
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
      setLoading(false)
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    // In a real app, this would make an API call to authenticate
    // For demo purposes, we'll simulate a successful login
    const mockUser = {
      id: "user_123",
      name: "Demo User",
      email,
      kycVerified: false,
    }

    setUser(mockUser)
    localStorage.setItem("user", JSON.stringify(mockUser))
    return Promise.resolve()
  }

  const signUp = async (name: string, email: string, password: string) => {
    // In a real app, this would make an API call to register
    // For demo purposes, we'll simulate a successful registration
    const mockUser = {
      id: "user_" + Math.random().toString(36).substr(2, 9),
      name,
      email,
      kycVerified: false,
    }

    setUser(mockUser)
    localStorage.setItem("user", JSON.stringify(mockUser))
    return Promise.resolve()
  }

  const signOut = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return <AuthContext.Provider value={{ user, signIn, signUp, signOut, loading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
