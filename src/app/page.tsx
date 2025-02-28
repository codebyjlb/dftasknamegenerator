"use client"

import React, {useRef} from "react"
import { useState } from "react"
import { format } from "date-fns"
import {  Calendar as CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { SelectClient } from "./clients"
import { cn } from "@/lib/utils"
import { TaskList } from "./getProduct"
import { toast } from "sonner"
import { Howl } from "howler";
import Image from "next/image";



import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


 
export default function ContentIdGenerator() {

  const clickSound = new Howl({
    src: ["/sound/copy.wav"], 
    volume: 0.5,
  });

  const jlbClick = (e : React.MouseEvent) => {
    e.preventDefault(); // Prevent default mailto action for toast to appear first

    toast("Build by JLB")

    setTimeout(() => {
      window.location.href = "mailto:louie@digitalfeet.com";
    }, 1000);
  };

  const alertDescriptionRef = useRef<HTMLDivElement>(null);

 
  const [campaignName, setCampaignName] = useState("")
  const [selectedTask, setSelectedTask] = useState<string | undefined>(undefined)
  const [selectedClient, setSelectedClient] = useState<string | undefined>(undefined)
  const [date, setDate] = useState<Date | undefined>(new Date());


  const handleTaskSelect = (taskName: string) => {
    setSelectedTask(taskName);
};

  const handleClientSelect = (clientName: string) => {
    setSelectedClient(clientName);
  };

  const rms = (str: string): string => {
    return str.replace(/\s+/g, "");
  };

  const cfl = (str: string) => (str ? str.toUpperCase() : '');

 const handleGenerate = () => {
  
  if (alertDescriptionRef.current) {
    const textToCopy = alertDescriptionRef.current.innerText;
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        toast("Task name copied successfully.");
        clickSound.play();

      })
  
      .catch((err) => {
        console.error('Failed to copy text: ', err);
      });
  }

};


  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
      <Card className="max-w-2xl w-full">
        <CardHeader>
          <CardTitle className="text-xl font-bold tracking-tight flex items-center">
            
            <Image src="/dflogo.png" alt="Digitalfeet Logo" width={60} height={60} /> 
            Digitalfeet Task Name Generator</CardTitle>
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
                <SelectClient clientSelected={handleClientSelect}/>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="calendar-week">
                Date
              </label>
                        <div className="relative">
                        <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "dd MMM yyyy") : "Pick a date"}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
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
            <div className="flex flex-col space-y-2 space-between">
              <div className="flex gap-1 mb-1">
              <label className="text-sm font-medium" htmlFor="campaign-id">
                Product
              </label>
              <TaskList tasksSelected={handleTaskSelect} />
              </div>
                    
               
              <Input
            
                  id="task-name"
                  placeholder=""
                  value={selectedTask}
                  onChange={(e) => setSelectedTask(e.target.value)}
                />
              
              
            </div>
          </div>

          {selectedClient && campaignName && selectedTask && date ? (
                <AlertDescription
                  id="task-name"
                  className="text-lg font-medium text-center px-6 break-words"
                  ref={alertDescriptionRef}
                >
                  {rms(selectedClient)}_{cfl(campaignName)}_{rms(cfl(selectedTask))}_{format(date, "ddMMyy")}
                </AlertDescription>
              ) : null}

          <Button
            className="w-full"
            size="lg"
            onClick={handleGenerate}
          >
            Copy Task Name
          </Button>
           

          <Alert>

            <AlertDescription className="text-sm text-center">
                For any request or issues, please send email to dev@digitalfeet.com or make a{" "}
              <a href="https://app.clickup.com/9016716806/v/l/f/90163980943" className="font-medium underline hover:text-primary">
                ClickUp sub-task here
              </a>{" "}
            
              <div className="mt-6 text-muted-foreground">
                 Made with <a href="mailto:louie@digitalfeet.com" onClick={jlbClick}>❤️</a> by DF Dev Team
                <br />
              </div>

             
            </AlertDescription>
           
          </Alert>
        
        </CardContent>
       
      </Card>
   
    </div>
  )
}

