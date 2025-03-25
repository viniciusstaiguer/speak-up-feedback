"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Save } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

export default function EditModalPage() {
  const params = useParams()
  const router = useRouter()
  const modalId = params.id

  const [formData, setFormData] = useState({
    title: "How likely are you to recommend us?",
    subtitle: "Your feedback helps us improve our service",
    thankYouTitle: "Thank you for your feedback!",
    thankYouMessage: "We appreciate your time and will use your feedback to improve our service.",
    triggerType: "time",
    triggerValue: "30",
    isActive: true,
  })

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    // Here you would save to Firebase
    toast({
      title: "Changes saved",
      description: "Your modal settings have been updated.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold">Edit Modal</h1>
      </div>

      <Tabs defaultValue="content">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="trigger">Trigger Settings</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Modal Content</CardTitle>
              <CardDescription>Customize the text and appearance of your feedback modal</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" value={formData.title} onChange={(e) => handleChange("title", e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subtitle">Subtitle</Label>
                <Input
                  id="subtitle"
                  value={formData.subtitle}
                  onChange={(e) => handleChange("subtitle", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="thankYouTitle">Thank You Title</Label>
                <Input
                  id="thankYouTitle"
                  value={formData.thankYouTitle}
                  onChange={(e) => handleChange("thankYouTitle", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="thankYouMessage">Thank You Message</Label>
                <Textarea
                  id="thankYouMessage"
                  value={formData.thankYouMessage}
                  onChange={(e) => handleChange("thankYouMessage", e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trigger" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Trigger Settings</CardTitle>
              <CardDescription>Configure when and how your feedback modal appears</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="triggerType">Trigger Type</Label>
                <Select value={formData.triggerType} onValueChange={(value) => handleChange("triggerType", value)}>
                  <SelectTrigger id="triggerType">
                    <SelectValue placeholder="Select trigger type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="time">Time on Page</SelectItem>
                    <SelectItem value="scroll">Scroll Percentage</SelectItem>
                    <SelectItem value="exit">Exit Intent</SelectItem>
                    <SelectItem value="click">Button Click</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.triggerType === "time" && (
                <div className="space-y-2">
                  <Label htmlFor="triggerValue">Seconds on Page</Label>
                  <Input
                    id="triggerValue"
                    type="number"
                    value={formData.triggerValue}
                    onChange={(e) => handleChange("triggerValue", e.target.value)}
                  />
                </div>
              )}

              {formData.triggerType === "scroll" && (
                <div className="space-y-2">
                  <Label htmlFor="triggerValue">Scroll Percentage</Label>
                  <Input
                    id="triggerValue"
                    type="number"
                    value={formData.triggerValue}
                    onChange={(e) => handleChange("triggerValue", e.target.value)}
                  />
                </div>
              )}

              <div className="flex items-center space-x-2 pt-2">
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => handleChange("isActive", checked)}
                />
                <Label htmlFor="isActive">Modal Active</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Modal Preview</CardTitle>
              <CardDescription>Preview how your feedback modal will appear to users</CardDescription>
            </CardHeader>
            <CardContent className="min-h-[300px] flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <p>Preview functionality will be implemented here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>
    </div>
  )
}

