import { Feedback, Issue } from "@/types";
import { useState } from "react";
import { FeedbackDrawer } from "./FeedbackDrawer";

interface FeedbackDetailsProps {
  feedbackList: Feedback[];
  issue: Issue;
}

export function FeedbackDetails({ feedbackList, issue }: FeedbackDetailsProps) {
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(
    null
  );

  return (
    <div className="p-4 bg-muted/50 rounded-lg space-y-3">
      <h4 className="font-medium text-sm">Related Feedback</h4>
      {feedbackList.length === 0 ? (
        <p className="text-sm text-muted-foreground">No feedback available</p>
      ) : (
        <div className="space-y-2">
          {feedbackList.map((feedback) => (
            <div
              key={feedback.id}
              className="p-3 bg-background rounded border border-border cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => setSelectedFeedback(feedback)}
            >
              <p className="text-sm">{feedback.content}</p>
              <div className="mt-2 flex gap-2 text-xs text-muted-foreground">
                <span>{new Date(feedback.createdAt).toLocaleDateString()}</span>
                <span>•</span>
                <span className="capitalize">{feedback.sentiment}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedFeedback && (
        <FeedbackDrawer
          feedback={selectedFeedback}
          issue={issue}
          open={!!selectedFeedback}
          onOpenChange={(open) => !open && setSelectedFeedback(null)}
        />
      )}
    </div>
  );
}
