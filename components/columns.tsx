import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Issue } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

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
    header: "Task",
    cell: ({ row }) => {
      const issue = row.original;
      return (
        <div className="flex items-center gap-2">
          <Badge variant={getSentimentVariant(issue.sentiment)}>
            {issue.sentiment}
          </Badge>
          <Badge variant="outline">
            {issue.source}
          </Badge>
          {issue.critical && (
            <Badge variant="destructive">
              Critical
            </Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Title",
  },
  {
    accessorKey: "team",
    header: "Team",
    cell: ({ row }) => (
      <Badge variant="default">
        {row.getValue("team")}
      </Badge>
    ),
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => {
      const priority = row.getValue("priority") as string;
      return (
        <span className="flex items-center gap-1">
          {priority === "High" && "↑"}
          {priority === "Low" && "↓"}
          {priority === "Medium" && "→"} {priority}
        </span>
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
