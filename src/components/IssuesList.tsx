import React, { useEffect, useState } from "react";
import axios from "axios";
import { Issue } from "../api/types";

const IssuesList: React.FC = () => {
  const [issues, setIssues] = useState<Issue[]>([]); // Initialize as an empty array
  const [filter, setFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await axios.get<Issue[]>("/api/issues");
        console.log("Fetched Issues:", response.data); // Debug log
        setIssues(response.data || []); // Set issues or fallback to empty array
      } catch (error) {
        console.error("Error fetching issues:", error);
        setIssues([]); // Handle error with empty array fallback
      }
    };

    fetchIssues();
  }, []);

  // Safely filter issues
  const filteredIssues = Array.isArray(issues)
    ? issues.filter((issue) => {
        const matchesPriority = filter === "all" || issue.priority === filter;
        const matchesSearchTerm = issue.organization_id
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        return matchesPriority && matchesSearchTerm;
      })
    : [];

  return (
    <div>
      <h1>Issues List</h1>
      <div className="filters">
        <input
          type="text"
          placeholder="Search by organization ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 ml-2"
        >
          <option value="all">All Priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>
      <ul>
        {filteredIssues.map((issue) => (
          <li key={issue.id}>
            <h3>{issue.type}</h3>
            <p>Priority: {issue.priority}</p>
            <p>Organization ID: {issue.organization_id}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IssuesList;
