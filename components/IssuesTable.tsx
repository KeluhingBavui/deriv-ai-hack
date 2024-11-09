"use client";

import { useIssues } from "@/hooks/useIssues";
import { useState } from "react";
import { DataPipeline } from "./DataPipeline";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function IssuesTable() {
  const { issues, loading, filteredIssues } = useIssues();
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

  return <DataTable columns={columns} data={filteredIssues()} />;
}
