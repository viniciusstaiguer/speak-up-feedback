"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { auth, db } from "@/lib/firebase" // Import the Firebase auth and Firestore instances
import { signInWithEmailAndPassword } from "firebase/auth" // Import the signInWithEmailAndPassword function
import { doc, getDoc } from "firebase/firestore" // Import Firestore functions

export function LoginForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Authenticate with Firebase using email and password
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      // Check if the user is approved
      const userDoc = await getDoc(doc(db, "users", user.uid))
      
      if (!userDoc.exists()) {
        throw new Error("Your account is not approved. Please contact support.")
      }

      const userData = userDoc.data()
      if (!userData || !userData.isApproved) {
        throw new Error("Your account is not approved. Please contact support.")
      }

      // Store JWT token in cookies
      const token = await user.getIdToken()
      document.cookie = `auth-token=${token}; path=/;`

      toast({
        title: "Login successful",
        description: "You have been logged in to the dashboard.",
      })

      console.log("Redirecting to /dashboard")
      router.push("/dashboard")
      
    } catch (error: any) {
      console.error("Login error:", error) // Log the error to the console
      toast({
        title: "Login failed",
        description: error.message || "Please check your credentials and try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!isClient) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login to CRM</CardTitle>
        <CardDescription>Enter your credentials to access the dashboard</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}