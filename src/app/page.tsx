"use client"

import { useState } from "react"
import { CalendarDays, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { SelectClient } from "./clients"

export default function ContentIdGenerator() {
  const [isLoading, setIsLoading] = useState(false)
  const [campaignName, setCampaignName] = useState("")
  const [campaignId, setCampaignId] = useState("")

  const handleGenerate = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => setIsLoading(false), 1000)
  }

  // Auto-generate current calendar week

  const getTodayDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = String(today.getFullYear()).slice(-2); // Get last 2 digits of year
  
    return `${day}${month}${year}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
      <Card className="max-w-2xl w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold tracking-tight">Digitalfeet Task Name Generator</CardTitle>
          <div className="text-sm text-muted-foreground space-y-1">
            <p></p>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="campaign-id">
                    Client
                  </label>
                <SelectClient />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="calendar-week">
                Date
              </label>
              <div className="relative">
                <Input id="calendar-week" defaultValue={getTodayDate()} className="pl-9" />
                <CalendarDays className="absolute left-2.5 top-2.5 h-5 w-5 text-muted-foreground" />
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="campaign-name">
                Campaign Name
              </label>
              <Input
                id="campaign-name"
                placeholder=""
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="campaign-id">
                Product
              </label>
              <Input
                id="campaign-id"
                placeholder=""
                value={campaignId}
                onChange={(e) => setCampaignId(e.target.value)}
              />
            </div>
          </div>
{/* 
          <div className="space-y-2">
            <label className="text-sm font-medium"></label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Please select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value=""></SelectItem>
             
            </Select>
          </div> */}

          <Button
            className="w-full"
            size="lg"
            onClick={handleGenerate}
            disabled={isLoading || !campaignName || !campaignId}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate Task Name"
            )}
          </Button>

          <Alert>
            <AlertDescription className="text-sm text-center">
                For any request or issues, please send email to dev@digitalfeet.com or make a{" "}
              <a href="#" className="font-medium underline hover:text-primary">
                ClickUp sub-task here
              </a>{" "}
            
              <div className="mt-6 text-muted-foreground">
                 Made with ❤️ by DF Dev Team
                <br />
              </div>

             
            </AlertDescription>
           
          </Alert>
        
        </CardContent>
       
      </Card>
   
    </div>
  )
}

