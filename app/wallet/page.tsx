"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/use-auth"
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  Bitcoin,
  DollarSign,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react"

export default function WalletPage() {
  const [depositAmount, setDepositAmount] = useState("")
  const [withdrawAmount, setWithdrawAmount] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const { toast } = useToast()
  const { user } = useAuth()

  // Mock wallet data
  const walletData = {
    balance: 45000.0,
    pendingWinnings: 0,
    transactions: [
      {
        id: "tx-1",
        type: "deposit",
        amount: 15000,
        status: "completed",
        date: "Jun 10, 2024",
        method: "Bank Transfer",
      },
      {
        id: "tx-2",
        type: "bet",
        amount: -7500,
        status: "completed",
        date: "Jun 8, 2024",
        wager: "Will Bitcoin exceed $100,000 by end of 2025?",
      },
      {
        id: "tx-3",
        type: "win",
        amount: 18000,
        status: "completed",
        date: "Jun 5, 2024",
        wager: "Will the S&P 500 finish above 5,000 in May 2024?",
      },
      {
        id: "tx-4",
        type: "deposit",
        amount: 30000,
        status: "completed",
        date: "Jun 1, 2024",
        method: "Bank Transfer",
      },
      {
        id: "tx-5",
        type: "withdraw",
        amount: -18000,
        status: "completed",
        date: "May 28, 2024",
        method: "Bank Transfer",
      },
    ],
  }

  const handleDeposit = () => {
    if (!depositAmount || Number.parseFloat(depositAmount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid deposit amount.",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Deposit successful",
        description: `₦${depositAmount} has been added to your wallet.`,
      })
      setDepositAmount("")
      setIsProcessing(false)
    }, 1500)
  }

  const handleWithdraw = () => {
    if (!withdrawAmount || Number.parseFloat(withdrawAmount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid withdrawal amount.",
        variant: "destructive",
      })
      return
    }

    if (Number.parseFloat(withdrawAmount) > walletData.balance) {
      toast({
        title: "Insufficient funds",
        description: "You don't have enough funds to withdraw this amount.",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Withdrawal initiated",
        description: `Your withdrawal of ₦${withdrawAmount} is being processed.`,
      })
      setWithdrawAmount("")
      setIsProcessing(false)
    }, 1500)
  }

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "deposit":
        return <ArrowDownLeft className="h-5 w-5 text-success" />
      case "withdraw":
        return <ArrowUpRight className="h-5 w-5 text-destructive" />
      case "bet":
        return <Clock className="h-5 w-5 text-neutral-dark" />
      case "win":
        return <CheckCircle2 className="h-5 w-5 text-success" />
      case "loss":
        return <XCircle className="h-5 w-5 text-destructive" />
      default:
        return <DollarSign className="h-5 w-5 text-neutral-dark" />
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary">My Wallet</h1>
          <p className="text-neutral-dark mt-1">Manage your funds and transactions</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Current Balance</CardDescription>
            <CardTitle className="text-3xl">₦{walletData.balance.toLocaleString()}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-neutral-dark">
              <Wallet className="h-4 w-4 mr-1" />
              <span>Available for betting and withdrawal</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Pending Winnings</CardDescription>
            <CardTitle className="text-3xl">₦{walletData.pendingWinnings.toLocaleString()}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-neutral-dark">
              <Clock className="h-4 w-4 mr-1" />
              <span>Winnings from unsettled wagers</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Value</CardDescription>
            <CardTitle className="text-3xl">
              ₦{(walletData.balance + walletData.pendingWinnings).toLocaleString()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-neutral-dark">
              <DollarSign className="h-4 w-4 mr-1" />
              <span>Balance + pending winnings</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-1">
          <Tabs defaultValue="deposit" className="w-full">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="deposit">Deposit</TabsTrigger>
              <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
            </TabsList>
            <TabsContent value="deposit">
              <Card>
                <CardHeader>
                  <CardTitle>Deposit Funds</CardTitle>
                  <CardDescription>Add money to your BetWise wallet</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="depositAmount">Amount</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <span className="text-neutral-dark">₦</span>
                      </div>
                      <Input
                        id="depositAmount"
                        type="number"
                        min="1000"
                        step="100"
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(e.target.value)}
                        className="pl-8"
                        placeholder="Enter amount"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Payment Method</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="border rounded-md p-3 flex items-center space-x-3 cursor-pointer bg-neutral-light">
                        <CreditCard className="h-5 w-5 text-primary" />
                        <span>Credit Card</span>
                      </div>
                      <div className="border rounded-md p-3 flex items-center space-x-3 cursor-pointer">
                        <Bitcoin className="h-5 w-5 text-primary" />
                        <span>Crypto</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={handleDeposit}
                    disabled={!depositAmount || isProcessing}
                    className="w-full bg-primary hover:bg-primary-dark"
                  >
                    {isProcessing ? "Processing..." : "Deposit Funds"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="withdraw">
              <Card>
                <CardHeader>
                  <CardTitle>Withdraw Funds</CardTitle>
                  <CardDescription>Withdraw money from your BetWise wallet</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="withdrawAmount">Amount</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <span className="text-neutral-dark">₦</span>
                      </div>
                      <Input
                        id="withdrawAmount"
                        type="number"
                        min="1000"
                        max={walletData.balance}
                        step="100"
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                        className="pl-8"
                        placeholder={`Max: ₦${walletData.balance.toLocaleString()}`}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Withdrawal Method</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="border rounded-md p-3 flex items-center space-x-3 cursor-pointer bg-neutral-light">
                        <CreditCard className="h-5 w-5 text-primary" />
                        <span>Bank Account</span>
                      </div>
                      <div className="border rounded-md p-3 flex items-center space-x-3 cursor-pointer">
                        <Bitcoin className="h-5 w-5 text-primary" />
                        <span>Crypto</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={handleWithdraw}
                    disabled={!withdrawAmount || isProcessing || Number.parseFloat(withdrawAmount) > walletData.balance}
                    className="w-full bg-primary hover:bg-primary-dark"
                  >
                    {isProcessing ? "Processing..." : "Withdraw Funds"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>Your recent wallet activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {walletData.transactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 border-b last:border-0">
                    <div className="flex items-center">
                      <div className="mr-4">{getTransactionIcon(transaction.type)}</div>
                      <div>
                        <div className="font-medium">
                          {transaction.type === "bet" && "Placed bet on"}
                          {transaction.type === "win" && "Won bet on"}
                          {transaction.type === "deposit" && `Deposit via ${transaction.method}`}
                          {transaction.type === "withdraw" && `Withdrawal to ${transaction.method}`}
                        </div>
                        {(transaction.type === "bet" || transaction.type === "win") && (
                          <div className="text-sm text-neutral-dark truncate max-w-[250px]">{transaction.wager}</div>
                        )}
                        <div className="text-xs text-neutral-dark mt-1">{transaction.date}</div>
                      </div>
                    </div>
                    <div className={`font-medium ${transaction.amount > 0 ? "text-success" : "text-destructive"}`}>
                      {transaction.amount > 0 ? "+" : ""}
                      {transaction.amount.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Transactions
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
