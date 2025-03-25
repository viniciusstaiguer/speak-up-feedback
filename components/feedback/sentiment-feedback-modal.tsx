"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useFeedback } from "./feedback-provider"
import { FrownIcon, MehIcon, SmileIcon, ThumbsDownIcon, ThumbsUpIcon } from "lucide-react"

type SentimentFeedbackModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  modalId: string
  title?: string
  subtitle?: string
  thankYouTitle?: string
  thankYouMessage?: string
}

type Step = "rating" | "comment" | "thanks"
type SentimentRating = "very-good" | "good" | "normal" | "bad" | "very-bad" | null

const sentimentOptions = [
  { value: "very-good", label: "Very Good", icon: ThumbsUpIcon, color: "text-green-500" },
  { value: "good", label: "Good", icon: SmileIcon, color: "text-emerald-500" },
  { value: "normal", label: "Normal", icon: MehIcon, color: "text-amber-500" },
  { value: "bad", label: "Bad", icon: FrownIcon, color: "text-orange-500" },
  { value: "very-bad", label: "Very Bad", icon: ThumbsDownIcon, color: "text-red-500" },
]

export function SentimentFeedbackModal({
  open,
  onOpenChange,
  modalId,
  title = "How was your experience today?",
  subtitle = "We'd love to hear your thoughts",
  thankYouTitle = "Thank you for your feedback!",
  thankYouMessage = "We appreciate your time and will use your feedback to improve our service.",
}: SentimentFeedbackModalProps) {
  const { submitFeedback } = useFeedback()
  const [step, setStep] = useState<Step>("rating")
  const [rating, setRating] = useState<SentimentRating>(null)
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleRatingSelect = (value: SentimentRating) => {
    setRating(value)
  }

  const handleNext = () => {
    if (step === "rating" && rating !== null) {
      setStep("comment")
    } else if (step === "comment") {
      handleSubmit()
    }
  }

  const handleSubmit = async () => {
    if (rating === null) return

    setIsSubmitting(true)

    try {
      await submitFeedback({
        modalId,
        type: "sentiment",
        score: rating,
        comment: comment.trim() || undefined,
      })

      setStep("thanks")
    } catch (error) {
      console.error("Error submitting feedback:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    onOpenChange(false)

    // Reset state after animation completes
    setTimeout(() => {
      setStep("rating")
      setRating(null)
      setComment("")
    }, 300)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        {step === "rating" && (
          <>
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>{subtitle}</DialogDescription>
            </DialogHeader>

            <div className="py-4">
              <div className="grid grid-cols-5 gap-2">
                {sentimentOptions.map((option) => (
                  <Button
                    key={option.value}
                    variant={rating === option.value ? "default" : "outline"}
                    className="flex flex-col gap-2 h-auto py-3"
                    onClick={() => handleRatingSelect(option.value as SentimentRating)}
                  >
                    <option.icon className={`h-6 w-6 ${option.color}`} />
                    <span className="text-xs">{option.label}</span>
                  </Button>
                ))}
              </div>
            </div>

            <DialogFooter>
              <Button onClick={handleClose} variant="outline">
                Cancel
              </Button>
              <Button onClick={handleNext} disabled={rating === null}>
                Next
              </Button>
            </DialogFooter>
          </>
        )}

        {step === "comment" && (
          <>
            <DialogHeader>
              <DialogTitle>Would you like to tell us more?</DialogTitle>
              <DialogDescription>Your comments help us understand how we can improve.</DialogDescription>
            </DialogHeader>

            <div className="py-4">
              <Textarea
                placeholder="Share your thoughts (optional)"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
              />
            </div>

            <DialogFooter>
              <Button onClick={() => setStep("rating")} variant="outline">
                Back
              </Button>
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </DialogFooter>
          </>
        )}

        {step === "thanks" && (
          <>
            <DialogHeader>
              <DialogTitle>{thankYouTitle}</DialogTitle>
              <DialogDescription>{thankYouMessage}</DialogDescription>
            </DialogHeader>

            <DialogFooter>
              <Button onClick={handleClose}>Close</Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

