"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useAuthService } from "@/services/auth"
import { useToast } from "@/hooks/use-toast"
import { Menu, X, LogOut, User, Wallet, Settings, BarChart3 } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, signOut } = useAuthService()
  const { toast } = useToast()

  const handleSignOut = () => {
    signOut()
    toast({
      title: "Signed out successfully",
      description: "You have been signed out of your account.",
    })
  }

  return (
    <header className="bg-primary text-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold">WagerMe</span>
            </Link>
            <nav className="hidden md:flex ml-10 space-x-8">
              <Link href="/wagers" className="text-white hover:text-secondary transition-colors">
                Markets
              </Link>
              <Link href="/wagers/create" className="text-white hover:text-secondary transition-colors">
                Create
              </Link>
              <Link href="/leaderboard" className="text-white hover:text-secondary transition-colors">
                Leaderboard
              </Link>
              <Link href="/how-it-works" className="text-white hover:text-secondary transition-colors">
                How It Works
              </Link>
            </nav>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Button
                  variant="outline"
                  className="bg-transparent text-white border-white hover:bg-white hover:text-primary"
                >
                  <Wallet className="mr-2 h-4 w-4" />
                  <span>₦45,000.00</span>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt={user.username} />
                        <AvatarFallback>{user.username.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/wallet" className="cursor-pointer">
                        <Wallet className="mr-2 h-4 w-4" />
                        <span>Wallet</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/my-wagers" className="cursor-pointer">
                        <BarChart3 className="mr-2 h-4 w-4" />
                        <span>My Wagers</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings" className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button asChild variant="ghost" className="text-white hover:text-secondary">
                  <Link href="/login">Log in</Link>
                </Button>
                <Button asChild className="bg-accent hover:bg-accent-dark">
                  <Link href="/register">Sign up</Link>
                </Button>
              </>
            )}
          </div>

          <div className="md:hidden">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between py-4">
                    <span className="text-xl font-bold">WagerMe</span>
                    <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
                      <X className="h-6 w-6" />
                    </Button>
                  </div>
                  <nav className="flex flex-col space-y-4">
                    <Link
                      href="/wagers"
                      className="px-4 py-2 hover:bg-neutral-light rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Markets
                    </Link>
                    <Link
                      href="/wagers/create"
                      className="px-4 py-2 hover:bg-neutral-light rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Create
                    </Link>
                    <Link
                      href="/leaderboard"
                      className="px-4 py-2 hover:bg-neutral-light rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Leaderboard
                    </Link>
                    <Link
                      href="/how-it-works"
                      className="px-4 py-2 hover:bg-neutral-light rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      How It Works
                    </Link>
                  </nav>
                  <div className="mt-auto">
                    {user ? (
                      <div className="space-y-4">
                        <div className="flex items-center space-x-4 px-4 py-2">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src="/placeholder.svg?height=40&width=40" alt={user.username} />
                            <AvatarFallback>{user.username.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.username}</p>
                            <p className="text-sm text-neutral-dark">{user.email}</p>
                          </div>
                        </div>
                        <div className="px-4">
                          <Button variant="outline" className="w-full justify-start">
                            <Wallet className="mr-2 h-4 w-4" />
                            <span>Wallet: ₦45,000.00</span>
                          </Button>
                        </div>
                        <nav className="flex flex-col space-y-1">
                          <Link
                            href="/profile"
                            className="px-4 py-2 hover:bg-neutral-light rounded-md flex items-center"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <User className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                          </Link>
                          <Link
                            href="/my-wagers"
                            className="px-4 py-2 hover:bg-neutral-light rounded-md flex items-center"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <BarChart3 className="mr-2 h-4 w-4" />
                            <span>My Wagers</span>
                          </Link>
                          <Link
                            href="/settings"
                            className="px-4 py-2 hover:bg-neutral-light rounded-md flex items-center"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                          </Link>
                        </nav>
                        <div className="px-4 pt-2">
                          <Button onClick={handleSignOut} variant="destructive" className="w-full">
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Log out</span>
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 space-y-4">
                        <Button asChild variant="outline" className="w-full">
                          <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                            Log in
                          </Link>
                        </Button>
                        <Button asChild className="w-full bg-accent hover:bg-accent-dark">
                          <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                            Sign up
                          </Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}