"use client";

import { useIssues } from "@/hooks/useIssues";
import { notifyCriticalIssues } from "@/lib/notifyIssue";
import { RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { DataPipeline } from "./DataPipeline";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Button } from "./ui/button";
import { CriticalIssueNotification } from "./CriticalIssueNotification";

export default function IssuesTable() {
  const { issues, loading, filteredIssues, fetchIssues } = useIssues();
  const [isImported, setIsImported] = useState(false);

  useEffect(() => {
    const storedImportState = localStorage.getItem("isDataImported");
    if (storedImportState === "true") {
      setIsImported(true);
    }
  }, []);

  const handleImportComplete = async () => {
    setIsImported(true);
    localStorage.setItem("isDataImported", "true");
    const issues = await fetchIssues();
    if (issues) {
      const { updatedIssues } = await notifyCriticalIssues(issues);
      if (updatedIssues.length > 0) {
        window.alert(
          `${updatedIssues.length} critical issues have been notified to the response team.`
        );
        await fetchIssues();
      }
    }
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
          <RefreshCcw className="w-4 h-4 mr-1" />
          Refresh Data
        </Button>
      </div>

      <CriticalIssueNotification issues={issues} />

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
