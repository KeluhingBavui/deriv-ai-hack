"use client";

import { useIssues } from "@/hooks/useIssues";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { DataPipeline } from "./DataPipeline";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Button } from "./ui/button";

export default function IssuesTable() {
  const { issues, loading, filteredIssues } = useIssues();
  const [isImported, setIsImported] = useState(false);

  // Load imported state from localStorage on mount
  useEffect(() => {
    const storedImportState = localStorage.getItem("isDataImported");
    if (storedImportState === "true") {
      setIsImported(true);
    }
  }, []);

  const handleImportComplete = () => {
    setIsImported(true);
    localStorage.setItem("isDataImported", "true");
  };

  const handleClearData = () => {
    localStorage.removeItem("isDataImported");
    setIsImported(false);
  };

  if (!isImported) {
    return <DataPipeline onImportComplete={handleImportComplete} />;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button variant="destructive" size="sm" onClick={handleClearData}>
          <Trash2 className="w-4 h-4 mr-2" />
          Clear Data
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-4">Loading...</div>
      ) : issues.length === 0 ? (
        <div className="text-center py-4">No issues found</div>
      ) : (
        <DataTable columns={columns} data={filteredIssues()} />
      )}
    </div>
  );
}
