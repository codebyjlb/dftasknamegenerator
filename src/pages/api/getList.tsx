import { NextApiRequest, NextApiResponse } from "next";

const CLICKUP_API_KEY = process.env.CLICKUP_API_KEY!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { spaceId } = req.query;

    if (!spaceId) {
      return res.status(400).json({ error: "Missing spaceId parameter" });
    }

    const response = await fetch(`https://api.clickup.com/api/v2/space/${spaceId}/list`, {
      headers: { Authorization: CLICKUP_API_KEY },
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: "Failed to fetch lists" });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message + "Internal Server Error" });
    } else {
      return res.status(500).json({ error: "An unknown error occurred" });
    }
  }
}