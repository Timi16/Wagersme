"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Trophy, TrendingUp, Calendar, Medal, Award, Crown } from "lucide-react"

export default function LeaderboardPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Mock leaderboard data
  const leaderboardData = [
    {
      id: "user-1",
      rank: 1,
      name: "CryptoKing",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "CK",
      winnings: 12450,
      bets: 78,
      winRate: 68,
      badges: ["Crypto Expert", "Early Adopter"],
      verified: true,
    },
    {
      id: "user-2",
      rank: 2,
      name: "PredictionPro",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "PP",
      winnings: 9870,
      bets: 65,
      winRate: 72,
      badges: ["Sports Guru"],
      verified: true,
    },
    {
      id: "user-3",
      rank: 3,
      name: "MarketMaster",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "MM",
      winnings: 8540,
      bets: 92,
      winRate: 61,
      badges: ["Finance Wizard", "Top Creator"],
      verified: true,
    },
    {
      id: "user-4",
      rank: 4,
      name: "BettingQueen",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "BQ",
      winnings: 7320,
      bets: 54,
      winRate: 70,
      badges: ["Politics Expert"],
      verified: false,
    },
    {
      id: "user-5",
      rank: 5,
      name: "FutureSeer",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "FS",
      winnings: 6890,
      bets: 81,
      winRate: 58,
      badges: ["Tech Oracle"],
      verified: true,
    },
    {
      id: "user-6",
      rank: 6,
      name: "OddsWizard",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "OW",
      winnings: 5670,
      bets: 63,
      winRate: 65,
      badges: ["Entertainment Guru"],
      verified: false,
    },
    {
      id: "user-7",
      rank: 7,
      name: "BetHunter",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "BH",
      winnings: 4980,
      bets: 72,
      winRate: 59,
      badges: ["Sports Fan"],
      verified: true,
    },
    {
      id: "user-8",
      rank: 8,
      name: "PredictorX",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "PX",
      winnings: 4350,
      bets: 58,
      winRate: 62,
      badges: ["Crypto Enthusiast"],
      verified: false,
    },
    {
      id: "user-9",
      rank: 9,
      name: "FortuneForecaster",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "FF",
      winnings: 3890,
      bets: 49,
      winRate: 63,
      badges: ["Science Buff"],
      verified: true,
    },
    {
      id: "user-10",
      rank: 10,
      name: "WagerWinner",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "WW",
      winnings: 3240,
      bets: 45,
      winRate: 60,
      badges: ["Trivia Master"],
      verified: false,
    },
  ]

  const filteredUsers = leaderboardData.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory =
      selectedCategory === "all" ||
      (selectedCategory === "verified" && user.verified) ||
      user.badges.some((badge) => badge.toLowerCase().includes(selectedCategory.toLowerCase()))
    return matchesSearch && matchesCategory
  })

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 3:
        return <Award className="h-5 w-5 text-amber-700" />
      default:
        return <span className="text-neutral-dark font-medium">{rank}</span>
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary">Leaderboard</h1>
          <p className="text-neutral-dark mt-1">See who's winning big on BetWise</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-yellow-400 to-amber-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-xl">
              <Crown className="h-6 w-6 mr-2" />
              Top Winner
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Avatar className="h-16 w-16 border-2 border-white">
                <AvatarImage src={leaderboardData[0].avatar || "/placeholder.svg"} alt={leaderboardData[0].name} />
                <AvatarFallback>{leaderboardData[0].initials}</AvatarFallback>
              </Avatar>
              <div className="ml-4">
                <div className="text-2xl font-bold">{leaderboardData[0].name}</div>
                <div className="text-sm opacity-90">{leaderboardData[0].badges.map((badge) => badge).join(" • ")}</div>
                <div className="text-xl font-bold mt-2">${leaderboardData[0].winnings.toLocaleString()}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-xl">
              <TrendingUp className="h-6 w-6 mr-2 text-secondary" />
              Highest Win Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Avatar className="h-16 w-16 border-2 border-secondary">
                <AvatarImage src={leaderboardData[1].avatar || "/placeholder.svg"} alt={leaderboardData[1].name} />
                <AvatarFallback>{leaderboardData[1].initials}</AvatarFallback>
              </Avatar>
              <div className="ml-4">
                <div className="text-2xl font-bold">{leaderboardData[1].name}</div>
                <div className="text-sm text-neutral-dark">
                  {leaderboardData[1].badges.map((badge) => badge).join(" • ")}
                </div>
                <div className="text-xl font-bold mt-2 text-secondary">{leaderboardData[1].winRate}% Win Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-xl">
              <Calendar className="h-6 w-6 mr-2 text-accent" />
              Most Active
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Avatar className="h-16 w-16 border-2 border-accent">
                <AvatarImage src={leaderboardData[2].avatar || "/placeholder.svg"} alt={leaderboardData[2].name} />
                <AvatarFallback>{leaderboardData[2].initials}</AvatarFallback>
              </Avatar>
              <div className="ml-4">
                <div className="text-2xl font-bold">{leaderboardData[2].name}</div>
                <div className="text-sm text-neutral-dark">
                  {leaderboardData[2].badges.map((badge) => badge).join(" • ")}
                </div>
                <div className="text-xl font-bold mt-2 text-accent">{leaderboardData[2].bets} Bets Placed</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Performers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-dark" />
              <Input
                placeholder="Search users..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="verified">Verified Users</SelectItem>
                <SelectItem value="crypto">Crypto</SelectItem>
                <SelectItem value="sports">Sports</SelectItem>
                <SelectItem value="politics">Politics</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="tech">Technology</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs defaultValue="all-time" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="all-time">All Time</TabsTrigger>
              <TabsTrigger value="monthly">This Month</TabsTrigger>
              <TabsTrigger value="weekly">This Week</TabsTrigger>
            </TabsList>
            <TabsContent value="all-time">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-4 px-2 w-16">Rank</th>
                      <th className="text-left py-4 px-2">User</th>
                      <th className="text-right py-4 px-2">Total Winnings</th>
                      <th className="text-right py-4 px-2 hidden md:table-cell">Bets Placed</th>
                      <th className="text-right py-4 px-2 hidden md:table-cell">Win Rate</th>
                      <th className="text-right py-4 px-2 hidden lg:table-cell">Expertise</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="border-b hover:bg-neutral-light">
                        <td className="py-4 px-2">
                          <div className="flex justify-center items-center h-8 w-8 rounded-full bg-neutral-light">
                            {getRankIcon(user.rank)}
                          </div>
                        </td>
                        <td className="py-4 px-2">
                          <div className="flex items-center">
                            <Avatar className="h-10 w-10 mr-3">
                              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                              <AvatarFallback>{user.initials}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium flex items-center">
                                {user.name}
                                {user.verified && <Badge className="ml-2 bg-primary hover:bg-primary">Verified</Badge>}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-2 text-right font-medium">${user.winnings.toLocaleString()}</td>
                        <td className="py-4 px-2 text-right hidden md:table-cell">{user.bets}</td>
                        <td className="py-4 px-2 text-right hidden md:table-cell">{user.winRate}%</td>
                        <td className="py-4 px-2 text-right hidden lg:table-cell">
                          <div className="flex flex-wrap justify-end gap-2">
                            {user.badges.map((badge, index) => (
                              <Badge key={index} variant="outline" className="bg-neutral-light">
                                {badge}
                              </Badge>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            <TabsContent value="monthly">
              <div className="text-center py-8 text-neutral-dark">Monthly leaderboard data will be displayed here.</div>
            </TabsContent>
            <TabsContent value="weekly">
              <div className="text-center py-8 text-neutral-dark">Weekly leaderboard data will be displayed here.</div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
