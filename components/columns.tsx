import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
// import { cn } from "@/lib/utils";
import { Issue } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { OctagonAlert } from "lucide-react";

export const columns: ColumnDef<Issue>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "sentiment",
    accessorKey: "sentiment",
    header: "Tags",
    cell: ({ row }) => {
      const issue = row.original;
      return (
        <div className="flex items-center gap-2">
          <Badge variant={getSentimentVariant(issue.sentiment)}>
            {issue.sentiment}&nbsp;
            {getSentimentEmoji(issue.sentiment)}
          </Badge>
          {issue.critical && (
            <Badge variant="destructive">
              <OctagonAlert className="w-3 h-3 mr-1" />
              Critical
            </Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "source",
    header: "Source",
    cell: ({ row }) => {
      const issue = row.original;
      return <Badge variant="outline">{issue.source}</Badge>;
    },
  },
  {
    accessorKey: "description",
    header: "Issue",
  },
  {
    accessorKey: "team",
    header: "Response Team",
    cell: ({ row }) => <Badge variant="default">{row.getValue("team")}</Badge>,
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => {
      const priority = row.getValue("priority") as string;
      return (
        <Badge
          variant={getPriorityVariant(priority)}
          className="flex items-center gap-1 w-fit"
        >
          {priority === "High" && "↑"}
          {priority === "Low" && "↓"}
          {priority === "Medium" && "→"} {priority}
        </Badge>
      );
    },
  },
];

const getSentimentVariant = (sentiment: string) => {
  switch (sentiment) {
    case "Positive":
      return "success";
    case "Neutral":
      return "neutral";
    case "Negative":
      return "destructive";
    default:
      return "default";
  }
};

const getSentimentEmoji = (sentiment: string) => {
  switch (sentiment) {
    case "Positive":
      return "😄";
    case "Neutral":
      return "😐";
    case "Negative":
      return "😢";
    default:
      return "default";
  }
};

const getPriorityVariant = (priority: string) => {
  switch (priority) {
    case "High":
      return "destructive";
    case "Medium":
      return "default";
    case "Low":
      return "secondary";
    default:
      return "default";
  }
};
