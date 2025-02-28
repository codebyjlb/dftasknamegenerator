"use client";

import { useState, useEffect } from "react";

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Logs } from "lucide-react";

interface TaskListProps {
  tasksSelected: (taskName: string) => void;
}

interface Task {
  name: string;
}
export function TaskList({ tasksSelected }: TaskListProps) {



  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);
  const listId = "901606047334"; // Define listId directly
  

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setError(null);
        setTasks([]);

        const res = await fetch(`/api/getTask?listId=${listId}`);
        
        const data: { tasks?: Task[]; error?: string } = await res.json();

        if (res.ok && data.tasks) {
          setTasks(data.tasks);
        } else {
          setError(data.error || "Failed to fetch tasks");
        }
      } catch (err) {
        console.error(err);
        setError(error + "Something went wrong");
      }

    };

    fetchTasks();
  }, [listId, error]);


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Logs className="w-4 h-4 cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 max-h-60 overflow-y-auto">
        {tasks.map((task) => (
          <DropdownMenuItem key={task.name} onClick={() => tasksSelected(task.name)}>{task.name}</DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}