import { Request, Response } from "express";
import axios from "axios";
import { SampleData, Issue } from "./types";

export const GET = async (req: Request, res: Response) => {
  try {
    // Fetch data from the API
    const response = await axios.get<SampleData>(
      "https://sampleapi.squaredup.com/integrations/v1/service-desk?datapoints=30"
    );

    // Extract the results array from the API response
    const sampleData = response.data.results;

    // Total number of data points
    const total = sampleData.length;

    // Aggregate types (problem, question, task, incident)
    const types = sampleData.reduce(
      (acc: { problem: number; question: number; task: number; incident: number }, issue: Issue) => {
        if (["problem", "question", "task", "incident"].includes(issue.type)) {
          acc[issue.type] = (acc[issue.type] || 0) + 1;
        }
        return acc;
      },
      { problem: 0, question: 0, task: 0, incident: 0 }
    );

    // Aggregate priorities (high, medium, low, normal)
    const priorities = sampleData.reduce(
      (acc: { high: number; medium: number; low: number; normal: number }, issue: Issue) => {
        if (["high", "medium", "low", "normal"].includes(issue.priority)) {
          acc[issue.priority] = (acc[issue.priority] || 0) + 1;
        }
        return acc;
      },
      { high: 0, medium: 0, low: 0, normal: 0 }
    );

    // Aggregate satisfaction ratings (good, bad, average)
    const satisfaction = sampleData.reduce(
      (acc: { good: number; bad: number; average: number }, issue: Issue) => {
        const score = issue.satisfaction_rating?.score;
        if (score && ["good", "bad", "average"].includes(score)) {
          acc[score] = (acc[score] || 0) + 1;
        }
        return acc;
      },
      { good: 0, bad: 0, average: 0 }
    );

    // Calculate average resolution time for high-priority issues
    const highPriorityIssues = sampleData.filter(
      (issue) => issue.priority === "high" && issue.updated && issue.created
    );
    const avgResolutionTime =
      highPriorityIssues.reduce((acc, issue) => {
        const created = new Date(issue.created).getTime();
        const updated = new Date(issue.updated).getTime();
        return acc + (updated - created) / (1000 * 60 * 60); // Convert to hours
      }, 0) / highPriorityIssues.length || 0;

    // Send the response
    res.json({
      problems_percentage: ((types.problem || 0) / total) * 100,
      questions_percentage: ((types.question || 0) / total) * 100,
      tasks_percentage: ((types.task || 0) / total) * 100,
      incidents_percentage: ((types.incident || 0) / total) * 100,
      high_priority_percentage: ((priorities.high || 0) / total) * 100,
      medium_priority_percentage: ((priorities.medium || 0) / total) * 100,
      low_priority_percentage: ((priorities.low || 0) / total) * 100,
      normal_priority_percentage: ((priorities.normal || 0) / total) * 100,
      satisfaction,
      avg_resolution_time: avgResolutionTime.toFixed(2),
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch data from the API." });
  }
};
