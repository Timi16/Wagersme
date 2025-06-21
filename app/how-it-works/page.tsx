import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"
import {
  Lightbulb,
  DollarSign,
  Calculator,
  Award,
  HelpCircle,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Clock,
  Wallet,
  Shield,
} from "lucide-react"

export default function HowItWorksPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">How WagerMe Works</h1>
          <p className="text-xl text-neutral-dark">
            Your guide to prediction markets, dynamic odds, and winning strategies
          </p>
        </div>

        <Tabs defaultValue="basics" className="w-full mb-12">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="basics" className="flex flex-col items-center py-3">
              <Lightbulb className="h-5 w-5 mb-1" />
              <span>Basics</span>
            </TabsTrigger>
            <TabsTrigger value="odds" className="flex flex-col items-center py-3">
              <Calculator className="h-5 w-5 mb-1" />
              <span>Odds & Payouts</span>
            </TabsTrigger>
            <TabsTrigger value="strategies" className="flex flex-col items-center py-3">
              <TrendingUp className="h-5 w-5 mb-1" />
              <span>Strategies</span>
            </TabsTrigger>
            <TabsTrigger value="faq" className="flex flex-col items-center py-3">
              <HelpCircle className="h-5 w-5 mb-1" />
              <span>FAQ</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="basics">
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-primary mb-4">What are Prediction Markets?</h2>
                <p className="mb-4">
                  Prediction markets are platforms where users can bet on the outcomes of future events. Unlike
                  traditional betting, prediction markets use the "wisdom of crowds" to establish probabilities for
                  different outcomes.
                </p>
                <p>
                  On BetWise, users can create markets for virtually any verifiable future event, from cryptocurrency
                  prices and sports outcomes to political elections and technology product launches.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
                        1
                      </div>
                      Create or Join
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Create your own prediction market or join existing ones. Set your terms or browse markets that
                      interest you.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
                        2
                      </div>
                      Place Your Bet
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Choose "Yes" or "No" and enter your stake. Our dynamic odds system shows your potential payout in
                      real-time.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
                        3
                      </div>
                      Collect Winnings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      When the event settles, winners automatically receive their share of the pool, minus our 10%
                      platform fee.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-primary mb-4">Key Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex">
                    <div className="mr-4 text-secondary">
                      <Wallet className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">Internal Wallet</h3>
                      <p className="text-neutral-dark">
                        Deposit and withdraw funds using fiat or cryptocurrency. All your winnings are automatically
                        credited to your wallet.
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="mr-4 text-secondary">
                      <Calculator className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">Dynamic Odds</h3>
                      <p className="text-neutral-dark">
                        Odds update in real-time based on the amount of money on each side of the bet, reflecting the
                        market's collective prediction.
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="mr-4 text-secondary">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">Deadlines</h3>
                      <p className="text-neutral-dark">
                        Each market has a clear deadline after which no new bets can be placed, ensuring fairness for
                        all participants.
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="mr-4 text-secondary">
                      <Shield className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">Secure Resolution</h3>
                      <p className="text-neutral-dark">
                        Markets are resolved based on verifiable outcomes, with clear resolution criteria established at
                        creation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Button asChild className="bg-accent hover:bg-accent-dark">
                  <Link href="/wagers">Browse Markets</Link>
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="odds">
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-primary mb-4">Understanding Dynamic Odds</h2>
                <p className="mb-4">
                  BetWise uses a dynamic odds system that automatically adjusts based on the amount of money placed on
                  each side of a prediction. This creates a self-regulating market where odds reflect the collective
                  wisdom of all participants.
                </p>
                <div className="bg-neutral-light p-4 rounded-md mt-6">
                  <h3 className="font-bold mb-2">How Odds Are Calculated</h3>
                  <p className="mb-4">The implied probability for each outcome is calculated as:</p>
                  <div className="bg-white p-4 rounded-md mb-4">
                    <p className="font-mono text-center mb-2">
                      P<sub>yes</sub> = pool<sub>yes</sub> / (pool<sub>yes</sub> + pool<sub>no</sub>)
                    </p>
                    <p className="font-mono text-center">
                      P<sub>no</sub> = 1 - P<sub>yes</sub>
                    </p>
                  </div>
                  <p>
                    These probabilities are then displayed as percentages (e.g., Yes: 70%, No: 30%) and as decimal odds
                    (e.g., Yes: 1.43x, No: 3.33x).
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-primary mb-4">Payout Calculation Example</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-bold mb-3">Scenario</h3>
                    <ul className="space-y-2 text-neutral-dark">
                      <li>• Pool Yes = $280</li>
                      <li>• Pool No = $120</li>
                      <li>• Total Pool = $400</li>
                      <li>• Platform Fee (10%) = $40</li>
                      <li>• Net Payout Pool = $360</li>
                    </ul>
                    <div className="mt-4">
                      <p className="font-bold">Implied Probabilities:</p>
                      <p>
                        Yes: 70% (odds: 1.43x)
                        <br />
                        No: 30% (odds: 3.33x)
                      </p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold mb-3">If You Bet $40 on "No" and Win</h3>
                    <div className="bg-neutral-light p-4 rounded-md">
                      <p className="mb-2">
                        <span className="font-bold">Method 1:</span> Using odds
                      </p>
                      <p className="mb-4">
                        Gross win = $40 ÷ 0.30 ≈ $133.33
                        <br />
                        Net win = $133.33 - $40 = $93.33
                      </p>
                      <p className="mb-2">
                        <span className="font-bold">Method 2:</span> Proportional share of net pool
                      </p>
                      <p>
                        Your share = (40 ÷ 120) × $360 = $120
                        <br />
                        You get $120 back (your $40 stake + $80 profit)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-primary mb-4">Platform Fee</h2>
                <div className="flex items-start">
                  <div className="mr-4 text-accent">
                    <DollarSign className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="mb-4">
                      WagerMe charges a flat 10% fee on the total pool. This fee is deducted before winnings are
                      distributed to successful bettors.
                    </p>
                    <p>
                      For example, if the total pool is ₦150,000, the platform fee would be ₦15,000, leaving ₦135,000 to
                      be distributed among winners proportionally to their stake.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="strategies">
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-primary mb-4">Winning Strategies</h2>
                <p className="mb-6">
                  Success on BetWise comes from understanding markets, timing your bets, and leveraging your knowledge.
                  Here are some strategies to help you maximize your returns:
                </p>

                <div className="space-y-6">
                  <div className="flex">
                    <div className="mr-4 text-success">
                      <TrendingUp className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">Look for Market Inefficiencies</h3>
                      <p className="text-neutral-dark">
                        If you believe the current odds don't accurately reflect the true probability of an outcome,
                        that's an opportunity. Markets are most inefficient early on when fewer participants have placed
                        bets.
                      </p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="mr-4 text-success">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">Time Your Bets</h3>
                      <p className="text-neutral-dark">
                        Early bettors often get better odds but take on more risk. Waiting gives you more information
                        but typically worse odds. Find the sweet spot based on your confidence level.
                      </p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="mr-4 text-success">
                      <Award className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">Specialize in Specific Categories</h3>
                      <p className="text-neutral-dark">
                        Focus on markets where you have specialized knowledge or expertise. If you follow cryptocurrency
                        closely, you'll likely have better insights on crypto markets than the average bettor.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 mr-2 text-success" />
                      Do's
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <div className="mr-2 mt-1">•</div>
                        <p>Research thoroughly before placing bets</p>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-2 mt-1">•</div>
                        <p>Diversify your bets across different markets</p>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-2 mt-1">•</div>
                        <p>Set a budget and stick to it</p>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-2 mt-1">•</div>
                        <p>Look for markets with clear resolution criteria</p>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-2 mt-1">•</div>
                        <p>Track your performance to identify strengths</p>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <XCircle className="h-5 w-5 mr-2 text-destructive" />
                      Don'ts
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <div className="mr-2 mt-1">•</div>
                        <p>Chase losses with bigger bets</p>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-2 mt-1">•</div>
                        <p>Bet more than you can afford to lose</p>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-2 mt-1">•</div>
                        <p>Ignore the implied probabilities</p>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-2 mt-1">•</div>
                        <p>Bet on topics you don't understand</p>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-2 mt-1">•</div>
                        <p>Make emotional rather than rational decisions</p>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center">
                <Button asChild className="bg-accent hover:bg-accent-dark">
                  <Link href="/wagers">Start Betting</Link>
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="faq">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-primary mb-6">Frequently Asked Questions</h2>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How do I create my own prediction market?</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">
                      To create a prediction market, click on the "Create" button in the navigation menu. You'll need
                      to:
                    </p>
                    <ol className="list-decimal pl-5 space-y-1">
                      <li>Enter a clear title and description</li>
                      <li>Set a deadline for when betting will close</li>
                      <li>Choose a stake type (fixed minimum or open range)</li>
                      <li>Select a category and add relevant tags</li>
                      <li>Define clear resolution criteria</li>
                    </ol>
                    <p className="mt-2">
                      Once created, your market will be visible to all users who can then place bets on it.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>How are markets resolved?</AccordionTrigger>
                  <AccordionContent>
                    <p>
                      Markets are resolved based on the predetermined resolution criteria established when the market
                      was created. For most markets, an admin or oracle will mark the outcome as "Yes" or "No" based on
                      verifiable information from reliable sources. Once resolved, winnings are automatically
                      distributed to the winners' wallets after deducting the 10% platform fee.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>What happens if a market can't be clearly resolved?</AccordionTrigger>
                  <AccordionContent>
                    <p>
                      In rare cases where the outcome is ambiguous or cannot be determined based on the resolution
                      criteria, the market may be voided. In such cases, all participants receive their original stakes
                      back without any fees deducted.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger>How do I deposit or withdraw funds?</AccordionTrigger>
                  <AccordionContent>
                    <p>
                      You can manage your funds in the Wallet section. BetWise supports both fiat currency (via credit
                      card or bank transfer) and cryptocurrency deposits and withdrawals. Deposits are typically
                      processed instantly, while withdrawals may take 1-3 business days for fiat and up to 24 hours for
                      crypto, depending on network conditions.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger>Is there a minimum or maximum bet amount?</AccordionTrigger>
                  <AccordionContent>
                    <p>
                      The minimum bet amount is set by the market creator and can vary from market to market. Some
                      markets have a fixed stake amount that all participants must bet, while others have an open range
                      with minimum and maximum limits. The platform-wide minimum stake is $5, but individual markets may
                      set higher minimums.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6">
                  <AccordionTrigger>What is the KYC/AML compliance process?</AccordionTrigger>
                  <AccordionContent>
                    <p>
                      To comply with regulations, users who wish to deposit or withdraw above certain thresholds will
                      need to complete our Know Your Customer (KYC) process. This involves verifying your identity by
                      providing government-issued ID and proof of address. The process is secure and typically takes 1-2
                      business days to complete.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-7">
                  <AccordionTrigger>Can I cancel a bet after placing it?</AccordionTrigger>
                  <AccordionContent>
                    <p>
                      Once a bet is placed, it cannot be canceled or modified. This ensures fairness for all
                      participants and maintains the integrity of the market odds. Please double-check your selection
                      and stake amount before confirming your bet.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-8">
                  <AccordionTrigger>How is the platform fee calculated?</AccordionTrigger>
                  <AccordionContent>
                    <p>
                      BetWise charges a flat 10% fee on the total pool (the sum of all bets placed on both "Yes" and
                      "No"). This fee is deducted from the total pool before distributing winnings. For example, if the
                      total pool is $1,000, the fee would be $100, leaving $900 to be distributed among winners.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div className="mt-8 bg-primary text-white p-6 rounded-lg shadow-md">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2">Still have questions?</h3>
                  <p>Our support team is here to help you with any questions or concerns.</p>
                </div>
                <Button asChild className="mt-4 md:mt-0 bg-white text-primary hover:bg-neutral-light">
                  <Link href="/contact">Contact Support</Link>
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="bg-neutral-light p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-primary mb-4">Ready to Start?</h2>
          <p className="mb-6">
            Now that you understand how WagerMe works, it's time to put your knowledge to the test. Browse existing
            markets or create your own prediction market today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-accent hover:bg-accent-dark">
              <Link href="/wagers">Browse Markets</Link>
            </Button>
            <Button asChild className="bg-primary hover:bg-primary-dark">
              <Link href="/wagers/create">Create a Market</Link>
            </Button>
            <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
              <Link href="/register">Sign Up</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
