import React, { useEffect, useState } from "react";

const IssuesList: React.FC = () => {
  const [issues, setIssues] = useState<any[]>([]);
  const [summary, setSummary] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async (filters: any = {}) => {
    const query = new URLSearchParams(filters).toString();
    const response = await fetch(`/api/issues?${query}`);
    const data = await response.json();
    setIssues(data.filteredData || []);
    setSummary(data.summary || {});
  };

  const handleSearch = () => {
    fetchIssues({ search: searchTerm });
  };

  const handleFilter = () => {
    fetchIssues({ status: "open", priority: "high" });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Issues List</h1>
      
      {/* Search and Filter */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          className="border p-2"
          placeholder="Search by organization_id"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2"
          onClick={handleSearch}
        >
          Search
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2"
          onClick={handleFilter}
        >
          Show Open High Priority Issues
        </button>
      </div>

      {/* High-Level Summary */}
      {summary && (
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">Summary</h2>
          <ul>
            <li>High Priority: {summary.byPriority.high}</li>
            <li>Normal Priority: {summary.byPriority.normal}</li>
            <li>Low Priority: {summary.byPriority.low}</li>
            <li>Questions: {summary.byType.question}</li>
            <li>Problems: {summary.byType.problem}</li>
            <li>Tasks: {summary.byType.task}</li>
            <li>Open: {summary.byStatus.open}</li>
            <li>Solved: {summary.byStatus.solved}</li>
            <li>Good Satisfaction: {summary.bySatisfaction.good}</li>
            <li>Bad Satisfaction: {summary.bySatisfaction.bad}</li>
          </ul>
        </div>
      )}

      {/* Issues List */}
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Priority</th>
            <th className="px-4 py-2">Type</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Organization ID</th>
          </tr>
        </thead>
        <tbody>
          {issues.map((issue) => (
            <tr key={issue.id}>
              <td className="border px-4 py-2">{issue.id}</td>
              <td className="border px-4 py-2">{issue.priority}</td>
              <td className="border px-4 py-2">{issue.type}</td>
              <td className="border px-4 py-2">{issue.status}</td>
              <td className="border px-4 py-2">{issue.organization_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IssuesList;
