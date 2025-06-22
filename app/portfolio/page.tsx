import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { 
  TrendingUp, 
  DollarSign, 
  Target, 
  Award, 
  Calendar,
  Users,
  BarChart3,
  PieChart,
  Activity,
  Clock,
  CheckCircle,
  XCircle
} from "lucide-react"

const monthlyData = [
  { month: "Jan", won: 1250, lost: 800 },
  { month: "Feb", won: 1800, lost: 600 },
  { month: "Mar", won: 2100, lost: 900 },
  { month: "Apr", won: 1950, lost: 1100 },
  { month: "May", won: 2400, lost: 800 },
  { month: "Jun", won: 2850, lost: 950 }
]

const recentBets = [
  {
    id: "bet-1",
    title: "Will Bitcoin exceed $100,000 by end of 2025?",
    category: "Crypto",
    position: "Yes",
    amount: 150,
    potentialWin: 285,
    status: "active",
    deadline: "Dec 31, 2025"
  },
  {
    id: "bet-2",
    title: "Will Apple release a foldable iPhone by the end of 2025?",
    category: "Technology",
    position: "No",
    amount: 200,
    potentialWin: 350,
    status: "active",
    deadline: "Dec 31, 2025"
  },
  {
    id: "bet-3",
    title: "Will the S&P 500 finish 2024 above 6,000 points?",
    category: "Finance",
    position: "Yes",
    amount: 100,
    potentialWin: 0,
    status: "won",
    deadline: "Dec 31, 2024",
    actualWin: 175
  },
  {
    id: "bet-4",
    title: "Will Ethereum 2.0 fully launch before July 2024?",
    category: "Crypto",
    position: "Yes",
    amount: 75,
    potentialWin: 0,
    status: "lost",
    deadline: "Jul 1, 2024"
  }
]

const categoryStats = [
  { category: "Crypto", bets: 12, won: 8, winRate: 67, profit: 850 },
  { category: "Sports", bets: 8, won: 5, winRate: 63, profit: 320 },
  { category: "Technology", bets: 6, won: 4, winRate: 67, profit: 280 },
  { category: "Finance", bets: 5, won: 3, winRate: 60, profit: 190 },
  { category: "Politics", bets: 4, won: 2, winRate: 50, profit: -50 }
]

