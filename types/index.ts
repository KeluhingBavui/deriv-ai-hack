export interface Issue {
  id: string;
  sentiment: "Positive" | "Negative" | "Neutral";
  source: "Trust Pilot" | "Live Chat";
  description: string;
  critical?: boolean;
  team: "Finance" | "Engineering" | "Support";
  priority: "Low" | "Medium" | "High";
  notified: boolean;
  notifiedAt?: Date;
  tags?: string[];
}

export interface FilterOptions {
  status?: string;
  priority?: string;
  sentiment?: string;
  source?: string;
  team?: string;
  category?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
}

export interface Feedback {
  id: string;
  content: string;
  sentiment: string;
  createdAt: Date;
  userId: string;
  issueId: string | null;
}
