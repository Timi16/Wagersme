"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Clock, Users, TrendingUp } from "lucide-react"

const trendingWagers = [
  {
    id: "wager-4",
    title: "Will Apple release a foldable iPhone by the end of 2025?",
    category: "Technology",
    deadline: "Dec 31, 2025",
    poolYes: 8500,
    poolNo: 11500,
    participants: 178,
    minStake: 5,
    growth: "+42%",
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
    growth: "+38%",
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
    growth: "+35%",
  },
]

export function TrendingWagers() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {trendingWagers.map((wager) => {
        const totalPool = wager.poolYes + wager.poolNo
        const yesPercentage = (wager.poolYes / totalPool) * 100
        const noPercentage = (wager.poolNo / totalPool) * 100
        const yesOdds = totalPool / wager.poolYes
        const noOdds = totalPool / wager.poolNo

        return (
          <Card key={wager.id} className="overflow-hidden border-t-4 border-t-secondary">
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
                    <span>{wager.growth}</span>
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
  )
}
