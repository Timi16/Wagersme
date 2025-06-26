"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { useAuthService } from "@/services/auth"
import { useWallet } from "@/services/wallet"
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
  RefreshCw,
  Copy,
} from "lucide-react"

export default function WalletPage() {
  const [depositAmount, setDepositAmount] = useState("")
  const [withdrawAmount, setWithdrawAmount] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const { toast } = useToast()
  const { user, isAuthenticated } = useAuthService()
  const { 
    walletData, 
    transactions, 
    isLoading, 
    error, 
    fetchProfile, 
    fetchTransactions, 
    refreshWalletData, 
    simulateDeposit, 
    simulateWithdrawal 
  } = useWallet()

  // Use ref to track if data has been loaded to prevent multiple calls
  const hasLoadedData = useRef(false)

  // Load wallet data and transactions when component mounts or user changes
  useEffect(() => {
    if (isAuthenticated && user && !hasLoadedData.current) {
      hasLoadedData.current = true
      
      Promise.all([
        fetchProfile(),
        fetchTransactions()
      ]).catch((err) => {
        console.error('Failed to load wallet data or transactions:', err)
        hasLoadedData.current = false // Reset on error so it can retry
      })
    }
    
    // Reset the flag when user changes or logs out
    if (!isAuthenticated || !user) {
      hasLoadedData.current = false
    }
  }, [isAuthenticated, user]) // Remove fetchProfile and fetchTransactions from dependencies

  const handleDeposit = async () => {
    if (!depositAmount || Number.parseFloat(depositAmount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid deposit amount.",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)
    try {
      await simulateDeposit(Number.parseFloat(depositAmount))
      toast({
        title: "Deposit successful",
        description: `₦${depositAmount} has been added to your wallet.`,
      })
      setDepositAmount("")
    } catch (error) {
      toast({
        title: "Deposit failed",
        description: "There was an error processing your deposit.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleWithdraw = async () => {
    if (!withdrawAmount || Number.parseFloat(withdrawAmount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid withdrawal amount.",
        variant: "destructive",
      })
      return
    }

    if (!walletData || Number.parseFloat(withdrawAmount) > walletData.balance) {
      toast({
        title: "Insufficient funds",
        description: "You don't have enough funds to withdraw this amount.",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)
    try {
      await simulateWithdrawal(Number.parseFloat(withdrawAmount))
      toast({
        title: "Withdrawal initiated",
        description: `Your withdrawal of ₦${withdrawAmount} is being processed.`,
      })
      setWithdrawAmount("")
    } catch (error) {
      toast({
        title: "Withdrawal failed",
        description: error instanceof Error ? error.message : "There was an error processing your withdrawal.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleRefresh = async () => {
    try {
      hasLoadedData.current = false // Reset flag to allow fresh data load
      await Promise.all([refreshWalletData(), fetchTransactions()])
      hasLoadedData.current = true
      toast({
        title: "Wallet refreshed",
        description: "Your wallet data has been updated.",
      })
    } catch (error) {
      hasLoadedData.current = false
      toast({
        title: "Refresh failed",
        description: "Could not refresh wallet data.",
        variant: "destructive",
      })
    }
  }

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard.`,
    })
  }

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "deposit":
        return <ArrowDownLeft className="h-5 w-5 text-green-600" />
      case "withdraw":
        return <ArrowUpRight className="h-5 w-5 text-red-600" />
      case "bet":
        return <Clock className="h-5 w-5 text-gray-600" />
      case "win":
        return <CheckCircle2 className="h-5 w-5 text-green-600" />
      case "loss":
        return <XCircle className="h-5 w-5 text-red-600" />
      default:
        return <DollarSign className="h-5 w-5 text-gray-600" />
    }
  }

  // Show loading state only when initially loading and no data exists
  if (isLoading && !walletData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="h-8 w-8 animate-spin" />
          <span className="ml-2">Loading wallet data...</span>
        </div>
      </div>
    )
  }

  // Show error state only if there's an error and no existing data
  if (error && !walletData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center h-64">
          <XCircle className="h-8 w-8 text-red-600 mb-2" />
          <span className="text-red-600 mb-4">Error: {error}</span>
          <Button onClick={handleRefresh} variant="outline">
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  const balance = walletData?.balance || 0
  const pendingWinnings = walletData?.pendingWinnings || 0
  const virtualAccount = walletData?.virtualAccount
  const transactionList = transactions || [] // Ensure transactions is always an array

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Wallet</h1>
          <p className="text-gray-600 mt-1">Manage your funds and transactions</p>
        </div>
        <Button onClick={handleRefresh} variant="outline" disabled={isLoading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Virtual Account Info */}
      {virtualAccount && virtualAccount.accountNumber && (
        <Card className="mb-6 bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle>Virtual Account Details</CardTitle>
            <CardDescription>Fund your wallet using this account</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label>Account Number</Label>
                <div className="flex items-center justify-between p-2 bg-white rounded">
                  <span>{virtualAccount.accountNumber}</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => copyToClipboard(virtualAccount.accountNumber, 'Account Number')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div>
                <Label>Bank Name</Label>
                <div className="p-2 bg-white rounded">{virtualAccount.bankName}</div>
              </div>
              <div>
                <Label>Account Name</Label>
                <div className="p-2 bg-white rounded">{virtualAccount.accountName}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Current Balance</CardDescription>
            <CardTitle className="text-3xl">₦{balance.toLocaleString()}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-gray-600">
              <Wallet className="h-4 w-4 mr-1" />
              <span>Available for betting and withdrawal</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Pending Winnings</CardDescription>
            <CardTitle className="text-3xl">₦{pendingWinnings.toLocaleString()}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="h-4 w-4 mr-1" />
              <span>Winnings from unsettled wagers</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Value</CardDescription>
            <CardTitle className="text-3xl">
              ₦{(balance + pendingWinnings).toLocaleString()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-gray-600">
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
                  <CardDescription>Add money to your wallet</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="depositAmount">Amount</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <span className="text-gray-600">₦</span>
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
                      <div className="border rounded-md p-3 flex items-center space-x-3 cursor-pointer bg-gray-50">
                        <CreditCard className="h-5 w-5 text-blue-600" />
                        <span>Bank Card</span>
                      </div>
                      <div className="border rounded-md p-3 flex items-center space-x-3 cursor-pointer">
                        <Bitcoin className="h-5 w-5 text-blue-600" />
                        <span>Crypto</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={handleDeposit}
                    disabled={!depositAmount || isProcessing}
                    className="w-full bg-blue-600 hover:bg-blue-700"
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
                  <CardDescription>Withdraw money from your wallet</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="withdrawAmount">Amount</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <span className="text-gray-600">₦</span>
                      </div>
                      <Input
                        id="withdrawAmount"
                        type="number"
                        min="1000"
                        max={balance}
                        step="100"
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                        className="pl-8"
                        placeholder={`Max: ₦${balance.toLocaleString()}`}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Withdrawal Method</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="border rounded-md p-3 flex items-center space-x-3 cursor-pointer bg-gray-50">
                        <CreditCard className="h-5 w-5 text-blue-600" />
                        <span>Bank Account</span>
                      </div>
                      <div className="border rounded-md p-3 flex items-center space-x-3 cursor-pointer">
                        <Bitcoin className="h-5 w-5 text-blue-600" />
                        <span>Crypto</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={handleWithdraw}
                    disabled={!withdrawAmount || isProcessing || Number.parseFloat(withdrawAmount) > balance}
                    className="w-full bg-blue-600 hover:bg-blue-700"
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
              {isLoading ? (
                <div className="flex items-center justify-center p-4">
                  <RefreshCw className="h-6 w-6 animate-spin" />
                  <span className="ml-2">Loading transactions...</span>
                </div>
              ) : transactionList.length > 0 ? (
                transactionList.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 border-b last:border-0">
                    <div className="flex items-center">
                      <div className="mr-4">{getTransactionIcon(transaction.type)}</div>
                      <div>
                        <div className="font-medium">
                          {transaction.type === "deposit" && `Deposit via ${transaction.method || 'Unknown'}`}
                          {transaction.type === "withdraw" && `Withdrawal to ${transaction.method || 'Unknown'}`}
                          {transaction.type === "bet" && "Placed bet on"}
                          {transaction.type === "win" && "Won bet on"}
                          {transaction.type === "loss" && "Lost bet on"}
                        </div>
                        {(transaction.type === "bet" || transaction.type === "win" || transaction.type === "loss") && (
                          <div className="text-sm text-gray-600 truncate max-w-[250px]">{transaction.wager || 'N/A'}</div>
                        )}
                        <div className="text-xs text-gray-500 mt-1">{transaction.date}</div>
                      </div>
                    </div>
                    <div className={`font-medium ${transaction.amount > 0 ? "text-green-600" : "text-red-600"}`}>
                      {transaction.amount > 0 ? "+" : ""}{transaction.amount.toLocaleString()}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center p-4 text-gray-500">No transactions found</div>
              )}
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