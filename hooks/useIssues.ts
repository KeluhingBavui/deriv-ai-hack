"use client";

import { FilterOptions, Issue } from "@/types";
import { useCallback, useState } from "react";

export function useIssues() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [filters, setFilters] = useState<FilterOptions>({});
  const [loading, setLoading] = useState(true);

  const fetchIssues = useCallback(async () => {
    try {
      const response = await fetch("/api/issues");
      const data = await response.json();
      setIssues(data);
    } catch (error) {
      console.error("Error fetching issues:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const createIssue = async (data: Omit<Issue, "id">) => {
    try {
      const response = await fetch("/api/issues", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const newIssue = await response.json();
      setIssues((prev) => [...prev, newIssue]);
    } catch (error) {
      console.error("Error creating issue:", error);
    }
  };

  const updateIssue = async (id: string, data: Partial<Issue>) => {
    try {
      const response = await fetch(`/api/issues/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const updatedIssue = await response.json();
      setIssues((prev) =>
        prev.map((issue) => (issue.id === id ? updatedIssue : issue))
      );
    } catch (error) {
      console.error("Error updating issue:", error);
    }
  };

  const deleteIssue = async (id: string) => {
    try {
      await fetch(`/api/issues/${id}`, { method: "DELETE" });
      setIssues((prev) => prev.filter((issue) => issue.id !== id));
    } catch (error) {
      console.error("Error deleting issue:", error);
    }
  };

  const filteredIssues = useCallback(() => {
    return issues.filter((issue) => {
      if (filters.status && issue.sentiment !== filters.status) return false;
      if (filters.priority && issue.priority !== filters.priority) return false;
      return true;
    });
  }, [issues, filters]);

  return {
    issues,
    loading,
    filteredIssues,
    setFilters,
    createIssue,
    updateIssue,
    deleteIssue,
    fetchIssues,
  };
}
