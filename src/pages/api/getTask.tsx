import { NextApiRequest, NextApiResponse } from "next";

interface ClickUpTask {
  id: string;
  name: string;
}

const CLICKUP_API_KEY = process.env.CLICKUP_API_KEY!;


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { folderId } = req.query;

  if (!folderId || typeof folderId !== "string") {
    return res.status(400).json({ error: "Folder ID is required" });
  }

  try {
    // Step 1: Fetch all lists inside the folder
    const listsResponse = await fetch(`https://api.clickup.com/api/v2/folder/${folderId}/list`, {
      method: "GET",
      headers: {
        Authorization: CLICKUP_API_KEY,
        "Content-Type": "application/json",
      },
    });

    if (!listsResponse.ok) {
      throw new Error(`Error fetching lists: ${listsResponse.statusText}`);
    }

    const listsData = await listsResponse.json();
    const lists = listsData.lists ?? []; // Extract lists inside the folder

    let allTasks: ClickUpTask[] = [];

    // Step 2: Fetch tasks from each list
    for (const list of lists) {
      const listId = list.id;

      const tasksResponse = await fetch(`https://api.clickup.com/api/v2/list/${listId}/task`, {
        method: "GET",
        headers: {
          Authorization: CLICKUP_API_KEY,
          "Content-Type": "application/json",
        },
      });

      if (!tasksResponse.ok) {
        console.warn(`Failed to fetch tasks from list ${listId}: ${tasksResponse.statusText}`);
        continue; // Skip this list if fetching tasks fails
      }

      const tasksData = await tasksResponse.json();
      const tasks: ClickUpTask[] = Array.isArray(tasksData.tasks)
        ? tasksData.tasks.map((task: { id: string; name: string }) => ({
            id: task.id,
            name: task.name,
          }))
        : [];

      allTasks = [...allTasks, ...tasks]; // Append tasks from this list
    }

    return res.status(200).json({ tasks: allTasks });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return res.status(500).json({ error: (error as Error).message });
  }
}