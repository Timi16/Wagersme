"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/use-auth"
import { ChevronRight, ChevronLeft, Calendar, DollarSign, Tag, Clock } from "lucide-react"

export default function CreateWagerPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    deadline: "",
    stakeType: "fixed",
    minStake: "5",
    maxStake: "100",
    customTags: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const { user } = useAuth()
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNext = () => {
    if (step === 1) {
      if (!formData.title.trim()) {
        toast({
          title: "Title required",
          description: "Please enter a title for your wager.",
          variant: "destructive",
        })
        return
      }
      if (!formData.description.trim()) {
        toast({
          title: "Description required",
          description: "Please enter a description for your wager.",
          variant: "destructive",
        })
        return
      }
    } else if (step === 2) {
      if (!formData.category) {
        toast({
          title: "Category required",
          description: "Please select a category for your wager.",
          variant: "destructive",
        })
        return
      }
      if (!formData.deadline) {
        toast({
          title: "Deadline required",
          description: "Please set a deadline for your wager.",
          variant: "destructive",
        })
        return
      }
    }

    setStep((prev) => prev + 1)
  }

  const handleBack = () => {
    setStep((prev) => prev - 1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to create a wager.",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    // Validate stake values
    if (formData.stakeType === "fixed") {
      if (!formData.minStake || Number.parseFloat(formData.minStake) <= 0) {
        toast({
          title: "Invalid stake",
          description: "Please enter a valid minimum stake.",
          variant: "destructive",
        })
        return
      }
    } else {
      if (!formData.minStake || Number.parseFloat(formData.minStake) <= 0) {
        toast({
          title: "Invalid minimum stake",
          description: "Please enter a valid minimum stake.",
          variant: "destructive",
        })
        return
      }
      if (!formData.maxStake || Number.parseFloat(formData.maxStake) <= Number.parseFloat(formData.minStake)) {
        toast({
          title: "Invalid maximum stake",
          description: "Maximum stake must be greater than minimum stake.",
          variant: "destructive",
        })
        return
      }
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Wager created successfully!",
        description: "Your prediction market is now live.",
      })
      setIsSubmitting(false)
      router.push("/wagers")
    }, 1500)
  }

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Will Bitcoin exceed $100,000 by end of 2025?"
                className="text-lg"
              />
              <p className="text-sm text-neutral-dark">
                Make it clear and specific. Good titles are phrased as yes/no questions.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Provide details about this prediction, including how it will be resolved..."
                className="min-h-[200px]"
              />
              <p className="text-sm text-neutral-dark">
                Include clear resolution criteria and any relevant information that bettors should know.
              </p>
            </div>
          </div>
        )
      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                <SelectTrigger id="category" className="w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sports">Sports</SelectItem>
                  <SelectItem value="politics">Politics</SelectItem>
                  <SelectItem value="crypto">Crypto</SelectItem>
                  <SelectItem value="entertainment">Entertainment</SelectItem>
                  <SelectItem value="science">Science</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="trivia">Trivia</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="deadline">Deadline</Label>
              <div className="relative">
                <Input
                  id="deadline"
                  name="deadline"
                  type="datetime-local"
                  value={formData.deadline}
                  onChange={handleChange}
                  className="w-full"
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-dark pointer-events-none" />
              </div>
              <p className="text-sm text-neutral-dark">
                This is the cut-off time after which no new bets can be placed.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="customTags">Tags (Optional)</Label>
              <Input
                id="customTags"
                name="customTags"
                value={formData.customTags}
                onChange={handleChange}
                placeholder="e.g., bitcoin, cryptocurrency, finance"
              />
              <p className="text-sm text-neutral-dark">Add comma-separated tags to help users discover your wager.</p>
            </div>
          </div>
        )
      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Stake Type</Label>
              <RadioGroup
                value={formData.stakeType}
                onValueChange={(value) => handleRadioChange("stakeType", value)}
                className="grid grid-cols-1 gap-4"
              >
                <Label
                  htmlFor="fixed-stake"
                  className={`flex items-center justify-between rounded-md border-2 p-4 cursor-pointer ${
                    formData.stakeType === "fixed" ? "border-primary bg-primary/10" : "border-muted hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="fixed" id="fixed-stake" />
                    <div>
                      <p className="font-medium">Fixed Minimum Stake</p>
                      <p className="text-sm text-neutral-dark">All participants must bet the same amount</p>
                    </div>
                  </div>
                </Label>
                <Label
                  htmlFor="open-stake"
                  className={`flex items-center justify-between rounded-md border-2 p-4 cursor-pointer ${
                    formData.stakeType === "open" ? "border-primary bg-primary/10" : "border-muted hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="open" id="open-stake" />
                    <div>
                      <p className="font-medium">Open Stake Range</p>
                      <p className="text-sm text-neutral-dark">Participants can bet any amount within a range</p>
                    </div>
                  </div>
                </Label>
              </RadioGroup>
            </div>

            {formData.stakeType === "fixed" ? (
              <div className="space-y-2">
                <Label htmlFor="minStake">Fixed Stake Amount ($)</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <DollarSign className="h-4 w-4 text-neutral-dark" />
                  </div>
                  <Input
                    id="minStake"
                    name="minStake"
                    type="number"
                    min="1"
                    step="1"
                    value={formData.minStake}
                    onChange={handleChange}
                    className="pl-8"
                  />
                </div>
                <p className="text-sm text-neutral-dark">All participants will bet exactly this amount.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="minStake">Minimum Stake ($)</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <DollarSign className="h-4 w-4 text-neutral-dark" />
                    </div>
                    <Input
                      id="minStake"
                      name="minStake"
                      type="number"
                      min="1"
                      step="1"
                      value={formData.minStake}
                      onChange={handleChange}
                      className="pl-8"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxStake">Maximum Stake ($)</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <DollarSign className="h-4 w-4 text-neutral-dark" />
                    </div>
                    <Input
                      id="maxStake"
                      name="maxStake"
                      type="number"
                      min={Number.parseInt(formData.minStake) + 1 || 2}
                      step="1"
                      value={formData.maxStake}
                      onChange={handleChange}
                      className="pl-8"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="bg-neutral-light p-4 rounded-md">
              <div className="flex items-start">
                <div className="mr-2 mt-1">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Platform Fee</h4>
                  <p className="text-sm text-neutral-dark mt-1">
                    BetWise charges a 10% fee on the total pool, which is deducted before payouts are distributed to
                    winners.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
      case 4:
        return (
          <div className="space-y-6">
            <div className="bg-neutral-light p-6 rounded-md">
              <h3 className="text-xl font-bold text-primary mb-4">{formData.title}</h3>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">Description</h4>
                  <p className="mt-1 whitespace-pre-line">{formData.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium">Category</h4>
                    <p className="mt-1 capitalize">{formData.category}</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Deadline</h4>
                    <p className="mt-1">{new Date(formData.deadline).toLocaleString()}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium">Stake Details</h4>
                  {formData.stakeType === "fixed" ? (
                    <p className="mt-1">Fixed stake: ${formData.minStake}</p>
                  ) : (
                    <p className="mt-1">
                      Open stake: ${formData.minStake} - ${formData.maxStake}
                    </p>
                  )}
                </div>

                {formData.customTags && (
                  <div>
                    <h4 className="font-medium">Tags</h4>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {formData.customTags.split(",").map((tag, index) => (
                        <div key={index} className="bg-white px-2 py-1 rounded-md text-sm">
                          {tag.trim()}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-neutral-light p-4 rounded-md">
              <div className="flex items-start">
                <div className="mr-2 mt-1">
                  <Tag className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Ready to Create?</h4>
                  <p className="text-sm text-neutral-dark mt-1">
                    Once created, your wager will be live and visible to all users. You cannot edit the core details
                    after creation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary">Create a Wager</h1>
          <p className="text-neutral-dark mt-1">Set up your prediction market in a few simple steps</p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div key={stepNumber} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step === stepNumber
                      ? "bg-primary text-white"
                      : step > stepNumber
                        ? "bg-secondary text-white"
                        : "bg-neutral-light text-neutral-dark"
                  }`}
                >
                  {stepNumber}
                </div>
                <span className="text-xs mt-2 text-neutral-dark">
                  {stepNumber === 1 && "Basics"}
                  {stepNumber === 2 && "Details"}
                  {stepNumber === 3 && "Stakes"}
                  {stepNumber === 4 && "Review"}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-2 h-1 bg-neutral-light">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${(step - 1) * 33.33}%` }}
            />
          </div>
        </div>

        <Card>
          <CardContent className="pt-6">
            <form onSubmit={(e) => e.preventDefault()}>
              {renderStepContent()}

              <div className="flex justify-between mt-8">
                {step > 1 ? (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleBack}
                    className="border-primary text-primary hover:bg-primary hover:text-white"
                  >
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                ) : (
                  <div></div>
                )}

                {step < 4 ? (
                  <Button type="button" onClick={handleNext} className="bg-primary hover:bg-primary-dark">
                    Next
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="bg-accent hover:bg-accent-dark"
                  >
                    {isSubmitting ? "Creating..." : "Create Wager"}
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
