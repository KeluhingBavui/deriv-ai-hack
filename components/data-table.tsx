"use client";

import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Feedback, Issue } from "@/types";
import { DataTableToolbar } from "./data-table-toolbar";
import { ExportButton } from "./ExportButton";
import { FeedbackDetails } from "./FeedbackDetails";

interface DataTableProps<TData extends Issue, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

// Move helper functions outside of the component
const hasActiveFilters = (
  sentiment: string,
  source: string,
  team: string,
  sorting: SortingState
) => {
  return (
    sentiment !== "all" ||
    source !== "all" ||
    team !== "all" ||
    sorting.length > 0
  );
};

export function DataTable<TData extends Issue, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({});
  const [selectedSentiment, setSelectedSentiment] = useState<string>("all");
  const [selectedSource, setSelectedSource] = useState<string>("all");
  const [selectedTeam, setSelectedTeam] = useState<string>("all");
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
  const [feedbackData, setFeedbackData] = useState<Record<string, Feedback[]>>(
    {}
  );
  const [sorting, setSorting] = useState<SortingState>([]);

  const handleReset = () => {
    setSelectedSentiment("all");
    setSelectedSource("all");
    setSelectedTeam("all");
    setSorting([]);
  };

  const showReset = hasActiveFilters(
    selectedSentiment,
    selectedSource,
    selectedTeam,
    sorting
  );

  // Filter the data based on selected filters
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesSentiment =
        selectedSentiment === "all" || item.sentiment === selectedSentiment;
      const matchesSource =
        selectedSource === "all" || item.source === selectedSource;
      const matchesTeam = selectedTeam === "all" || item.team === selectedTeam;
      return matchesSentiment && matchesSource && matchesTeam;
    });
  }, [data, selectedSentiment, selectedSource, selectedTeam]);

  const fetchFeedback = async (issueId: string) => {
    try {
      const response = await fetch(`/api/issues/${issueId}/feedback`);
      const data = await response.json();
      setFeedbackData((prev) => ({
        ...prev,
        [issueId]: data,
      }));
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  };

  const toggleRow = async (issueId: string, event: React.MouseEvent) => {
    // Check if the click target is a checkbox or its parent label
    const target = event.target as HTMLElement;
    if (
      target.closest('[role="checkbox"]') ||
      target.getAttribute("aria-label")?.includes("Select")
    ) {
      return;
    }

    setExpandedRows((prev) => {
      const isExpanded = !prev[issueId];
      if (isExpanded && !feedbackData[issueId]) {
        fetchFeedback(issueId);
      }
      return {
        ...prev,
        [issueId]: isExpanded,
      };
    });
  };

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      rowSelection,
      sorting,
    },
    enableRowSelection: true,
    enableSorting: true,
    enableMultiSort: false,
    onRowSelectionChange: setRowSelection,
    onSortingChange: (updater) => {
      // If it's a function, call it with current state
      if (typeof updater === "function") {
        setSorting(updater(sorting));
      } else {
        // If it's a direct value, use it
        setSorting(updater);
      }
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const selectedRows = table
    .getFilteredSelectedRowModel()
    .rows.map((row) => row.original);

  return (
    <div className="space-y-4">
      <DataTableToolbar
        selectedSentiment={selectedSentiment}
        selectedSource={selectedSource}
        selectedTeam={selectedTeam}
        onSentimentChange={setSelectedSentiment}
        onSourceChange={setSelectedSource}
        onTeamChange={setSelectedTeam}
        onReset={handleReset}
        showReset={showReset}
        exportButton={<ExportButton data={data} selectedRows={selectedRows} />}
      />
      <div className="rounded-lg border border-border">
        <Table>
          <TableHeader className="bg-muted/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <>
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="hover:bg-white/5 cursor-pointer"
                    onClick={(e) => toggleRow(row.original.id, e)}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={columns.length} className="p-0">
                      <div
                        className={cn(
                          "transition-all duration-500 ease-in-out",
                          expandedRows[row.original.id]
                            ? "max-h-[500px] opacity-100"
                            : "max-h-0 opacity-0 overflow-hidden"
                        )}
                      >
                        <FeedbackDetails
                          feedbackList={feedbackData[row.original.id] || []}
                          issue={row.original}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                </>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
