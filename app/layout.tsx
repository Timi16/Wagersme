import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/hooks/use-auth"
import { Header } from "@/components/header"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "WagerMe | Prediction Markets",
  description: "Place bets on future events with dynamic odds",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <footer className="bg-primary text-white py-6">
                <div className="container mx-auto px-4">
                  <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                      <p className="text-sm">© 2025 BetWise. All rights reserved.</p>
                    </div>
                    <div className="flex space-x-6">
                      <a href="#" className="text-sm hover:text-secondary">
                        Terms
                      </a>
                      <a href="#" className="text-sm hover:text-secondary">
                        Privacy
                      </a>
                      <a href="#" className="text-sm hover:text-secondary">
                        Support
                      </a>
                    </div>
                  </div>
                </div>
              </footer>
            </div>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
