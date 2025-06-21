import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Search, Filter, Clock, Users, TrendingUp } from "lucide-react"

const categories = [
  "All",
  "Sports",
  "Politics",
  "Crypto",
  "Entertainment",
  "Science",
  "Technology",
  "Finance",
  "Trivia",
]

const wagers = [
  {
    id: "wager-1",
    title: "Will Bitcoin exceed $100,000 by end of 2025?",
    category: "Crypto",
    deadline: "Dec 31, 2025",
    poolYes: 12500,
    poolNo: 7500,
    participants: 156,
    minStake: 5,
  },
  {
    id: "wager-2",
    title: "Will the Democrats win the 2024 US Presidential Election?",
    category: "Politics",
    deadline: "Nov 5, 2024",
    poolYes: 18000,
    poolNo: 22000,
    participants: 312,
    minStake: 10,
  },
  {
    id: "wager-3",
    title: "Will SpaceX successfully land humans on Mars before 2030?",
    category: "Science",
    deadline: "Dec 31, 2029",
    poolYes: 9000,
    poolNo: 21000,
    participants: 245,
    minStake: 5,
  },
  {
    id: "wager-4",
    title: "Will Apple release a foldable iPhone by the end of 2025?",
    category: "Technology",
    deadline: "Dec 31, 2025",
    poolYes: 8500,
    poolNo: 11500,
    participants: 178,
    minStake: 5,
  },
  {
    id: "wager-5",
    title: "Will Taylor Swift win Album of the Year at the 2025 Grammy Awards?",
    category: "Entertainment",
    deadline: "Feb 15, 2025",
    poolYes: 15000,
    poolNo: 5000,
    participants: 267,
    minStake: 5,
  },
  {
    id: "wager-6",
    title: "Will the S&P 500 finish 2024 above 6,000 points?",
    category: "Finance",
    deadline: "Dec 31, 2024",
    poolYes: 14000,
    poolNo: 16000,
    participants: 203,
    minStake: 10,
  },
  {
    id: "wager-7",
    title: "Will Manchester City win the 2024-25 Premier League?",
    category: "Sports",
    deadline: "May 25, 2025",
    poolYes: 5000,
    poolNo: 3000,
    participants: 67,
    minStake: 5,
  },
  {
    id: "wager-8",
    title: "Will Ethereum 2.0 fully launch before July 2024?",
    category: "Crypto",
    deadline: "Jul 1, 2024",
    poolYes: 4200,
    poolNo: 6800,
    participants: 89,
    minStake: 10,
  },
  {
    id: "wager-9",
    title: "Will the next iPhone have a USB-C port?",
    category: "Technology",
    deadline: "Sep 30, 2024",
    poolYes: 7500,
    poolNo: 2500,
    participants: 112,
    minStake: 5,
  },
]

