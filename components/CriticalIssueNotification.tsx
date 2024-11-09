"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Issue } from "@/types";
import { AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";

interface CriticalIssueNotificationProps {
  issues: Issue[];
}

export function CriticalIssueNotification({
  issues,
}: CriticalIssueNotificationProps) {
  const [show, setShow] = useState(false);
  const criticalIssues = issues.filter((issue) => issue.critical);

  useEffect(() => {
    if (criticalIssues.length > 0) {
      setShow(true);
      // Simulate notification being sent to security team
      console.log("Security team notified of critical issues:", criticalIssues);
    }
  }, [criticalIssues]);

  if (!show || criticalIssues.length === 0) return null;

  return (
    <Alert variant="destructive" className="mb-4">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Security Compliance Alert</AlertTitle>
      <AlertDescription className="mt-2">
        <p>
          {criticalIssues.length} critical{" "}
          {criticalIssues.length === 1 ? "issue has" : "issues have"} been
          detected and the security compliance team has been notified.
        </p>
        <ul className="mt-2 list-disc list-inside">
          {criticalIssues.map((issue) => (
            <li key={issue.id} className="text-sm">
              {issue.description}
            </li>
          ))}
        </ul>
      </AlertDescription>
    </Alert>
  );
}
