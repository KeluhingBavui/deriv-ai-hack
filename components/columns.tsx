import { Checkbox } from "@/components/ui/checkbox";
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
    accessorKey: "sentiment",
    header: "Task",
    cell: ({ row }) => {
      const issue = row.original;
      return (
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "px-2 py-1 rounded-full text-xs",
              getSentimentColor(issue.sentiment)
            )}
          >
            {issue.sentiment}
          </span>
          <span className="px-2 py-1 rounded-full bg-white/10 text-xs">
            {issue.source}
          </span>
          {issue.critical && (
            <span className="px-2 py-1 rounded-full bg-red-500/20 text-red-500 text-xs">
              Critical
            </span>
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
      <span className="px-2 py-1 rounded-full bg-white/10 text-xs">
        {row.getValue("team")}
      </span>
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

const getSentimentColor = (sentiment: string) => {
  switch (sentiment) {
    case "Positive":
      return "bg-green-500/20 text-green-500";
    case "Negative":
      return "bg-red-500/20 text-red-500";
    case "Neutral":
      return "bg-blue-500/20 text-blue-500";
    default:
      return "";
  }
};