export default function PortfolioPage() {
  const yearToDateWinnings = 12450
  const monthlyWinnings = 2850
  const totalBets = 45
  const winRate = 64
  const activeBets = 8
  const totalProfit = yearToDateWinnings - 8500 // assuming 8500 total wagered

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary">My Portfolio</h1>
          <p className="text-neutral-dark mt-1">Track your betting performance and analytics</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
            <BarChart3 className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button asChild className="bg-accent hover:bg-accent-dark">
            <Link href="/wagers">Browse Markets</Link>
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Year to Date</CardTitle>
            <DollarSign className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">${yearToDateWinnings.toLocaleString()}</div>
            <p className="text-xs text-neutral-dark">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +15.2% from last year
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <Calendar className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${monthlyWinnings.toLocaleString()}</div>
            <p className="text-xs text-neutral-dark">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +8.3% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
            <Target className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{winRate}%</div>
            <p className="text-xs text-neutral-dark">
              {totalBets} total bets placed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
            <Award className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${totalProfit >= 0 ? 'text-success' : 'text-destructive'}`}>
              ${totalProfit.toLocaleString()}
            </div>
            <p className="text-xs text-neutral-dark">
              {activeBets} active positions
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Monthly Performance Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Monthly Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyData.map((data, index) => (
                <div key={data.month} className="flex items-center space-x-4">
                  <div className="w-8 text-sm font-medium">{data.month}</div>
                  <div className="flex-1 flex items-center space-x-2">
                    <div className="flex-1 bg-neutral-light rounded-full h-6 relative overflow-hidden">
                      <div 
                        className="bg-success h-full rounded-full flex items-center justify-end pr-2" 
                        style={{ width: `${(data.won / 3000) * 100}%` }}
                      >
                        <span className="text-xs text-white font-medium">${data.won}</span>
                      </div>
                    </div>
                    <div className="w-16 text-right">
                      <div className="text-sm font-medium text-success">${data.won}</div>
                      <div className="text-xs text-destructive">-${data.lost}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Category Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChart className="h-5 w-5 mr-2" />
              Category Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categoryStats.map((stat) => (
                <div key={stat.category} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{stat.category}</span>
                    <Badge variant={stat.profit >= 0 ? "default" : "destructive"} className="text-xs">
                      {stat.profit >= 0 ? '+' : ''}${stat.profit}
                    </Badge>
                  </div>
                  <div className="flex justify-between text-xs text-neutral-dark">
                    <span>{stat.won}/{stat.bets} won</span>
                    <span>{stat.winRate}% win rate</span>
                  </div>
                  <div className="w-full bg-neutral-light rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${stat.winRate}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Bets */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="h-5 w-5 mr-2" />
            Recent Bets
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Bets</TabsTrigger>
              <TabsTrigger value="active">
                <Clock className="h-4 w-4 mr-2" />
                Active ({activeBets})
              </TabsTrigger>
              <TabsTrigger value="won">
                <CheckCircle className="h-4 w-4 mr-2" />
                Won
              </TabsTrigger>
              <TabsTrigger value="lost">
                <XCircle className="h-4 w-4 mr-2" />
                Lost
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4">
              {recentBets.map((bet) => (
                <div key={bet.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-neutral-light/50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className="bg-primary hover:bg-primary text-xs">{bet.category}</Badge>
                      <Badge 
                        variant={bet.position === 'Yes' ? 'default' : 'secondary'} 
                        className="text-xs"
                      >
                        {bet.position}
                      </Badge>
                      <Badge 
                        variant={
                          bet.status === 'won' ? 'default' : 
                          bet.status === 'lost' ? 'destructive' : 
                          'outline'
                        }
                        className="text-xs"
                      >
                        {bet.status}
                      </Badge>
                    </div>
                    <h4 className="font-medium text-sm mb-1">{bet.title}</h4>
                    <p className="text-xs text-neutral-dark">Deadline: {bet.deadline}</p>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="font-medium text-sm">Staked: ${bet.amount}</div>
                    {bet.status === 'active' && (
                      <div className="text-xs text-success">Potential: ${bet.potentialWin}</div>
                    )}
                    {bet.status === 'won' && (
                      <div className="text-xs text-success">Won: ${bet.actualWin}</div>
                    )}
                    {bet.status === 'lost' && (
                      <div className="text-xs text-destructive">Lost</div>
                    )}
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="active" className="space-y-4">
              {recentBets.filter(bet => bet.status === 'active').map((bet) => (
                <div key={bet.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-neutral-light/50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className="bg-primary hover:bg-primary text-xs">{bet.category}</Badge>
                      <Badge 
                        variant={bet.position === 'Yes' ? 'default' : 'secondary'} 
                        className="text-xs"
                      >
                        {bet.position}
                      </Badge>
                    </div>
                    <h4 className="font-medium text-sm mb-1">{bet.title}</h4>
                    <p className="text-xs text-neutral-dark">Deadline: {bet.deadline}</p>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="font-medium text-sm">Staked: ${bet.amount}</div>
                    <div className="text-xs text-success">Potential: ${bet.potentialWin}</div>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="won" className="space-y-4">
              {recentBets.filter(bet => bet.status === 'won').map((bet) => (
                <div key={bet.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-neutral-light/50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className="bg-primary hover:bg-primary text-xs">{bet.category}</Badge>
                      <Badge 
                        variant={bet.position === 'Yes' ? 'default' : 'secondary'} 
                        className="text-xs"
                      >
                        {bet.position}
                      </Badge>
                    </div>
                    <h4 className="font-medium text-sm mb-1">{bet.title}</h4>
                    <p className="text-xs text-neutral-dark">Deadline: {bet.deadline}</p>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="font-medium text-sm">Staked: ${bet.amount}</div>
                    <div className="text-xs text-success">Won: ${bet.actualWin}</div>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="lost" className="space-y-4">
              {recentBets.filter(bet => bet.status === 'lost').map((bet) => (
                <div key={bet.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-neutral-light/50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className="bg-primary hover:bg-primary text-xs">{bet.category}</Badge>
                      <Badge 
                        variant={bet.position === 'Yes' ? 'default' : 'secondary'} 
                        className="text-xs"
                      >
                        {bet.position}
                      </Badge>
                    </div>
                    <h4 className="font-medium text-sm mb-1">{bet.title}</h4>
                    <p className="text-xs text-neutral-dark">Deadline: {bet.deadline}</p>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="font-medium text-sm">Staked: ${bet.amount}</div>
                    <div className="text-xs text-destructive">Lost</div>
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}