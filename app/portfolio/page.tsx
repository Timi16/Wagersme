import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
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
  XCircle,
  Download,
  ExternalLink
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
  const totalProfit = yearToDateWinnings - 8500

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {/* Header - Mobile Optimized */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1">My Portfolio</h1>
              <p className="text-gray-600 text-sm sm:text-base">Track your betting performance and analytics</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white text-sm py-2 px-3">
                <Download className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Export Report</span>
                <span className="sm:hidden">Export</span>
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700 text-sm py-2 px-3">
                <ExternalLink className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Browse Markets</span>
                <span className="sm:hidden">Markets</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Key Metrics - Mobile Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
          <Card className="p-3 sm:p-6">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0 sm:pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-gray-600">YTD</CardTitle>
              <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
            </CardHeader>
            <CardContent className="p-0 mt-2">
              <div className="text-lg sm:text-2xl font-bold text-green-600">${yearToDateWinnings.toLocaleString()}</div>
              <p className="text-xs text-gray-500 mt-1">
                <TrendingUp className="inline h-2 w-2 sm:h-3 sm:w-3 mr-1" />
                +15.2%
              </p>
            </CardContent>
          </Card>

          <Card className="p-3 sm:p-6">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0 sm:pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-gray-600">Month</CardTitle>
              <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
            </CardHeader>
            <CardContent className="p-0 mt-2">
              <div className="text-lg sm:text-2xl font-bold">${monthlyWinnings.toLocaleString()}</div>
              <p className="text-xs text-gray-500 mt-1">
                <TrendingUp className="inline h-2 w-2 sm:h-3 sm:w-3 mr-1" />
                +8.3%
              </p>
            </CardContent>
          </Card>

          <Card className="p-3 sm:p-6">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0 sm:pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-gray-600">Win Rate</CardTitle>
              <Target className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600" />
            </CardHeader>
            <CardContent className="p-0 mt-2">
              <div className="text-lg sm:text-2xl font-bold">{winRate}%</div>
              <p className="text-xs text-gray-500 mt-1">
                {totalBets} bets
              </p>
            </CardContent>
          </Card>

          <Card className="p-3 sm:p-6">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0 sm:pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-gray-600">Profit</CardTitle>
              <Award className="h-3 w-3 sm:h-4 sm:w-4 text-orange-600" />
            </CardHeader>
            <CardContent className="p-0 mt-2">
              <div className={`text-lg sm:text-2xl font-bold ${totalProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${totalProfit.toLocaleString()}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {activeBets} active
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section - Mobile Stack */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8 mb-6 sm:mb-8">
          {/* Monthly Performance Chart */}
          <Card className="lg:col-span-2 p-4 sm:p-6">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="flex items-center text-base sm:text-lg">
                <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                Monthly Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-3 sm:space-y-4">
                {monthlyData.map((data, index) => (
                  <div key={data.month} className="flex items-center space-x-2 sm:space-x-4">
                    <div className="w-6 sm:w-8 text-xs sm:text-sm font-medium">{data.month}</div>
                    <div className="flex-1 flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-4 sm:h-6 relative overflow-hidden">
                        <div 
                          className="bg-green-600 h-full rounded-full flex items-center justify-end pr-1 sm:pr-2" 
                          style={{ width: `${(data.won / 3000) * 100}%` }}
                        >
                          <span className="text-xs text-white font-medium hidden sm:inline">${data.won}</span>
                        </div>
                      </div>
                      <div className="w-12 sm:w-16 text-right">
                        <div className="text-xs sm:text-sm font-medium text-green-600">${data.won}</div>
                        <div className="text-xs text-red-600">-${data.lost}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Category Performance */}
          <Card className="p-4 sm:p-6">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="flex items-center text-base sm:text-lg">
                <PieChart className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                Category Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-3 sm:space-y-4">
                {categoryStats.map((stat) => (
                  <div key={stat.category} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs sm:text-sm font-medium">{stat.category}</span>
                      <Badge variant={stat.profit >= 0 ? "default" : "destructive"} className="text-xs px-1 py-0">
                        {stat.profit >= 0 ? '+' : ''}${stat.profit}
                      </Badge>
                    </div>
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>{stat.won}/{stat.bets} won</span>
                      <span>{stat.winRate}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                      <div 
                        className="bg-blue-600 h-1.5 sm:h-2 rounded-full" 
                        style={{ width: `${stat.winRate}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Bets - Mobile Optimized */}
        <Card className="p-4 sm:p-6">
          <CardHeader className="p-0 mb-4">
            <CardTitle className="flex items-center text-base sm:text-lg">
              <Activity className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Recent Bets
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-4 w-full grid grid-cols-4 h-auto p-0">
                <TabsTrigger value="all" className="text-xs px-1 py-2">All</TabsTrigger>
                <TabsTrigger value="active" className="text-xs px-1 py-2">
                  <Clock className="h-3 w-3 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Active</span>
                  <span className="sm:hidden">({activeBets})</span>
                </TabsTrigger>
                <TabsTrigger value="won" className="text-xs px-1 py-2">
                  <CheckCircle className="h-3 w-3 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Won</span>
                  <span className="sm:hidden">W</span>
                </TabsTrigger>
                <TabsTrigger value="lost" className="text-xs px-1 py-2">
                  <XCircle className="h-3 w-3 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Lost</span>
                  <span className="sm:hidden">L</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="space-y-3 sm:space-y-4">
                {recentBets.map((bet) => (
                  <div key={bet.id} className="p-3 sm:p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-2">
                          <Badge className="bg-blue-600 hover:bg-blue-600 text-xs px-1 py-0">{bet.category}</Badge>
                          <Badge 
                            variant={bet.position === 'Yes' ? 'default' : 'secondary'} 
                            className="text-xs px-1 py-0"
                          >
                            {bet.position}
                          </Badge>
                          <Badge 
                            variant={
                              bet.status === 'won' ? 'default' : 
                              bet.status === 'lost' ? 'destructive' : 
                              'outline'
                            }
                            className="text-xs px-1 py-0"
                          >
                            {bet.status}
                          </Badge>
                        </div>
                        <h4 className="font-medium text-sm mb-1 leading-tight">{bet.title}</h4>
                        <p className="text-xs text-gray-600">Deadline: {bet.deadline}</p>
                      </div>
                      <div className="text-left sm:text-right space-y-1 border-t sm:border-t-0 pt-2 sm:pt-0">
                        <div className="font-medium text-sm">Staked: ${bet.amount}</div>
                        {bet.status === 'active' && (
                          <div className="text-xs text-green-600">Potential: ${bet.potentialWin}</div>
                        )}
                        {bet.status === 'won' && (
                          <div className="text-xs text-green-600">Won: ${bet.actualWin}</div>
                        )}
                        {bet.status === 'lost' && (
                          <div className="text-xs text-red-600">Lost</div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="active" className="space-y-3 sm:space-y-4">
                {recentBets.filter(bet => bet.status === 'active').map((bet) => (
                  <div key={bet.id} className="p-3 sm:p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-2">
                          <Badge className="bg-blue-600 hover:bg-blue-600 text-xs px-1 py-0">{bet.category}</Badge>
                          <Badge 
                            variant={bet.position === 'Yes' ? 'default' : 'secondary'} 
                            className="text-xs px-1 py-0"
                          >
                            {bet.position}
                          </Badge>
                        </div>
                        <h4 className="font-medium text-sm mb-1 leading-tight">{bet.title}</h4>
                        <p className="text-xs text-gray-600">Deadline: {bet.deadline}</p>
                      </div>
                      <div className="text-left sm:text-right space-y-1 border-t sm:border-t-0 pt-2 sm:pt-0">
                        <div className="font-medium text-sm">Staked: ${bet.amount}</div>
                        <div className="text-xs text-green-600">Potential: ${bet.potentialWin}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="won" className="space-y-3 sm:space-y-4">
                {recentBets.filter(bet => bet.status === 'won').map((bet) => (
                  <div key={bet.id} className="p-3 sm:p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-2">
                          <Badge className="bg-blue-600 hover:bg-blue-600 text-xs px-1 py-0">{bet.category}</Badge>
                          <Badge 
                            variant={bet.position === 'Yes' ? 'default' : 'secondary'} 
                            className="text-xs px-1 py-0"
                          >
                            {bet.position}
                          </Badge>
                        </div>
                        <h4 className="font-medium text-sm mb-1 leading-tight">{bet.title}</h4>
                        <p className="text-xs text-gray-600">Deadline: {bet.deadline}</p>
                      </div>
                      <div className="text-left sm:text-right space-y-1 border-t sm:border-t-0 pt-2 sm:pt-0">
                        <div className="font-medium text-sm">Staked: ${bet.amount}</div>
                        <div className="text-xs text-green-600">Won: ${bet.actualWin}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="lost" className="space-y-3 sm:space-y-4">
                {recentBets.filter(bet => bet.status === 'lost').map((bet) => (
                  <div key={bet.id} className="p-3 sm:p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-2">
                          <Badge className="bg-blue-600 hover:bg-blue-600 text-xs px-1 py-0">{bet.category}</Badge>
                          <Badge 
                            variant={bet.position === 'Yes' ? 'default' : 'secondary'} 
                            className="text-xs px-1 py-0"
                          >
                            {bet.position}
                          </Badge>
                        </div>
                        <h4 className="font-medium text-sm mb-1 leading-tight">{bet.title}</h4>
                        <p className="text-xs text-gray-600">Deadline: {bet.deadline}</p>
                      </div>
                      <div className="text-left sm:text-right space-y-1 border-t sm:border-t-0 pt-2 sm:pt-0">
                        <div className="font-medium text-sm">Staked: ${bet.amount}</div>
                        <div className="text-xs text-red-600">Lost</div>
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}