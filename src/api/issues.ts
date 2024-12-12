import { Request, Response } from "express";
import axios from "axios";

interface Issue {
  id: number;
  priority: "high" | "normal" | "low";
  type: "problem" | "question" | "task";
  status: "open" | "hold" | "solved" | "pending";
  organization_id: string;
  satisfaction_rating?: {
    score: "good" | "bad";
  };
}

interface Summary {
  byPriority: Record<"high" | "normal" | "low", number>;
  byType: Record<"problem" | "question" | "task", number>;
  byStatus: Record<"open" | "hold" | "solved" | "pending", number>;
  bySatisfaction: Record<"good" | "bad", number>;
}

export const GET = async (req: Request, res: Response) => {
  try {
    // Fetch sample data
    const response = await axios.get<{ results: Issue[] }>(
      "https://sampleapi.squaredup.com/integrations/v1/service-desk?datapoints=30"
    );
    const data = response.data.results;

    // Sort data by priority
    const priorityOrder: Record<Issue["priority"], number> = {
      high: 1,
      normal: 2,
      low: 3,
    };
    const sortedData = data.sort(
      (a: Issue, b: Issue) =>
        priorityOrder[a.priority] - priorityOrder[b.priority]
    );

    // Apply filters based on query parameters
    let filteredData = sortedData;

    if (req.query.status === "open" && req.query.priority === "high") {
      filteredData = sortedData.filter(
        (issue: Issue) =>
          issue.status === "open" && issue.priority === "high"
      );
    }

    if (req.query.search) {
      const searchTerm = req.query.search.toString().toLowerCase();
      filteredData = sortedData.filter((issue: Issue) =>
        issue.organization_id.toLowerCase().includes(searchTerm)
      );
    }

    // Provide high-level summary
    const summary: Summary = {
      byPriority: data.reduce(
        (acc, issue: Issue) => {
          acc[issue.priority] = (acc[issue.priority] || 0) + 1;
          return acc;
        },
        { high: 0, normal: 0, low: 0 }
      ),
      byType: data.reduce(
        (acc, issue: Issue) => {
          acc[issue.type] = (acc[issue.type] || 0) + 1;
          return acc;
        },
        { problem: 0, question: 0, task: 0 }
      ),
      byStatus: data.reduce(
        (acc, issue: Issue) => {
          acc[issue.status] = (acc[issue.status] || 0) + 1;
          return acc;
        },
        { open: 0, hold: 0, solved: 0, pending: 0 }
      ),
      bySatisfaction: data.reduce(
        (acc, issue: Issue) => {
          const score = issue.satisfaction_rating?.score || "unknown";
          if (score === "good" || score === "bad") {
            acc[score] = (acc[score] || 0) + 1;
          }
          return acc;
        },
        { good: 0, bad: 0 }
      ),
    };

    res.json({ filteredData, summary });
  } catch (error: any) {
    console.error("Error fetching issues:", error.message);
    res.status(500).json({ error: "Failed to fetch issues." });
  }
};
