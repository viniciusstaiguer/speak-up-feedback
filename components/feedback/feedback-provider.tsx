"use client"

import type React from "react"

import { createContext, useContext } from "react"

type FeedbackContextType = {
  submitFeedback: (data: FeedbackData) => Promise<void>
}

type FeedbackData = {
  modalId: string
  type: "nps" | "sentiment"
  score: number | string
  comment?: string
}

const FeedbackContext = createContext<FeedbackContextType | undefined>(undefined)

export function FeedbackProvider({ children }: { children: React.ReactNode }) {
  const submitFeedback = async (data: FeedbackData) => {
    // Here you would submit to Firebase
    console.log("Submitting feedback:", data)

    // Simulate API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve()
      }, 500)
    })
  }

  return <FeedbackContext.Provider value={{ submitFeedback }}>{children}</FeedbackContext.Provider>
}

export function useFeedback() {
  const context = useContext(FeedbackContext)
  if (!context) {
    throw new Error("useFeedback must be used within a FeedbackProvider")
  }
  return context
}

