"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"
import { ThumbsUp } from "lucide-react"

interface WagerDiscussionProps {
  wagerId: string
}

export function WagerDiscussion({ wagerId }: WagerDiscussionProps) {
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { user } = useAuth()
  const { toast } = useToast()

  // In a real app, we would fetch comments based on the wager ID
  const comments = [
    {
      id: "comment-1",
      user: {
        name: "Crypto Expert",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "CE",
      },
      content:
        "Bitcoin has been showing strong momentum lately. With institutional adoption increasing and the recent halving event, I think $100k by the end of 2025 is very realistic.",
      timestamp: "1 day ago",
      likes: 12,
    },
    {
      id: "comment-2",
      user: {
        name: "Market Skeptic",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "MS",
      },
      content:
        "I'm not convinced. Regulatory headwinds and potential economic downturns could significantly impact crypto markets. I'm betting NO on this one.",
      timestamp: "2 days ago",
      likes: 8,
    },
    {
      id: "comment-3",
      user: {
        name: "Technical Analyst",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "TA",
      },
      content:
        "Looking at historical patterns and the logarithmic growth curve, Bitcoin reaching $100k in this timeframe aligns with previous cycles. The odds look favorable for YES.",
      timestamp: "3 days ago",
      likes: 15,
    },
  ]

  const handleSubmitComment = () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to join the discussion.",
        variant: "destructive",
      })
      return
    }

    if (!comment.trim()) {
      toast({
        title: "Empty comment",
        description: "Please enter a comment.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Comment posted",
        description: "Your comment has been added to the discussion.",
      })
      setComment("")
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <h3 className="font-medium">Discussion</h3>
      </div>

      <div className="p-4">
        <div className="flex gap-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user ? "/placeholder.svg?height=40&width=40" : undefined} alt={user?.name} />
            <AvatarFallback>{user ? user.name.charAt(0) : "?"}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              placeholder="Share your thoughts on this prediction..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-[100px]"
            />
            <div className="mt-2 flex justify-end">
              <Button
                onClick={handleSubmitComment}
                disabled={isSubmitting}
                className="bg-primary hover:bg-primary-dark"
              >
                {isSubmitting ? "Posting..." : "Post Comment"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="divide-y">
        {comments.map((comment) => (
          <div key={comment.id} className="p-4">
            <div className="flex gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={comment.user.avatar || "/placeholder.svg"} alt={comment.user.name} />
                <AvatarFallback>{comment.user.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center">
                  <span className="font-medium">{comment.user.name}</span>
                  <span className="text-neutral-dark text-sm ml-2">• {comment.timestamp}</span>
                </div>
                <p className="mt-2">{comment.content}</p>
                <div className="mt-3 flex items-center">
                  <Button variant="ghost" size="sm" className="h-8 px-2 text-neutral-dark">
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    <span>{comment.likes}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 px-2 text-neutral-dark">
                    Reply
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
