import { Feedback } from "@/types";

interface FeedbackDetailsProps {
  feedbackList: Feedback[];
}

export function FeedbackDetails({ feedbackList }: FeedbackDetailsProps) {
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
              className="p-3 bg-background rounded border border-border"
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
    </div>
  );
}
