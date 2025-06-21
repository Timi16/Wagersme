"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Clock, Users } from "lucide-react"

const featuredWagers = [
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
]

export function FeaturedWagers() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {featuredWagers.map((wager) => {
        const totalPool = wager.poolYes + wager.poolNo
        const yesPercentage = (wager.poolYes / totalPool) * 100
        const noPercentage = (wager.poolNo / totalPool) * 100
        const yesOdds = totalPool / wager.poolYes
        const noOdds = totalPool / wager.poolNo

        return (
          <Card key={wager.id} className="overflow-hidden border-t-4 border-t-primary">
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
  )
}
