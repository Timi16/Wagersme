"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, TrendingUp, TrendingDown, CheckCircle, Users, DollarSign } from "lucide-react"
import { useWager } from "@/hooks/useWagers"

interface PlaceBetFormProps {
  wagerId: string
  minStake: number
  maxStake: number
  yesOdds: number
  noOdds: number
}

export function PlaceBetForm({ wagerId, minStake, maxStake, yesOdds, noOdds }: PlaceBetFormProps) {
  const [choice, setChoice] = useState<"yes" | "no">("yes")
  const [stake, setStake] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [userHasBet, setUserHasBet] = useState(false)
  const [userBetDetails, setUserBetDetails] = useState<{
    choice: "yes" | "no"
    stake: number
    potentialWinnings: number
  } | null>(null)

  const { wager, placeBet } = useWager(Number(wagerId))

  const stakeAmount = Number.parseFloat(stake) || 0
  const potentialWinnings = choice === "yes" ? stakeAmount * (yesOdds || 1) : stakeAmount * (noOdds || 1)

  const handleSubmit = async () => {
    if (!stake || stakeAmount <= 0) {
      setError("Please enter a valid stake amount")
      return
    }

    if (stakeAmount < minStake || stakeAmount > maxStake) {
      setError(`Stake must be between ₦${minStake.toLocaleString()} and ₦${maxStake.toLocaleString()}`)
      return
    }

    setLoading(true)
    setError("")
    setSuccess(false)

    try {
      console.log("🎯 Submitting bet:", {
        wagerId,
        choice,
        stake: stakeAmount,
        endpoint: `/api/wagers/${wagerId}/bet`,
      })

      const response = await placeBet(choice, stakeAmount)
      console.log("✅ Bet response:", response)

      // Store user bet details
      setUserBetDetails({
        choice,
        stake: stakeAmount,
        potentialWinnings,
      })

      setSuccess(true)
      setUserHasBet(true)
      setStake("")

      // Show success message for 3 seconds
      setTimeout(() => {
        setSuccess(false)
      }, 3000)
    } catch (err) {
      console.error("❌ Bet placement failed:", err)
      setError(err instanceof Error ? err.message : "Failed to place bet")
    } finally {
      setLoading(false)
    }
  }

  // If user has placed a bet, show different UI
  if (userHasBet && userBetDetails) {
    return (
      <Card className="border-t-4 border-t-green-500">
        <CardHeader>
          <CardTitle className="flex items-center text-green-600">
            <CheckCircle className="mr-2 h-5 w-5" />
            Your Bet is Active!
          </CardTitle>
          <CardDescription>You're now part of this wager</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {success && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">Bet placed successfully! 🎉</AlertDescription>
            </Alert>
          )}

          <div className="bg-green-50 rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-green-700">Your Position:</span>
              <span className={`font-bold ${userBetDetails.choice === "yes" ? "text-green-600" : "text-red-600"}`}>
                {userBetDetails.choice.toUpperCase()}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-green-700">Your Stake:</span>
              <span className="font-bold">₦{userBetDetails.stake.toLocaleString()}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-green-700">Potential Winnings:</span>
              <span className="font-bold text-green-600">₦{userBetDetails.potentialWinnings.toLocaleString()}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-green-700">Potential Profit:</span>
              <span className="font-bold text-green-600">
                ₦{(userBetDetails.potentialWinnings - userBetDetails.stake).toLocaleString()}
              </span>
            </div>
          </div>

          {wager && (
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <h4 className="font-medium text-gray-800">Current Wager Stats</h4>

              <div className="flex justify-between items-center">
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="h-4 w-4 mr-1" />
                  <span>Total Participants:</span>
                </div>
                <span className="font-medium">{wager.participantCount}</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center text-sm text-gray-600">
                  <DollarSign className="h-4 w-4 mr-1" />
                  <span>Total Pool:</span>
                </div>
                <span className="font-medium">₦{wager.totalPool.toLocaleString()}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-3">
                <div className="text-center p-2 bg-green-100 rounded">
                  <div className="text-xs text-green-600">YES Pool</div>
                  <div className="font-bold text-green-700">₦{(wager.totalYesStake || 0).toLocaleString()}</div>
                </div>
                <div className="text-center p-2 bg-red-100 rounded">
                  <div className="text-xs text-red-600">NO Pool</div>
                  <div className="font-bold text-red-700">₦{(wager.totalNoStake || 0).toLocaleString()}</div>
                </div>
              </div>
            </div>
          )}

          <Button
            onClick={() => {
              setUserHasBet(false)
              setUserBetDetails(null)
            }}
            variant="outline"
            className="w-full"
          >
            Place Another Bet
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-t-4 border-t-primary">
      <CardHeader>
        <CardTitle>Place Your Bet</CardTitle>
        <CardDescription>Choose your side and stake amount</CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert className="mb-4 border-red-200 bg-red-50">
            <AlertDescription className="text-red-800">{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-6">
          <div>
            <Label className="text-base font-medium">Choose Your Side</Label>
            <RadioGroup value={choice} onValueChange={(value: "yes" | "no") => setChoice(value)} className="mt-3">
              <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-green-50 transition-colors">
                <RadioGroupItem value="yes" id="yes" />
                <Label htmlFor="yes" className="flex-1 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <TrendingUp className="mr-2 h-4 w-4 text-green-600" />
                      <span className="font-medium text-green-700">Yes</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium text-green-600">{(yesOdds || 0).toFixed(2)}x</span>
                    </div>
                  </div>
                </Label>
              </div>

              <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-red-50 transition-colors">
                <RadioGroupItem value="no" id="no" />
                <Label htmlFor="no" className="flex-1 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <TrendingDown className="mr-2 h-4 w-4 text-red-600" />
                      <span className="font-medium text-red-700">No</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium text-red-600">{(noOdds || 0).toFixed(2)}x</span>
                    </div>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label htmlFor="stake" className="text-base font-medium">
              Stake Amount (₦)
            </Label>
            <Input
              id="stake"
              type="number"
              value={stake}
              onChange={(e) => setStake(e.target.value)}
              placeholder={`Min: ₦${minStake.toLocaleString()}`}
              min={minStake}
              max={maxStake}
              step="0.01"
              className="mt-2"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>Min: ₦{minStake.toLocaleString()}</span>
              <span>Max: ₦{maxStake.toLocaleString()}</span>
            </div>
          </div>

          {stakeAmount > 0 && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Potential Winnings:</span>
                <span className="font-bold text-lg">₦{potentialWinnings.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-sm text-gray-600">Profit:</span>
                <span className="font-medium text-green-600">
                  ₦{(potentialWinnings - stakeAmount).toLocaleString()}
                </span>
              </div>
            </div>
          )}

          <Button
            type="button"
            className="w-full"
            disabled={loading || !stake || stakeAmount <= 0}
            onClick={handleSubmit}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? "Placing Bet..." : `Place Bet - ₦${stakeAmount.toLocaleString()}`}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
