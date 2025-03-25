import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
      <h1 className="text-4xl font-bold mb-6">Feedback System</h1>
      <p className="text-xl text-muted-foreground mb-8 max-w-md">
        NPS and Sentiment Feedback System with CRM Dashboard
      </p>
      <div className="flex gap-4">
        <Link href="/demo">
          <Button size="lg">View Demo</Button>
        </Link>
        <Link href="/login">
          <Button size="lg" variant="outline">
            CRM Login
          </Button>
        </Link>
      </div>
    </div>
  )
}

