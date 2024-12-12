import { Request, Response } from "express";
import { parseISO, differenceInHours } from "date-fns";
import { SampleData } from "./types";

export const GET = async (req: Request, res: Response) => {
  try {
    // Simulate fetching data from API or database
    const response = await fetch("https://sampleapi.squaredup.com/integrations/v1/service-desk?datapoints=30");
    const data: SampleData = await response.json();

    const results = data.results;

    const dates: string[] = [];
    const times: number[] = [];

    results.forEach((issue) => {
      const createdDate = parseISO(issue.created);
      const updatedDate = parseISO(issue.updated);
      const duration = differenceInHours(updatedDate, createdDate);

      dates.push(issue.created.split("T")[0]); // Extract date part only (YYYY-MM-DD)
      times.push(duration); // Add the duration in hours
    });

    res.json({ dates, times });
  } catch (error) {
    console.error("Error fetching or processing time insights:", error);
    res.status(500).json({ error: "Failed to fetch time-based insights." });
  }
};
