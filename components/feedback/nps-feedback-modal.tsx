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

type NPSFeedbackModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  modalId: string
  title?: string
  subtitle?: string
  thankYouTitle?: string
  thankYouMessage?: string
}

type Step = "rating" | "comment" | "thanks"

export function NPSFeedbackModal({
  open,
  onOpenChange,
  modalId,
  title = "How likely are you to recommend us?",
  subtitle = "Your feedback helps us improve our service",
  thankYouTitle = "Thank you for your feedback!",
  thankYouMessage = "We appreciate your time and will use your feedback to improve our service.",
}: NPSFeedbackModalProps) {
  const { submitFeedback } = useFeedback()
  const [step, setStep] = useState<Step>("rating")
  const [rating, setRating] = useState<number | null>(null)
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleRatingSelect = (value: number) => {
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
        type: "nps",
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
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-10 gap-1">
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((value) => (
                    <Button
                      key={value}
                      variant={rating === value ? "default" : "outline"}
                      className="h-10 w-10 rounded-md p-0"
                      onClick={() => handleRatingSelect(value)}
                    >
                      {value}
                    </Button>
                  ))}
                </div>

                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Not likely</span>
                  <span>Very likely</span>
                </div>
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

