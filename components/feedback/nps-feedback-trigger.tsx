"use client"

import { NPSFeedbackModal } from "./nps-feedback-modal"

type NPSFeedbackTriggerProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  modalId: string
  title?: string
  subtitle?: string
  thankYouTitle?: string
  thankYouMessage?: string
}

export function NPSFeedbackTrigger(props: NPSFeedbackTriggerProps) {
  return <NPSFeedbackModal {...props} />
}

