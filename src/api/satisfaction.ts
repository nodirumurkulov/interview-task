import { Request, Response } from "express";
import axios from "axios";

export const GET = async (req: Request, res: Response) => {
  try {
    const response = await axios.get("https://sampleapi.squaredup.com/integrations/v1/service-desk?datapoints=30");
    const data = response.data;

    // Debug fetched data
    console.log("Fetched data:", data);

    // Validate structure
    if (!data.results || !Array.isArray(data.results)) {
      throw new Error("Unexpected data structure.");
    }

    // Aggregating the satisfaction ratings
    const satisfaction = data.results.reduce(
      (acc: { good: number; bad: number }, item: any) => {
        const score = item.satisfaction_rating?.score;
        if (score === "good") {
          acc.good += 1;
        } else if (score === "bad") {
          acc.bad += 1;
        }
        return acc;
      },
      { good: 0, bad: 0 }
    );

    res.json(satisfaction);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios Error:", error.response?.status, error.response?.data);
    } else {
      console.error("Unexpected Error:", error);
    }
    res.status(500).json({ error: "Failed to fetch satisfaction data." });
  }
};
