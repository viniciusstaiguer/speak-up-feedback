import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

export default function ModalsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Feedback Modals</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New Modal
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* NPS Modal Card */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle>Website NPS</CardTitle>
              <Badge>NPS</Badge>
            </div>
            <CardDescription>Homepage feedback</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Status</span>
                <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                  Active
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Responses</span>
                <span>1,245</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Average Score</span>
                <span>8.7/10</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Trigger</span>
                <span>After 30 seconds</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard/modals/edit/1">Edit</Link>
            </Button>
            <div className="flex items-center space-x-2">
              <Switch id="active-1" defaultChecked />
              <label htmlFor="active-1" className="text-sm">
                Enabled
              </label>
            </div>
          </CardFooter>
        </Card>

        {/* Sentiment Modal Card */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle>Product Feedback</CardTitle>
              <Badge>Sentiment</Badge>
            </div>
            <CardDescription>Product page feedback</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Status</span>
                <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                  Active
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Responses</span>
                <span>876</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Average Score</span>
                <span>4.2/5</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Trigger</span>
                <span>On exit intent</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard/modals/edit/2">Edit</Link>
            </Button>
            <div className="flex items-center space-x-2">
              <Switch id="active-2" defaultChecked />
              <label htmlFor="active-2" className="text-sm">
                Enabled
              </label>
            </div>
          </CardFooter>
        </Card>

        {/* Disabled Modal Card */}
        <Card className="opacity-70">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle>Checkout Feedback</CardTitle>
              <Badge>NPS</Badge>
            </div>
            <CardDescription>Post-purchase feedback</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Status</span>
                <Badge variant="outline" className="bg-gray-100 text-gray-500 hover:bg-gray-100">
                  Inactive
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Responses</span>
                <span>732</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Average Score</span>
                <span>7.9/10</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Trigger</span>
                <span>After purchase</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard/modals/edit/3">Edit</Link>
            </Button>
            <div className="flex items-center space-x-2">
              <Switch id="active-3" />
              <label htmlFor="active-3" className="text-sm">
                Enabled
              </label>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

