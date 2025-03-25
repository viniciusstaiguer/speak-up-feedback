"use client"

import { SentimentFeedbackModal } from "./sentiment-feedback-modal"

type SentimentFeedbackTriggerProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  modalId: string
  title?: string
  subtitle?: string
  thankYouTitle?: string
  thankYouMessage?: string
}

export function SentimentFeedbackTrigger(props: SentimentFeedbackTriggerProps) {
  return <SentimentFeedbackModal {...props} />
}

