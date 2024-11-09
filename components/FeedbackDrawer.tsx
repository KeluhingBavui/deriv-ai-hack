import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Feedback, Issue } from "@/types";
import { AlertTriangle, BellRing, CheckCircle2, Timer } from "lucide-react";
import { NotifyAlert } from "./NotifyAlert";
import { Badge } from "./ui/badge";

interface FeedbackDrawerProps {
  feedback: Feedback;
  issue: Issue;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const getPriorityVariant = (priority: string) => {
  switch (priority) {
    case "High":
      return "destructive";
    case "Medium":
      return "secondary";
    case "Low":
      return "secondary";
    default:
      return "default";
  }
};

export function FeedbackDrawer({
  feedback,
  issue,
  open,
  onOpenChange,
}: FeedbackDrawerProps) {
  const getActionableInsight = (sentiment: string, priority: string) => {
    if (sentiment === "Negative" && priority === "High") {
      return "Immediate attention required. Escalate to response team.";
    } else if (sentiment === "Negative") {
      return "Review and address customer concerns promptly.";
    } else if (sentiment === "Positive") {
      return "Share positive feedback with team and identify successful practices.";
    }
    return "Monitor for patterns and potential improvements.";
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-2xl">
          <DrawerHeader>
            <DrawerTitle>Feedback Details</DrawerTitle>
            <DrawerDescription>
              Submitted on {new Date(feedback.createdAt).toLocaleString()}
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-6 space-y-6">
            {/* Priority and Notification Status */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant={getPriorityVariant(issue.priority)}>
                  {issue.priority} Priority
                </Badge>
                {issue.critical && (
                  <Badge variant="destructive">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    Critical
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2">
                {issue.notified ? (
                  <div className="flex items-center gap-2 text-green-500">
                    <BellRing className="w-4 h-4" />
                    <span className="text-sm">Team Notified</span>
                  </div>
                ) : (
                  <NotifyAlert
                    issueId={issue.id}
                    description={issue.description}
                    onNotifySuccess={() => window.location.reload()}
                  />
                )}
              </div>
            </div>

            {/* Feedback Content */}
            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="">{feedback.content}</p>
            </div>

            {/* Related Issue */}
            <div className="space-y-2">
              <h4 className="font-medium">Related Issue</h4>
              <p className="text-muted-foreground">{issue.description}</p>
            </div>

            {/* Actionable Insights */}
            <div className="space-y-2 bg-background border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <h4 className="font-medium">Actionable Insights</h4>
              </div>
              <p className="text-muted-foreground">
                {getActionableInsight(feedback.sentiment, issue.priority)}
              </p>
              {issue.notified && issue.notifiedAt && (
                <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
                  <Timer className="w-4 h-4" />
                  <span>
                    Response team notified on{" "}
                    {new Date(issue.notifiedAt).toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
