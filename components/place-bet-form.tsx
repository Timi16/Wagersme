"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"

interface PlaceBetFormProps {
  wagerId: string
  minStake: number
  maxStake: number
  yesOdds: number
  noOdds: number
}

export function PlaceBetForm({ wagerId, minStake, maxStake, yesOdds, noOdds }: PlaceBetFormProps) {
  const [prediction, setPrediction] = useState<"yes" | "no" | null>(null)
  const [amount, setAmount] = useState<string>(minStake.toString())
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const { user } = useAuth()
  const router = useRouter()

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === "" || /^\d+(\.\d{0,2})?$/.test(value)) {
      setAmount(value)
    }
  }

  const calculatePotentialWinnings = () => {
    if (!prediction || !amount || isNaN(Number.parseFloat(amount))) return 0

    const stake = Number.parseFloat(amount)
    const odds = prediction === "yes" ? yesOdds : noOdds
    const grossWin = stake * odds
    const netWin = grossWin - stake

    return netWin
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to place a bet.",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    if (!prediction) {
      toast({
        title: "Selection required",
        description: "Please select either Yes or No.",
        variant: "destructive",
      })
      return
    }

    const stakeAmount = Number.parseFloat(amount)

    if (isNaN(stakeAmount) || stakeAmount < minStake) {
      toast({
        title: "Invalid stake",
        description: `Minimum stake is $${minStake}.`,
        variant: "destructive",
      })
      return
    }

    if (stakeAmount > maxStake) {
      toast({
        title: "Invalid stake",
        description: `Maximum stake is $${maxStake}.`,
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Bet placed successfully!",
        description: `You placed $${stakeAmount} on ${prediction.toUpperCase()}.`,
      })
      setIsSubmitting(false)
    }, 1500)
  }

  const potentialWinnings = calculatePotentialWinnings()

  return (
    <Card className="border-t-4 border-t-accent">
      <CardHeader>
        <CardTitle>Place Your Bet</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <Label>Your Prediction</Label>
            <RadioGroup
              value={prediction || ""}
              onValueChange={(value) => setPrediction(value as "yes" | "no")}
              className="grid grid-cols-2 gap-4"
            >
              <Label
                htmlFor="yes-option"
                className={`flex flex-col items-center justify-between rounded-md border-2 p-4 cursor-pointer ${
                  prediction === "yes" ? "border-success bg-success/10" : "border-muted hover:bg-muted/50"
                }`}
              >
                <RadioGroupItem value="yes" id="yes-option" className="sr-only" />
                <span className="text-xl font-semibold">YES</span>
                <span className="text-sm text-muted-foreground mt-1">Odds: {yesOdds.toFixed(2)}x</span>
              </Label>
              <Label
                htmlFor="no-option"
                className={`flex flex-col items-center justify-between rounded-md border-2 p-4 cursor-pointer ${
                  prediction === "no" ? "border-destructive bg-destructive/10" : "border-muted hover:bg-muted/50"
                }`}
              >
                <RadioGroupItem value="no" id="no-option" className="sr-only" />
                <span className="text-xl font-semibold">NO</span>
                <span className="text-sm text-muted-foreground mt-1">Odds: {noOdds.toFixed(2)}x</span>
              </Label>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="stake-amount">Stake Amount</Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <span className="text-neutral-dark">$</span>
              </div>
              <Input
                id="stake-amount"
                type="text"
                value={amount}
                onChange={handleAmountChange}
                className="pl-8"
                placeholder={`Min: $${minStake}, Max: $${maxStake}`}
              />
            </div>
            <div className="text-xs text-neutral-dark">
              Min: ${minStake}, Max: ${maxStake}
            </div>
          </div>

          {prediction && amount && Number.parseFloat(amount) >= minStake && (
            <div className="bg-neutral-light p-4 rounded-md space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-dark">Your stake:</span>
                <span>${Number.parseFloat(amount).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-dark">Potential profit:</span>
                <span className="text-success font-medium">+${potentialWinnings.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-medium">
                <span>Total return:</span>
                <span>${(Number.parseFloat(amount) + potentialWinnings).toFixed(2)}</span>
              </div>
            </div>
          )}
        </form>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleSubmit}
          disabled={!prediction || !amount || Number.parseFloat(amount) < minStake || isSubmitting}
          className="w-full bg-accent hover:bg-accent-dark"
        >
          {isSubmitting ? "Processing..." : "Place Bet"}
        </Button>
      </CardFooter>
    </Card>
  )
}
