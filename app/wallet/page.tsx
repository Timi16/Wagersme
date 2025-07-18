"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle,CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { AxiosError } from 'axios';
import { useAuthService } from "@/services/auth"
import { useWallet } from "@/services/wallet"
import { initiateWithdrawal } from '@/services/payment'
import axios from 'axios';
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  DollarSign,
  Clock,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Copy,
} from "lucide-react"

// Type definitions
interface Bank {
  code: string;
  name: string;
}

interface Transaction {
  id: string;
  type: "deposit" | "withdraw" | "bet" | "win" | "loss";
  amount: number;
  date: string;
  method?: string;
  wager?: string;
}

export default function WalletPage() {
  const [withdrawAmount, setWithdrawAmount] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [banks, setBanks] = useState<Bank[]>([])
  const [selectedBank, setSelectedBank] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
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
  } = useWallet()

  const hasLoadedData = useRef(false)

  useEffect(() => {
    if (isAuthenticated && user && !hasLoadedData.current) {
      hasLoadedData.current = true
      Promise.all([fetchProfile(), fetchTransactions()]).catch((err) => {
        console.error('Failed to load wallet data or transactions:', err)
        hasLoadedData.current = false
      })
    }
    if (!isAuthenticated || !user) {
      hasLoadedData.current = false
    }
  }, [isAuthenticated, user, fetchProfile, fetchTransactions])

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const response = await axios.get<Bank[]>(`${API_URL}/payment/banks`)
        
        const uniqueBanks = response.data.reduce((acc: Bank[], bank, index) => {
          const existingBank = acc.find(b => b.code === bank.code);
          if (!existingBank) {
            acc.push(bank);
          }
          return acc;
        }, []);
        
        setBanks(uniqueBanks)
      } catch (error) {
        console.error('Failed to fetch banks:', error)
      }
    }
    fetchBanks()
  }, [])

  const handleWithdraw = async (amount: number, bankCode: string, accountNumber: string) => {
    setIsProcessing(true);
    try {
      await initiateWithdrawal(amount, bankCode, accountNumber);
      toast({
        title: "Withdrawal initiated",
        description: `Your withdrawal of ₦${amount} is being processed.`,
      });
      setWithdrawAmount("");
      setSelectedBank("");
      setAccountNumber("");
      await handleRefresh();
    } catch (error) {
      console.error("Withdrawal error:", error);
      let errorMessage = "There was an error processing your withdrawal.";
      
      if (error instanceof AxiosError) {
        if (error.response) {
          errorMessage = error.response.data?.message || `Server error (status ${error.response.status})`;
        } else if (error.request) {
          errorMessage = "No response from the server. Check your network.";
        } else {
          errorMessage = "Request setup failed: " + error.message;
        }
      } else if (error instanceof Error) {
        errorMessage = "Unexpected error: " + error.message;
      } else {
        errorMessage = "An unknown error occurred.";
      }
      
      toast({
        title: "Withdrawal failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRefresh = async () => {
    try {
      hasLoadedData.current = false
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
  const transactionList = (transactions as Transaction[]) || []

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

      {/* Virtual Account Details Section */}
      {walletData?.virtualAccount && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Deposit Account Details</CardTitle>
            <CardDescription>Use this account to fund your wallet</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label>Account Name</Label>
                <p>{walletData.virtualAccount.accountName}</p>
              </div>
              <div>
                <Label>Account Number</Label>
                <div className="flex items-center">
                  <p className="font-medium">{walletData.virtualAccount.accountNumber}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      navigator.clipboard.writeText(walletData.virtualAccount.accountNumber);
                      toast({
                        title: "Copied",
                        description: "Account number copied to clipboard",
                      });
                    }}
                    className="ml-2"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div>
                <Label>Bank</Label>
                <p>{walletData.virtualAccount.bankName}</p>
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

      <Card className="mb-6">
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
            <Label htmlFor="bankSelect">Select Bank</Label>
            <select
              id="bankSelect"
              value={selectedBank}
              onChange={(e) => setSelectedBank(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Select a bank</option>
              {banks.map((bank, index) => (
                <option key={`${bank.code}-${index}`} value={bank.code}>
                  {bank.name}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="accountNumber">Account Number</Label>
            <Input
              id="accountNumber"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="Enter account number"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={() => handleWithdraw(Number.parseFloat(withdrawAmount), selectedBank, accountNumber)}
            disabled={!withdrawAmount || !selectedBank || !accountNumber || isProcessing || Number.parseFloat(withdrawAmount) > balance}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {isProcessing ? "Processing..." : "Withdraw Funds"}
          </Button>
        </CardFooter>
      </Card>

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
                      {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                    </div>
                    <div className="text-sm text-gray-600">{new Date(transaction.date).toLocaleString()}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-medium ${transaction.type === 'deposit' || transaction.type === 'win' ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.type === 'deposit' || transaction.type === 'win' ? '+' : '-'}₦{transaction.amount.toLocaleString()}
                  </div>
                  {transaction.method && (
                    <div className="text-sm text-gray-600">{transaction.method}</div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No transactions yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}