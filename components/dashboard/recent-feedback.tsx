"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const recentFeedback = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    type: "NPS",
    score: 9,
    comment: "Great service, very satisfied with the product!",
    date: "2 hours ago",
  },
  {
    id: 2,
    name: "Sarah Smith",
    email: "sarah@example.com",
    type: "Sentiment",
    score: "Very Good",
    comment: "The customer support was excellent.",
    date: "5 hours ago",
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael@example.com",
    type: "NPS",
    score: 7,
    comment: "Good product but could use some improvements.",
    date: "1 day ago",
  },
  {
    id: 4,
    name: "Emily Johnson",
    email: "emily@example.com",
    type: "Sentiment",
    score: "Normal",
    comment: "It was an average experience.",
    date: "2 days ago",
  },
]

export function RecentFeedback() {
  return (
    <div className="space-y-4">
      {recentFeedback.map((feedback) => (
        <div key={feedback.id} className="flex items-start gap-4 rounded-lg border p-3">
          <Avatar className="h-9 w-9">
            <AvatarFallback>
              {feedback.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium leading-none">{feedback.name}</p>
              <Badge variant="outline" className="text-xs">
                {feedback.type}
              </Badge>
              <span className="ml-auto text-xs text-muted-foreground">{feedback.date}</span>
            </div>
            <p className="text-xs text-muted-foreground">{feedback.email}</p>
            <div className="flex items-center gap-2 pt-1">
              <Badge variant={feedback.type === "NPS" ? "default" : "secondary"} className="text-xs">
                {feedback.score}
              </Badge>
              <p className="text-sm">{feedback.comment}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

