"use client";

import { useState, useEffect } from "react";

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";


interface TaskListProps {
  tasksSelected: (taskName: string) => void;
}

interface Task {
  name: string;
}
export function TaskList({ tasksSelected }: TaskListProps) {

  
  const [loading, setLoading] = useState(true);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);
  const listId = "90163980943"; // Define listId directly
  
  const [search, setSearch] = useState("");

  const filteredTasks = tasks.filter((task) => task.name.toLowerCase().includes(search.toLowerCase()));


  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setError(null);
        setTasks([]);

        const res = await fetch(`/api/getTask?folderId=${listId}`);
        
        const data: { tasks?: Task[]; error?: string } = await res.json();

        if (res.ok && data.tasks) {
          setTasks(data.tasks);
          setLoading(false);

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
      <Search className="w-5 h-5 cursor-pointer" />
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56 max-h-60 overflow-hidden">
      {/* Search Input */}
      <div className="p-2 border-b">
        <Input
          type="text"
          placeholder="Search product."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full text-sm"
        />
      </div>

      {/* Scrollable List */}
      <div className="max-h-48 overflow-y-auto">
        {loading ? (
          <p className="p-2 text-sm text-gray-500 text-center">Loading products</p>
        ) : filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <DropdownMenuItem
              key={task.name}
              onClick={() => tasksSelected(task.name)}
              className="cursor-pointer"
            >
              {task.name}
            </DropdownMenuItem>
          ))
        ) : (
          <p className="p-2 text-sm text-gray-500">No product found</p>
        )}
      </div>
    </DropdownMenuContent>
  </DropdownMenu>
  );
}