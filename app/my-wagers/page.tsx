"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { Clock, CheckCircle2, XCircle, AlertCircle } from "lucide-react"

export default function MyWagersPage() {
  // Mock wager data
  const activeWagers = [
    {
      id: "wager-1",
      title: "Will Bitcoin exceed $100,000 by end of 2025?",
      category: "Crypto",
      deadline: "Dec 31, 2025",
      prediction: "yes",
      amount: 50,
      potentialWin: 125,
      poolYes: 12500,
      poolNo: 7500,
      createdAt: "Jun 10, 2024",
    },
    {
      id: "wager-4",
      title: "Will Apple release a foldable iPhone by the end of 2025?",
      category: "Technology",
      deadline: "Dec 31, 2025",
      prediction: "no",
      amount: 75,
      potentialWin: 150,
      poolYes: 8500,
      poolNo: 11500,
      createdAt: "Jun 5, 2024",
    },
  ]

  const settledWagers = [
    {
      id: "wager-2",
      title: "Will the S&P 500 finish above 5,000 in May 2024?",
      category: "Finance",
      deadline: "May 31, 2024",
      prediction: "yes",
      amount: 100,
      outcome: "yes",
      winAmount: 120,
      settledAt: "Jun 1, 2024",
    },
    {
      id: "wager-3",
      title: "Will the Lakers win the 2024 NBA Championship?",
      category: "Sports",
      deadline: "Jun 20, 2024",
      prediction: "yes",
      amount: 50,
      outcome: "no",
      winAmount: 0,
      settledAt: "Jun 18, 2024",
    },
  ]

  const createdWagers = [
    {
      id: "wager-5",
      title: "Will Tesla release a car priced under $30,000 in 2024?",
      category: "Technology",
      deadline: "Dec 31, 2024",
      poolYes: 3500,
      poolNo: 6500,
      participants: 45,
      createdAt: "May 15, 2024",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary">My Wagers</h1>
          <p className="text-neutral-dark mt-1">Track your bets and created markets</p>
        </div>
        <Button asChild className="mt-4 md:mt-0 bg-accent hover:bg-accent-dark">
          <Link href="/wagers/create">Create New Wager</Link>
        </Button>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="active">Active Bets</TabsTrigger>
          <TabsTrigger value="settled">Settled Bets</TabsTrigger>
          <TabsTrigger value="created">Created Markets</TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          {activeWagers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeWagers.map((wager) => {
                const totalPool = wager.poolYes + wager.poolNo
                const yesPercentage = (wager.poolYes / totalPool) * 100
                const noPercentage = (wager.poolNo / totalPool) * 100

                return (
                  <Card key={wager.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <Badge className="bg-primary hover:bg-primary">{wager.category}</Badge>
                        <div className="flex items-center text-sm text-neutral-dark">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>Deadline: {wager.deadline}</span>
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

                        <div className="bg-neutral-light p-4 rounded-md">
                          <div className="flex justify-between mb-2">
                            <span className="text-neutral-dark">Your prediction:</span>
                            <span className="font-medium">
                              {wager.prediction === "yes" ? (
                                <span className="text-success">YES</span>
                              ) : (
                                <span className="text-destructive">NO</span>
                              )}
                            </span>
                          </div>
                          <div className="flex justify-between mb-2">
                            <span className="text-neutral-dark">Amount staked:</span>
                            <span className="font-medium">${wager.amount}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-neutral-dark">Potential win:</span>
                            <span className="font-medium text-success">+${wager.potentialWin}</span>
                          </div>
                        </div>

                        <div className="flex justify-between text-sm text-neutral-dark">
                          <span>Placed on {wager.createdAt}</span>
                          <Button asChild variant="ghost" size="sm" className="h-8 px-2 text-primary">
                            <Link href={`/wagers/${wager.id}`}>View Details</Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <AlertCircle className="h-12 w-12 mx-auto text-neutral-dark mb-4" />
              <h3 className="text-xl font-medium mb-2">No active bets</h3>
              <p className="text-neutral-dark mb-6">You don't have any active bets at the moment.</p>
              <Button asChild className="bg-accent hover:bg-accent-dark">
                <Link href="/wagers">Browse Markets</Link>
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="settled">
          {settledWagers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {settledWagers.map((wager) => (
                <Card key={wager.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <Badge className="bg-primary hover:bg-primary">{wager.category}</Badge>
                      <div className="flex items-center text-sm">
                        {wager.outcome === wager.prediction ? (
                          <span className="text-success flex items-center">
                            <CheckCircle2 className="h-4 w-4 mr-1" />
                            Won
                          </span>
                        ) : (
                          <span className="text-destructive flex items-center">
                            <XCircle className="h-4 w-4 mr-1" />
                            Lost
                          </span>
                        )}
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
                      <div className="bg-neutral-light p-4 rounded-md">
                        <div className="flex justify-between mb-2">
                          <span className="text-neutral-dark">Your prediction:</span>
                          <span className="font-medium">
                            {wager.prediction === "yes" ? (
                              <span className="text-success">YES</span>
                            ) : (
                              <span className="text-destructive">NO</span>
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span className="text-neutral-dark">Amount staked:</span>
                          <span className="font-medium">${wager.amount}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span className="text-neutral-dark">Outcome:</span>
                          <span className="font-medium">
                            {wager.outcome === "yes" ? (
                              <span className="text-success">YES</span>
                            ) : (
                              <span className="text-destructive">NO</span>
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-dark">Result:</span>
                          {wager.outcome === wager.prediction ? (
                            <span className="font-medium text-success">+${wager.winAmount}</span>
                          ) : (
                            <span className="font-medium text-destructive">-${wager.amount}</span>
                          )}
                        </div>
                      </div>

                      <div className="flex justify-between text-sm text-neutral-dark">
                        <span>Settled on {wager.settledAt}</span>
                        <Button asChild variant="ghost" size="sm" className="h-8 px-2 text-primary">
                          <Link href={`/wagers/${wager.id}`}>View Details</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <AlertCircle className="h-12 w-12 mx-auto text-neutral-dark mb-4" />
              <h3 className="text-xl font-medium mb-2">No settled bets</h3>
              <p className="text-neutral-dark mb-6">You don't have any settled bets yet.</p>
              <Button asChild className="bg-accent hover:bg-accent-dark">
                <Link href="/wagers">Browse Markets</Link>
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="created">
          {createdWagers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {createdWagers.map((wager) => {
                const totalPool = wager.poolYes + wager.poolNo
                const yesPercentage = (wager.poolYes / totalPool) * 100
                const noPercentage = (wager.poolNo / totalPool) * 100

                return (
                  <Card key={wager.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <Badge className="bg-primary hover:bg-primary">{wager.category}</Badge>
                        <div className="flex items-center text-sm text-neutral-dark">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>Deadline: {wager.deadline}</span>
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

                        <div className="bg-neutral-light p-4 rounded-md">
                          <div className="flex justify-between mb-2">
                            <span className="text-neutral-dark">Total pool:</span>
                            <span className="font-medium">${totalPool}</span>
                          </div>
                          <div className="flex justify-between mb-2">
                            <span className="text-neutral-dark">Participants:</span>
                            <span className="font-medium">{wager.participants}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-neutral-dark">Platform fee (10%):</span>
                            <span className="font-medium">${(totalPool * 0.1).toFixed(2)}</span>
                          </div>
                        </div>

                        <div className="flex justify-between text-sm text-neutral-dark">
                          <span>Created on {wager.createdAt}</span>
                          <div className="flex space-x-2">
                            <Button asChild variant="ghost" size="sm" className="h-8 px-2 text-primary">
                              <Link href={`/wagers/${wager.id}`}>View Details</Link>
                            </Button>
                            <Button asChild variant="ghost" size="sm" className="h-8 px-2 text-primary">
                              <Link href={`/wagers/${wager.id}/manage`}>Manage</Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <AlertCircle className="h-12 w-12 mx-auto text-neutral-dark mb-4" />
              <h3 className="text-xl font-medium mb-2">No created markets</h3>
              <p className="text-neutral-dark mb-6">You haven't created any prediction markets yet.</p>
              <Button asChild className="bg-accent hover:bg-accent-dark">
                <Link href="/wagers/create">Create a Wager</Link>
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
