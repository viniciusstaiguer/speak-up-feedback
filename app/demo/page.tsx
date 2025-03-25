"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FeedbackProvider } from "@/components/feedback/feedback-provider"
import { NPSFeedbackTrigger } from "@/components/feedback/nps-feedback-trigger"
import { SentimentFeedbackTrigger } from "@/components/feedback/sentiment-feedback-trigger"

export default function DemoPage() {
  const [showNPS, setShowNPS] = useState(false)
  const [showSentiment, setShowSentiment] = useState(false)

  return (
    <FeedbackProvider>
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8">Feedback System Demo</h1>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-card p-6 rounded-lg border">
            <h2 className="text-xl font-semibold mb-4">NPS Feedback</h2>
            <p className="text-muted-foreground mb-4">
              Collect Net Promoter Score feedback from your users with a 1-10 rating scale.
            </p>
            <Button onClick={() => setShowNPS(true)}>Show NPS Modal</Button>
          </div>

          <div className="bg-card p-6 rounded-lg border">
            <h2 className="text-xl font-semibold mb-4">Sentiment Feedback</h2>
            <p className="text-muted-foreground mb-4">
              Collect sentiment feedback with a 5-point scale from Very Good to Very Bad.
            </p>
            <Button onClick={() => setShowSentiment(true)}>Show Sentiment Modal</Button>
          </div>
        </div>

        <div className="text-center">
          <Button variant="outline" asChild>
            <a href="/">Back to Home</a>
          </Button>
        </div>
      </div>

      {/* Feedback Modals */}
      <NPSFeedbackTrigger
        open={showNPS}
        onOpenChange={setShowNPS}
        modalId="demo-nps"
        title="How likely are you to recommend us?"
        subtitle="Your feedback helps us improve our service"
      />

      <SentimentFeedbackTrigger
        open={showSentiment}
        onOpenChange={setShowSentiment}
        modalId="demo-sentiment"
        title="How was your experience today?"
        subtitle="We'd love to hear your thoughts"
      />
    </FeedbackProvider>
  )
}

