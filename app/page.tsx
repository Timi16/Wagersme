import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FeaturedWagers } from "@/components/featured-wagers"
import { TrendingWagers } from "@/components/trending-wagers"
import { RecentWagers } from "@/components/recent-wagers"
import Link from "next/link"
import { ArrowRight, TrendingUp, Clock, Zap, Shield, Users, BarChart3, Settings } from "lucide-react"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="mb-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 py-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">Predict. Bet. Win.</h1>
            <p className="text-xl mb-4 text-neutral-dark">
              Join the smartest prediction market platform where you can bet on anything from sports to politics with
              dynamic odds.
            </p>
            <p className="text-lg mb-6 text-neutral-dark">
              Create your own wagers, explore trending markets, and participate in a community-driven prediction 
              platform with transparent odds and automatic settlements.
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
            <h3 className="text-xl font-semibold mb-4 text-primary flex items-center">
              <BarChart3 className="mr-2 h-5 w-5" />
              Platform Stats
            </h3>
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

      {/* Platform Features */}
      <section className="mb-12 bg-neutral-light rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-primary text-center">What Makes WagerMe Different</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Zap className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-semibold text-primary mb-2">Dynamic Odds</h3>
            <p className="text-sm text-neutral-dark">Real-time odds that adjust based on market activity and betting patterns</p>
          </div>
          <div className="text-center">
            <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-semibold text-primary mb-2">Community Markets</h3>
            <p className="text-sm text-neutral-dark">Join existing wagers or create your own custom prediction markets</p>
          </div>
          <div className="text-center">
            <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-semibold text-primary mb-2">Transparent Fees</h3>
            <p className="text-sm text-neutral-dark">Clear 10% platform fee with automatic settlement and payout system</p>
          </div>
          <div className="text-center">
            <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Settings className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-semibold text-primary mb-2">Custom Terms</h3>
            <p className="text-sm text-neutral-dark">Set your own wager terms, resolution criteria, and participation rules</p>
          </div>
        </div>
      </section>

      {/* Market Categories Preview */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-primary">Available Market Categories</h2>
        <p className="text-neutral-dark mb-6">
          Browse and participate in prediction markets across diverse categories. Each category offers 
          different types of wagers with varying complexity and time horizons.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {["Sports", "Politics", "Crypto", "Entertainment", "Science", "Technology", "Finance", "Trivia"].map(
            (category) => (
              <Link
                href={`/wagers/category/${category.toLowerCase()}`}
                key={category}
                className="bg-white hover:bg-neutral-light transition-colors duration-200 p-6 rounded-lg shadow text-center group"
              >
                <h3 className="text-lg font-semibold text-primary group-hover:text-accent">{category}</h3>
                <p className="text-sm text-neutral-dark mt-2">Explore {category} markets</p>
              </Link>
            ),
          )}
        </div>
      </section>

      {/* Markets Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-primary">Explore Markets</h2>
            <p className="text-neutral-dark">Discover active wagers across different categories and time frames</p>
          </div>
          <Button asChild variant="ghost" className="text-primary">
            <Link href="/wagers" className="flex items-center">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="bg-white rounded-lg p-4 mb-6 border">
          <p className="text-sm text-neutral-dark">
            <strong>Market Types:</strong> Featured markets are curated by our team, Trending markets show high activity, 
            and Recent markets display the latest wagers created by the community.
          </p>
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

      {/* How It Works - Enhanced */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-primary">How It Works</h2>
        <p className="text-neutral-dark mb-8 max-w-3xl">
          WagerMe operates as a prediction market where users can create wagers on future events or join existing ones. 
          The platform uses a dynamic odds system and community-driven approach to determine payouts.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
                  1
                </div>
                Create or Join
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Create your own wager or join existing ones. Set your terms or browse markets that interest you.</p>
              <ul className="text-sm text-neutral-dark space-y-1">
                <li>• Browse by category (Sports, Politics, Crypto, etc.)</li>
                <li>• Filter by resolution date and stake amount</li>
                <li>• Create custom wager terms and conditions</li>
                <li>• Set resolution criteria and end dates</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
                  2
                </div>
                Place Your Bet
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Choose "Yes" or "No" and enter your stake. Our dynamic odds system shows your potential payout in
                real-time.
              </p>
              <ul className="text-sm text-neutral-dark space-y-1">
                <li>• View current odds and total pool size</li>
                <li>• See potential payout before confirming</li>
                <li>• Odds adjust based on betting activity</li>
                <li>• Minimum and maximum stake limits apply</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
                  3
                </div>
                Collect Winnings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                When the event settles, winners automatically receive their share of the pool, minus our 10% platform
                fee.
              </p>
              <ul className="text-sm text-neutral-dark space-y-1">
                <li>• Automatic settlement when resolution occurs</li>
                <li>• Winners split the total pool proportionally</li>
                <li>• 10% platform fee deducted from total pool</li>
                <li>• Winnings credited directly to your account</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Platform Rules and Information */}
      <section className="mb-12 bg-gradient-to-r from-neutral-light to-white rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-primary">Platform Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-3 text-primary">Betting Structure</h3>
            <ul className="space-y-2 text-neutral-dark">
              <li>• Binary outcomes: "Yes" or "No" predictions</li>
              <li>• Dynamic odds based on pool distribution</li>
              <li>• Minimum stake requirements vary by wager</li>
              <li>• Pool-based system where winners share total stakes</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3 text-primary">Resolution Process</h3>
            <ul className="space-y-2 text-neutral-dark">
              <li>• Events resolve based on predetermined criteria</li>
              <li>• Community verification for certain markets</li>
              <li>• Automatic payout distribution after resolution</li>
              <li>• Dispute resolution system for contested outcomes</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3 text-primary">Market Creation</h3>
            <ul className="space-y-2 text-neutral-dark">
              <li>• Anyone can create custom prediction markets</li>
              <li>• Set your own terms and resolution criteria</li>
              <li>• Choose category and set end date</li>
              <li>• Markets require community participation to activate</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3 text-primary">Account Features</h3>
            <ul className="space-y-2 text-neutral-dark">
              <li>• Track your betting history and performance</li>
              <li>• View active and settled wagers</li>
              <li>• Monitor account balance and transactions</li>
              <li>• Access featured, trending, and recent markets</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Getting Started Section */}
      <section className="mb-12 text-center bg-primary/5 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4 text-primary">Ready to Start Predicting?</h2>
        <p className="text-lg text-neutral-dark mb-6 max-w-2xl mx-auto">
          Browse existing markets to get started, or create your own wager on any future event. 
          Join the community of predictors and put your knowledge to the test.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-accent hover:bg-accent-dark text-white">
            <Link href="/wagers/create">Create Your First Wager</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-white">
            <Link href="/wagers">Browse All Markets</Link>
          </Button>
        </div>
      </section>

      <footer className="border-t pt-4">
        <p className="text-sm text-neutral-dark">© 2025 WagerMe. All rights reserved.</p>
      </footer>
    </div>
  )
}