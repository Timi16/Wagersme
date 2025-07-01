"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { Search, Filter, Clock, Users, TrendingUp, CheckCircle, XCircle } from "lucide-react"
import { useWagers } from "@/hooks/useWagers"
import { useAuthService } from "@/services/auth"
import { wagersService } from "@/services/wagers"

const categories = [
  "All",
  "sports",
  "politics",
  "entertainment",
  "crypto",
  "tech",
  "finance",
  "weather",
  "other",
]

export default function WagersPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [resolvingWager, setResolvingWager] = useState<number | null>(null)
  const [resolveError, setResolveError] = useState<string | null>(null)
  const [resolveSuccess, setResolveSuccess] = useState<string | null>(null)
  
  const { user, isAuthenticated } = useAuthService()
  const { wagers, loading, error, fetchWagers } = useWagers({
    category: selectedCategory === "All" ? undefined : selectedCategory,
    status: "active",
    limit: 20,
  })

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8">Error: {error}</div>
  }

  // Filter wagers based on search query
  const filteredWagers = wagers.filter((w) =>
    w.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Sort wagers for "All Markets" tab
  const sortedWagers = [...filteredWagers].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    } else if (sortBy === "poolSize") {
      return b.totalPool - a.totalPool
    } else if (sortBy === "participants") {
      return b.participantCount - a.participantCount
    } else if (sortBy === "deadline") {
      return new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
    }
    return 0
  })

  // Sort and slice for "Trending" (top 4 by participants)
  const trendingWagers = [...filteredWagers]
    .sort((a, b) => b.participantCount - a.participantCount)
    .slice(0, 4)

  // Sort and slice for "Ending Soon" (top 4 by deadline)
  const endingSoonWagers = [...filteredWagers]
    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
    .slice(0, 4)

  const handleResolveWager = async (wagerId: number, result: 'yes' | 'no') => {
    setResolvingWager(wagerId)
    setResolveError(null)
    setResolveSuccess(null)
    
    try {
      await wagersService.resolveWager(wagerId, { result })
      setResolveSuccess(`Wager resolved successfully as "${result.toUpperCase()}"`)
      
      // Refresh the wagers list
      await fetchWagers()
      
      // Clear success message after 3 seconds
      setTimeout(() => setResolveSuccess(null), 3000)
    } catch (error) {
      console.error('Failed to resolve wager:', error)
      setResolveError(error instanceof Error ? error.message : 'Failed to resolve wager')
      
      // Clear error message after 5 seconds
      setTimeout(() => setResolveError(null), 5000)
    } finally {
      setResolvingWager(null)
    }
  }

  const isAdmin = isAuthenticated && user?.role === 'admin'

  const renderWagerCard = (wager: any) => {
    const totalYesStake = wager.totalYesStake ?? 0
    const totalNoStake = wager.totalNoStake ?? 0
    const totalPool = wager.totalPool
    const yesPercentage = totalPool > 0 ? (totalYesStake / totalPool) * 100 : 0
    const noPercentage = totalPool > 0 ? (totalNoStake / totalPool) * 100 : 0
    const yesOdds = wager.multiplierYes ?? 0
    const noOdds = wager.multiplierNo ?? 0
    const isResolving = resolvingWager === wager.id

    return (
      <Card key={wager.id} className="overflow-hidden">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <Badge className="bg-primary hover:bg-primary">{wager.category}</Badge>
            <div className="flex items-center text-sm text-neutral-dark">
              <Clock className="h-4 w-4 mr-1" />
              <span>{new Date(wager.deadline).toLocaleDateString()}</span>
            </div>
          </div>
          <CardTitle className="text-lg mt-2">
            <Link href={`/wagers/${wager.id}`} className="hover:text-primary transition-colors">
              {wager.title}
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-success">Yes: {yesPercentage.toFixed(0)}%</span>
                <span className="font-medium text-destructive">No: {noPercentage.toFixed(0)}%</span>
              </div>
              <div className="flex h-3 rounded-full overflow-hidden">
                <div className="bg-success" style={{ width: `${yesPercentage}%` }} />
                <div className="bg-destructive" style={{ width: `${noPercentage}%` }} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-neutral-light p-3 rounded-md">
                <div className="text-sm text-neutral-dark">Yes Pool</div>
                <div className="text-lg font-bold">₦{totalYesStake.toLocaleString()}</div>
                <div className="text-sm font-medium text-success">Odds: {yesOdds.toFixed(2)}x</div>
              </div>
              <div className="bg-neutral-light p-3 rounded-md">
                <div className="text-sm text-neutral-dark">No Pool</div>
                <div className="text-lg font-bold">₦{totalNoStake.toLocaleString()}</div>
                <div className="text-sm font-medium text-destructive">Odds: {noOdds.toFixed(2)}x</div>
              </div>
            </div>

            <div className="flex justify-between items-center text-sm text-neutral-dark">
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                <span>{wager.participantCount} participants</span>
              </div>
              <div>
                <span>Total Pool: ₦{totalPool.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-0">
          {isAdmin ? (
            <div className="w-full space-y-2">
              <div className="flex gap-2">
                <Button 
                  className="flex-1 bg-success hover:bg-success/90 text-white" 
                  onClick={() => handleResolveWager(wager.id, 'yes')}
                  disabled={isResolving}
                >
                  {isResolving ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  ) : (
                    <CheckCircle className="h-4 w-4 mr-2" />
                  )}
                  Resolve Yes
                </Button>
                <Button 
                  className="flex-1 bg-destructive hover:bg-destructive/90 text-white" 
                  onClick={() => handleResolveWager(wager.id, 'no')}
                  disabled={isResolving}
                >
                  {isResolving ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  ) : (
                    <XCircle className="h-4 w-4 mr-2" />
                  )}
                  Resolve No
                </Button>
              </div>
              <Button asChild variant="outline" className="w-full">
                <Link href={`/wagers/${wager.id}`}>View Details</Link>
              </Button>
            </div>
          ) : (
            <Button asChild className="w-full bg-accent hover:bg-accent-dark">
              <Link href={`/wagers/${wager.id}`}>Place Bet</Link>
            </Button>
          )}
        </CardFooter>
      </Card>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Success/Error Alerts */}
      {resolveSuccess && (
        <Alert className="mb-4 border-success bg-success/5">
          <CheckCircle className="h-4 w-4 text-success" />
          <AlertDescription className="text-success">{resolveSuccess}</AlertDescription>
        </Alert>
      )}
      
      {resolveError && (
        <Alert className="mb-4 border-destructive bg-destructive/5">
          <XCircle className="h-4 w-4 text-destructive" />
          <AlertDescription className="text-destructive">{resolveError}</AlertDescription>
        </Alert>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary">
            Prediction Markets
            {isAdmin && <Badge className="ml-2 bg-orange-500">Admin</Badge>}
          </h1>
          <p className="text-neutral-dark mt-1">
            {isAdmin 
              ? "Browse markets and resolve wagers as admin" 
              : "Browse and join prediction markets on various topics"
            }
          </p>
        </div>
        <Button asChild className="bg-accent hover:bg-accent-dark">
          <Link href="/wagers/create">Create a Wager</Link>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-64 space-y-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-medium mb-3">Category</h3>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-medium mb-3">Filters</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-neutral-dark block mb-1">Minimum Pool Size</label>
                <select className="w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm">
                  <option>Any</option>
                  <option>$1,000+</option>
                  <option>$5,000+</option>
                  <option>$10,000+</option>
                  <option>$50,000+</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-neutral-dark block mb-1">Deadline</label>
                <select className="w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm">
                  <option>Any</option>
                  <option>Today</option>
                  <option>This Week</option>
                  <option>This Month</option>
                  <option>This Year</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-neutral-dark block mb-1">Minimum Stake</label>
                <select className="w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm">
                  <option>Any</option>
                  <option>$5 or less</option>
                  <option>$10 or less</option>
                  <option>$25 or less</option>
                  <option>$50 or less</option>
                </select>
              </div>
              <Button className="w-full bg-primary hover:bg-primary-dark">
                <Filter className="h-4 w-4 mr-2" />
                Apply Filters
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="bg-white p-4 rounded-lg shadow mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-dark" />
                <Input
                  placeholder="Search markets..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <select
                className="rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Sort by: Newest</option>
                <option value="poolSize">Sort by: Pool Size</option>
                <option value="participants">Sort by: Participants</option>
                <option value="deadline">Sort by: Deadline (soonest)</option>
              </select>
            </div>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Markets</TabsTrigger>
              <TabsTrigger value="trending">
                <TrendingUp className="h-4 w-4 mr-2" />
                Trending
              </TabsTrigger>
              <TabsTrigger value="ending-soon">
                <Clock className="h-4 w-4 mr-2" />
                Ending Soon
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sortedWagers.map(renderWagerCard)}
              </div>
            </TabsContent>

            <TabsContent value="trending">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {trendingWagers.map(renderWagerCard)}
              </div>
            </TabsContent>

            <TabsContent value="ending-soon">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {endingSoonWagers.map(renderWagerCard)}
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-8 flex justify-center">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
              Load More
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}