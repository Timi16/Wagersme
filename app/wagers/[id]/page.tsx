import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlaceBetForm } from "@/components/place-bet-form"
import { WagerActivity } from "@/components/wager-activity"
import { WagerDiscussion } from "@/components/wager-discussion"
import { Clock, Users, DollarSign, AlertCircle, Share2 } from "lucide-react"

export default function WagerDetailPage({ params }: { params: { id: string } }) {
  // In a real app, we would fetch the wager data based on the ID
  const wager = {
    id: params.id,
    title: "Will Bitcoin exceed $100,000 by end of 2025?",
    description:
      "This market will resolve to YES if the price of Bitcoin (BTC) exceeds $100,000 USD on any major exchange (Coinbase, Binance, Kraken) before or on December 31st, 2025, 23:59:59 UTC. It will resolve to NO if the price does not reach $100,000 by this deadline.\n\nPrice must be maintained for at least 1 hour to be considered valid. Screenshots and multiple reliable sources will be used for verification.",
    category: "Crypto",
    deadline: "Dec 31, 2025",
    poolYes: 12500,
    poolNo: 7500,
    participants: 156,
    minStake: 5,
    maxStake: 1000,
    createdBy: "CryptoVisionary",
    createdAt: "May 15, 2024",
  }

  const totalPool = wager.poolYes + wager.poolNo
  const yesPercentage = (wager.poolYes / totalPool) * 100
  const noPercentage = (wager.poolNo / totalPool) * 100
  const yesOdds = totalPool / wager.poolYes
  const noOdds = totalPool / wager.poolNo
  const platformFee = totalPool * 0.1 // 10% fee

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3 space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge className="bg-primary hover:bg-primary">{wager.category}</Badge>
              <div className="flex items-center text-sm text-neutral-dark">
                <Clock className="h-4 w-4 mr-1" />
                <span>Deadline: {wager.deadline}</span>
              </div>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-primary mb-4">{wager.title}</h1>

            <div className="prose max-w-none mb-6">
              <p className="whitespace-pre-line">{wager.description}</p>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-neutral-dark">
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                <span>{wager.participants} participants</span>
              </div>
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 mr-1" />
                <span>Total pool: ${totalPool.toLocaleString()}</span>
              </div>
              <div>
                <span>
                  Created by {wager.createdBy} on {wager.createdAt}
                </span>
              </div>
            </div>
          </div>

          <Tabs defaultValue="activity" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="activity">Recent Activity</TabsTrigger>
              <TabsTrigger value="discussion">Discussion</TabsTrigger>
              <TabsTrigger value="rules">Rules & Resolution</TabsTrigger>
            </TabsList>
            <TabsContent value="activity">
              <WagerActivity wagerId={wager.id} />
            </TabsContent>
            <TabsContent value="discussion">
              <WagerDiscussion wagerId={wager.id} />
            </TabsContent>
            <TabsContent value="rules">
              <Card>
                <CardHeader>
                  <CardTitle>Resolution Criteria</CardTitle>
                  <CardDescription>How this wager will be settled</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Resolution Source</h3>
                    <p>Price data from Coinbase, Binance, and Kraken will be used for verification.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Resolution Rules</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>The price must exceed $100,000 USD on at least one major exchange.</li>
                      <li>The price must maintain above $100,000 for at least 1 hour.</li>
                      <li>Screenshots and multiple reliable sources will be used for verification.</li>
                      <li>If the condition is met before the deadline, the market resolves to YES.</li>
                      <li>If the deadline passes without the condition being met, the market resolves to NO.</li>
                    </ul>
                  </div>
                  <div className="flex items-start p-4 bg-amber-50 rounded-md">
                    <AlertCircle className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                    <div>
                      <p className="text-sm">
                        In case of disputes or ambiguous outcomes, the platform administrator will make the final
                        decision based on the most reliable data available.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="lg:w-1/3 space-y-6">
          <Card className="border-t-4 border-t-primary">
            <CardHeader>
              <CardTitle>Current Odds</CardTitle>
              <CardDescription>Based on {wager.participants} participants</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-success">Yes: {yesPercentage.toFixed(0)}%</span>
                  <span className="font-medium text-destructive">No: {noPercentage.toFixed(0)}%</span>
                </div>
                <div className="flex h-3 rounded-full overflow-hidden">
                  <div className="bg-success" style={{ width: `${yesPercentage}%` }} />
                  <div className="bg-destructive" style={{ width: `${noPercentage}%` }} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-neutral-light p-4 rounded-md">
                  <div className="text-sm text-neutral-dark">Yes Pool</div>
                  <div className="text-xl font-bold">${wager.poolYes.toLocaleString()}</div>
                  <div className="text-sm font-medium text-success">Odds: {yesOdds.toFixed(2)}x</div>
                </div>
                <div className="bg-neutral-light p-4 rounded-md">
                  <div className="text-sm text-neutral-dark">No Pool</div>
                  <div className="text-xl font-bold">${wager.poolNo.toLocaleString()}</div>
                  <div className="text-sm font-medium text-destructive">Odds: {noOdds.toFixed(2)}x</div>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-neutral-dark">Total Pool</span>
                  <span className="font-medium">${totalPool.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-neutral-dark">Platform Fee (10%)</span>
                  <span className="font-medium">${platformFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-dark">Payout Pool</span>
                  <span className="font-medium">${(totalPool - platformFee).toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <PlaceBetForm
            wagerId={wager.id}
            minStake={wager.minStake}
            maxStake={wager.maxStake}
            yesOdds={yesOdds}
            noOdds={noOdds}
          />

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Share this Wager</CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">
                <Share2 className="mr-2 h-4 w-4" />
                Copy Link
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
