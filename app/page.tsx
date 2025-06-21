import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FeaturedWagers } from "@/components/featured-wagers"
import { TrendingWagers } from "@/components/trending-wagers"
import { RecentWagers } from "@/components/recent-wagers"
import Link from "next/link"
import { ArrowRight, TrendingUp, Clock, Zap } from "lucide-react"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 py-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">Predict. Bet. Win.</h1>
            <p className="text-xl mb-6 text-neutral-dark">
              Join the smartest prediction market platform where you can bet on anything from sports to politics with
              dynamic odds.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-accent hover:bg-accent-dark text-white">
                <Link href="/wagers/create">Create a Wager</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-white"
              >
                <Link href="/wagers">Explore Markets</Link>
              </Button>
            </div>
          </div>
          <div className="w-full md:w-1/3 bg-neutral-light rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-primary">Platform Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-md shadow">
                <p className="text-sm text-neutral-dark">Active Wagers</p>
                <p className="text-2xl font-bold text-primary">1,248</p>
              </div>
              <div className="bg-white p-4 rounded-md shadow">
                <p className="text-sm text-neutral-dark">Total Users</p>
                <p className="text-2xl font-bold text-primary">24,680</p>
              </div>
              <div className="bg-white p-4 rounded-md shadow">
                <p className="text-sm text-neutral-dark">Total Volume</p>
                <p className="text-2xl font-bold text-primary">$1.2M</p>
              </div>
              <div className="bg-white p-4 rounded-md shadow">
                <p className="text-sm text-neutral-dark">Avg. Return</p>
                <p className="text-2xl font-bold text-success">+18%</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-primary">Explore Markets</h2>
          <Button asChild variant="ghost" className="text-primary">
            <Link href="/wagers" className="flex items-center">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <Tabs defaultValue="featured" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="featured" className="flex items-center">
              <Zap className="mr-2 h-4 w-4" /> Featured
            </TabsTrigger>
            <TabsTrigger value="trending" className="flex items-center">
              <TrendingUp className="mr-2 h-4 w-4" /> Trending
            </TabsTrigger>
            <TabsTrigger value="recent" className="flex items-center">
              <Clock className="mr-2 h-4 w-4" /> Recent
            </TabsTrigger>
          </TabsList>
          <TabsContent value="featured">
            <FeaturedWagers />
          </TabsContent>
          <TabsContent value="trending">
            <TrendingWagers />
          </TabsContent>
          <TabsContent value="recent">
            <RecentWagers />
          </TabsContent>
        </Tabs>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-primary">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
                  1
                </div>
                Create or Join
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Create your own wager or join existing ones. Set your terms or browse markets that interest you.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
                  2
                </div>
                Place Your Bet
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Choose "Yes" or "No" and enter your stake. Our dynamic odds system shows your potential payout in
                real-time.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
                  3
                </div>
                Collect Winnings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                When the event settles, winners automatically receive their share of the pool, minus our 10% platform
                fee.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6 text-primary">Popular Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {["Sports", "Politics", "Crypto", "Entertainment", "Science", "Technology", "Finance", "Trivia"].map(
            (category) => (
              <Link
                href={`/wagers/category/${category.toLowerCase()}`}
                key={category}
                className="bg-white hover:bg-neutral-light transition-colors duration-200 p-6 rounded-lg shadow text-center"
              >
                <h3 className="text-lg font-semibold text-primary">{category}</h3>
                <p className="text-sm text-neutral-dark mt-2">Explore {category} markets</p>
              </Link>
            ),
          )}
        </div>
      </section>
      <p className="text-sm">© 2025 WagerMe. All rights reserved.</p>
    </div>
  )
}
