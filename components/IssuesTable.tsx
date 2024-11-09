"use client";

import { useIssues } from "@/hooks/useIssues";
import { cn } from "@/lib/utils";
import { Filter } from "lucide-react";
import { useState } from "react";
import { DataPipeline } from "./DataPipeline";

export default function IssuesTable() {
  const { issues, loading, filteredIssues, setFilters } = useIssues();
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [isImported, setIsImported] = useState(false);

  if (!isImported) {
    return <DataPipeline onImportComplete={() => setIsImported(true)} />;
  }

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (issues.length === 0) {
    return <div className="text-center py-4">No issues found</div>;
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "Positive":
        return "bg-green-500/20 text-green-500";
      case "Negative":
        return "bg-red-500/20 text-red-500";
      case "Neutral":
        return "bg-blue-500/20 text-blue-500";
      default:
        return "";
    }
  };

  return (
    <div className="rounded-lg border border-white/10">
      <div className="p-4 flex items-center gap-4">
        <Filter className="w-4 h-4" />
        <input
          type="text"
          placeholder="Filter tasks..."
          className="bg-transparent border-none outline-none flex-1"
        />
      </div>
      <table className="w-full">
        <thead className="bg-white/5">
          <tr>
            <th className="w-8 px-4 py-3">
              <input
                type="checkbox"
                className="rounded border-white/10"
                onChange={(e) => {
                  setSelectedRows(
                    e.target.checked ? issues.map((i) => i.id) : []
                  );
                }}
              />
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-white/60">
              Task
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-white/60">
              Title
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-white/60">
              Team
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-white/60">
              Priority
            </th>
            <th className="w-8"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {filteredIssues().map((issue) => (
            <tr key={issue.id} className="hover:bg-white/5">
              <td className="px-4 py-3">
                <input
                  type="checkbox"
                  className="rounded border-white/10"
                  checked={selectedRows.includes(issue.id)}
                  onChange={(e) => {
                    setSelectedRows((prev) =>
                      e.target.checked
                        ? [...prev, issue.id]
                        : prev.filter((id) => id !== issue.id)
                    );
                  }}
                />
              </td>
              <td className="px-4 py-3 text-sm">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "px-2 py-1 rounded-full text-xs",
                      getSentimentColor(issue.sentiment)
                    )}
                  >
                    {issue.sentiment}
                  </span>
                  <span className="px-2 py-1 rounded-full bg-white/10 text-xs">
                    {issue.source}
                  </span>
                  {issue.critical && (
                    <span className="px-2 py-1 rounded-full bg-red-500/20 text-red-500 text-xs">
                      Critical
                    </span>
                  )}
                </div>
              </td>
              <td className="px-4 py-3 text-sm">{issue.description}</td>
              <td className="px-4 py-3 text-sm">
                <span className="px-2 py-1 rounded-full bg-white/10 text-xs">
                  {issue.team}
                </span>
              </td>
              <td className="px-4 py-3 text-sm">
                <span className="flex items-center gap-1">
                  {issue.priority === "High" && "↑"}
                  {issue.priority === "Low" && "↓"}
                  {issue.priority === "Medium" && "→"}
                  {issue.priority}
                </span>
              </td>
              <td className="px-4 py-3 text-sm">
                <button className="opacity-0 group-hover:opacity-100">
                  •••
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
