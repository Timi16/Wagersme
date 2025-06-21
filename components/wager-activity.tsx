"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, XCircle } from "lucide-react"

interface WagerActivityProps {
  wagerId: string
}

export function WagerActivity({ wagerId }: WagerActivityProps) {
  // In a real app, we would fetch activity data based on the wager ID
  const activities = [
    {
      id: "act-1",
      user: {
        name: "Alex Thompson",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "AT",
      },
      type: "bet",
      prediction: "yes",
      amount: 250,
      timestamp: "2 hours ago",
    },
    {
      id: "act-2",
      user: {
        name: "Sarah Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "SC",
      },
      type: "bet",
      prediction: "no",
      amount: 500,
      timestamp: "3 hours ago",
    },
    {
      id: "act-3",
      user: {
        name: "Michael Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "MR",
      },
      type: "bet",
      prediction: "yes",
      amount: 100,
      timestamp: "5 hours ago",
    },
    {
      id: "act-4",
      user: {
        name: "Emma Wilson",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "EW",
      },
      type: "bet",
      prediction: "no",
      amount: 75,
      timestamp: "6 hours ago",
    },
    {
      id: "act-5",
      user: {
        name: "David Kim",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "DK",
      },
      type: "bet",
      prediction: "yes",
      amount: 300,
      timestamp: "8 hours ago",
    },
    {
      id: "act-6",
      user: {
        name: "Olivia Martinez",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "OM",
      },
      type: "bet",
      prediction: "yes",
      amount: 150,
      timestamp: "10 hours ago",
    },
    {
      id: "act-7",
      user: {
        name: "James Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "JJ",
      },
      type: "bet",
      prediction: "no",
      amount: 200,
      timestamp: "12 hours ago",
    },
  ]

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <h3 className="font-medium">Recent Activity</h3>
      </div>
      <div className="divide-y">
        {activities.map((activity) => (
          <div key={activity.id} className="p-4 flex items-center">
            <Avatar className="h-10 w-10 mr-4">
              <AvatarImage src={activity.user.avatar || "/placeholder.svg"} alt={activity.user.name} />
              <AvatarFallback>{activity.user.initials}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center">
                <span className="font-medium">{activity.user.name}</span>
                <span className="text-neutral-dark text-sm ml-2">• {activity.timestamp}</span>
              </div>
              <div className="text-sm mt-1">
                Bet <span className="font-medium">${activity.amount}</span> on
                {activity.prediction === "yes" ? (
                  <Badge className="ml-1 bg-success hover:bg-success">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    YES
                  </Badge>
                ) : (
                  <Badge className="ml-1 bg-destructive hover:bg-destructive">
                    <XCircle className="h-3 w-3 mr-1" />
                    NO
                  </Badge>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
