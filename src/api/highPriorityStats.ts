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

    // Filter high-priority issues
    const highPriorityIssues = sampleData.filter(
      (issue) => issue.priority === "high"
    );

    if (highPriorityIssues.length === 0) {
      return res.json({
        message: "No high-priority issues found in the dataset.",
      });
    }

    // Calculate average time to close high-priority issues
    const totalTimeToClose = highPriorityIssues.reduce((acc, issue) => {
      const timeToClose = issue.due
        ? new Date(issue.due).getTime() - new Date(issue.created).getTime()
        : 0;
      return acc + timeToClose;
    }, 0);

    const averageTimeToClose =
      totalTimeToClose / highPriorityIssues.length / (1000 * 60 * 60); // Convert milliseconds to hours

    // Find the issue with the longest resolution time
    const longestResolutionIssue = highPriorityIssues.reduce((longest, issue) => {
      const currentResolutionTime = issue.due
        ? new Date(issue.due).getTime() - new Date(issue.created).getTime()
        : 0;

      const longestResolutionTime = longest.due
        ? new Date(longest.due).getTime() - new Date(longest.created).getTime()
        : 0;

      return currentResolutionTime > longestResolutionTime ? issue : longest;
    });

    // Extract the satisfaction score of the issue with the longest resolution time
    const satisfactionScore =
      longestResolutionIssue.satisfaction_rating?.score || "Not Rated";

    // Return the aggregated stats
    res.json({
      high_priority_issues_count: highPriorityIssues.length,
      average_time_to_close_high_priority_issues: `${averageTimeToClose.toFixed(
        2
      )} hours`,
      longest_resolution_issue_satisfaction_score: satisfactionScore,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch data from the API." });
  }
};
