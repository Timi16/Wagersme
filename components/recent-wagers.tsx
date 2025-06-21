"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Clock, Users } from "lucide-react"

const recentWagers = [
  {
    id: "wager-7",
    title: "Will Manchester City win the 2024-25 Premier League?",
    category: "Sports",
    deadline: "May 25, 2025",
    poolYes: 5000,
    poolNo: 3000,
    participants: 67,
    minStake: 5,
    createdAt: "2 hours ago",
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
    createdAt: "5 hours ago",
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
    createdAt: "8 hours ago",
  },
]

export function RecentWagers() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recentWagers.map((wager) => {
        const totalPool = wager.poolYes + wager.poolNo
        const yesPercentage = (wager.poolYes / totalPool) * 100
        const noPercentage = (wager.poolNo / totalPool) * 100
        const yesOdds = totalPool / wager.poolYes
        const noOdds = totalPool / wager.poolNo

        return (
          <Card key={wager.id} className="overflow-hidden border-t-4 border-t-accent">
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
                    <span>Created {wager.createdAt}</span>
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
