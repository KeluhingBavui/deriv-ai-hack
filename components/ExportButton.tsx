"use client";

import { Issue } from "@/types";
import { Download } from "lucide-react";
import { Button } from "./ui/button";

interface ExportButtonProps {
  data: Issue[];
  selectedRows: Issue[];
}

export function ExportButton({ data, selectedRows }: ExportButtonProps) {
  const handleExport = () => {
    const dataToExport = selectedRows.length > 0 ? selectedRows : data;

    // Convert data to CSV format
    const headers = [
      "Sentiment",
      "Source",
      "Description",
      "Team",
      "Priority",
      "Critical",
    ];
    const csvContent = [
      headers.join(","),
      ...dataToExport.map((issue) =>
        [
          issue.sentiment,
          issue.source,
          `"${issue.description.replace(/"/g, '""')}"`,
          issue.team,
          issue.priority,
          issue.critical,
        ].join(",")
      ),
    ].join("\n");

    // Create and trigger download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "issues.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button variant="default" onClick={handleExport}>
      <Download className="w-4 h-4 mr-2" />
      Export CSV{" "}
      {selectedRows.length > 0 && `(${selectedRows.length} selected)`}
    </Button>
  );
}
