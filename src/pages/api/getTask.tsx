import { NextApiRequest, NextApiResponse } from "next";

interface ClickUpTask {
  id: string;
  name: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { listId } = req.query;
  const apiKey = "pk_94860021_O2D7WIOM35IUXAGG66CEOYQ5QGECJL1T";


  if (!listId || typeof listId !== "string") {
    return res.status(400).json({ error: "List ID is required" });
  }

  try {
    const response = await fetch(`https://api.clickup.com/api/v2/list/${listId}/task`, {
      method: "GET",
      headers: {
        Authorization: apiKey as string,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(response.statusText);

    }

    const data = await response.json();

    const tasks: ClickUpTask[] = Array.isArray(data.tasks)
      ? data.tasks.map((task: { id: string; name: string }) => ({
          id: task.id,
          name: task.name,
        }))
      : []; 
    
    console.log(tasks);
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}