export default function WagersPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary">Prediction Markets</h1>
          <p className="text-neutral-dark mt-1">Browse and join prediction markets on various topics</p>
        </div>
        <Button asChild className="bg-accent hover:bg-accent-dark">
          <Link href="/wagers/create">Create a Wager</Link>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-64 space-y-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-medium mb-3">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`category-${category}`}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    defaultChecked={category === "All"}
                  />
                  <label htmlFor={`category-${category}`} className="ml-2 text-sm text-neutral-dark">
                    {category}
                  </label>
                </div>
              ))}
            </div>
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
                <Input placeholder="Search markets..." className="pl-10" />
              </div>
              <select className="rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm">
                <option>Sort by: Newest</option>
                <option>Sort by: Pool Size</option>
                <option>Sort by: Participants</option>
                <option>Sort by: Deadline (soonest)</option>
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
                {wagers.map((wager) => {
                  const totalPool = wager.poolYes + wager.poolNo
                  const yesPercentage = (wager.poolYes / totalPool) * 100
                  const noPercentage = (wager.poolNo / totalPool) * 100
                  const yesOdds = totalPool / wager.poolYes
                  const noOdds = totalPool / wager.poolNo

                  return (
                    <Card key={wager.id} className="overflow-hidden">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <Badge className="bg-primary hover:bg-primary">{wager.category}</Badge>
                          <div className="flex items-center text-sm text-neutral-dark">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{wager.deadline}</span>
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
                            <div className="flex justify-between text-sm mb-1">
                              <span className="font-medium text-success">Yes: {yesPercentage.toFixed(0)}%</span>
                              <span className="font-medium text-destructive">No: {noPercentage.toFixed(0)}%</span>
                            </div>
                            <div className="flex h-2 rounded-full overflow-hidden">
                              <div className="bg-success" style={{ width: `${yesPercentage}%` }} />
                              <div className="bg-destructive" style={{ width: `${noPercentage}%` }} />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="bg-neutral-light p-2 rounded">
                              <div className="text-neutral-dark">Yes Odds</div>
                              <div className="font-semibold">{yesOdds.toFixed(2)}x</div>
                            </div>
                            <div className="bg-neutral-light p-2 rounded">
                              <div className="text-neutral-dark">No Odds</div>
                              <div className="font-semibold">{noOdds.toFixed(2)}x</div>
                            </div>
                          </div>

                          <div className="flex justify-between items-center text-sm text-neutral-dark">
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-1" />
                              <span>{wager.participants} participants</span>
                            </div>
                            <div>
                              <span>Min Stake: ${wager.minStake}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <Button asChild className="w-full bg-accent hover:bg-accent-dark">
                          <Link href={`/wagers/${wager.id}`}>Place Bet</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>
            <TabsContent value="trending">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {wagers.slice(3, 7).map((wager) => {
                  const totalPool = wager.poolYes + wager.poolNo
                  const yesPercentage = (wager.poolYes / totalPool) * 100
                  const noPercentage = (wager.poolNo / totalPool) * 100
                  const yesOdds = totalPool / wager.poolYes
                  const noOdds = totalPool / wager.poolNo

                  return (
                    <Card key={wager.id} className="overflow-hidden">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <Badge className="bg-secondary hover:bg-secondary">{wager.category}</Badge>
                          <div className="flex items-center text-sm text-neutral-dark">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{wager.deadline}</span>
                          </div>
                        </div>
                        <CardTitle className="text-lg mt-2">
                          <Link href={`/wagers/${wager.id}`} className="hover:text-secondary transition-colors">
                            {wager.title}
                          </Link>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="font-medium text-success">Yes: {yesPercentage.toFixed(0)}%</span>
                              <span className="font-medium text-destructive">No: {noPercentage.toFixed(0)}%</span>
                            </div>
                            <div className="flex h-2 rounded-full overflow-hidden">
                              <div className="bg-success" style={{ width: `${yesPercentage}%` }} />
                              <div className="bg-destructive" style={{ width: `${noPercentage}%` }} />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="bg-neutral-light p-2 rounded">
                              <div className="text-neutral-dark">Yes Odds</div>
                              <div className="font-semibold">{yesOdds.toFixed(2)}x</div>
                            </div>
                            <div className="bg-neutral-light p-2 rounded">
                              <div className="text-neutral-dark">No Odds</div>
                              <div className="font-semibold">{noOdds.toFixed(2)}x</div>
                            </div>
                          </div>

                          <div className="flex justify-between items-center text-sm">
                            <div className="flex items-center text-neutral-dark">
                              <Users className="h-4 w-4 mr-1" />
                              <span>{wager.participants} participants</span>
                            </div>
                            <div className="flex items-center text-secondary font-medium">
                              <TrendingUp className="h-4 w-4 mr-1" />
                              <span>+{Math.floor(Math.random() * 30 + 20)}%</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <Button asChild className="w-full bg-accent hover:bg-accent-dark">
                          <Link href={`/wagers/${wager.id}`}>Place Bet</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>
            <TabsContent value="ending-soon">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {wagers.slice(5, 9).map((wager) => {
                  const totalPool = wager.poolYes + wager.poolNo
                  const yesPercentage = (wager.poolYes / totalPool) * 100
                  const noPercentage = (wager.poolNo / totalPool) * 100
                  const yesOdds = totalPool / wager.poolYes
                  const noOdds = totalPool / wager.poolNo

                  return (
                    <Card key={wager.id} className="overflow-hidden">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <Badge className="bg-accent hover:bg-accent">{wager.category}</Badge>
                          <div className="flex items-center text-sm text-neutral-dark">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{wager.deadline}</span>
                          </div>
                        </div>
                        <CardTitle className="text-lg mt-2">
                          <Link href={`/wagers/${wager.id}`} className="hover:text-accent transition-colors">
                            {wager.title}
                          </Link>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="font-medium text-success">Yes: {yesPercentage.toFixed(0)}%</span>
                              <span className="font-medium text-destructive">No: {noPercentage.toFixed(0)}%</span>
                            </div>
                            <div className="flex h-2 rounded-full overflow-hidden">
                              <div className="bg-success" style={{ width: `${yesPercentage}%` }} />
                              <div className="bg-destructive" style={{ width: `${noPercentage}%` }} />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="bg-neutral-light p-2 rounded">
                              <div className="text-neutral-dark">Yes Odds</div>
                              <div className="font-semibold">{yesOdds.toFixed(2)}x</div>
                            </div>
                            <div className="bg-neutral-light p-2 rounded">
                              <div className="text-neutral-dark">No Odds</div>
                              <div className="font-semibold">{noOdds.toFixed(2)}x</div>
                            </div>
                          </div>

                          <div className="flex justify-between items-center text-sm text-neutral-dark">
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-1" />
                              <span>{wager.participants} participants</span>
                            </div>
                            <div>
                              <span>Min Stake: ${wager.minStake}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <Button asChild className="w-full bg-accent hover:bg-accent-dark">
                          <Link href={`/wagers/${wager.id}`}>Place Bet</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  )
                })}
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
