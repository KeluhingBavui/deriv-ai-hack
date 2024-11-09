import { Issue } from "@/types";

export async function notifyIssue(issueId: string) {
  try {
    const response = await fetch(`/api/issues/${issueId}/notify`, {
      method: "POST",
    });
    if (!response.ok) throw new Error("Failed to notify team");
    return await response.json();
  } catch (error) {
    console.error("Error notifying team:", error);
    return null;
  }
}

export async function notifyCriticalIssues(issues: Issue[]) {
  const criticalIssues = issues.filter(
    (issue) => issue.critical && !issue.notified
  );

  const notifications = await Promise.all(
    criticalIssues.map((issue) => notifyIssue(issue.id))
  );

  return {
    notifications: notifications.filter(Boolean),
    updatedIssues: notifications.filter(Boolean) as Issue[]
  };
}
