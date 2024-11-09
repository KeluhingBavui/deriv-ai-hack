"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useMemo, useState } from "react";
import { DataTableToolbar } from "./data-table-toolbar";
import { ExportButton } from "./ExportButton";
import { FeedbackDetails } from "./FeedbackDetails";
import { Button } from "./ui/button";

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
    const target = event.target as HTMLElement;
    // Check if click is from notify button or its children
    if (
      target.closest('[role="checkbox"]') ||
      target.getAttribute("aria-label")?.includes("Select") ||
      target.closest("[data-notify-button]")
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
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  const selectedRows = table
    .getFilteredSelectedRowModel()
    .rows.map((row) => row.original);

  // Get the total number of rows from filtered data
  const totalRows = filteredData.length;
  const PAGE_SIZES = [10, 20, 30, 40, 50];

  // Calculate the width needed for the input based on the number of digits
  const getInputWidth = (totalPages: number) => {
    const digits = totalPages.toString().length;
    return `${Math.max(digits * 10 + 10, 40)}px`; // minimum width of 40px
  };

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
                            ? "h-fit opacity-100"
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
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top" className="w-[70px] min-w-[70px]">
              {PAGE_SIZES.map((pageSize) => (
                <SelectItem
                  key={pageSize}
                  value={`${pageSize}`}
                  disabled={pageSize > totalRows && pageSize !== 10}
                  className={
                    pageSize > totalRows && pageSize !== 10
                      ? "text-muted-foreground"
                      : ""
                  }
                >
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-x-2">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronsLeft className="h-4 w-4" />
              First
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-x-1">
              <Input
                type="number"
                min={1}
                max={table.getPageCount()}
                value={table.getState().pagination.pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  if (page >= 0 && page < table.getPageCount()) {
                    table.setPageIndex(page);
                  }
                }}
                className="h-8 bg-background text-center"
                style={{
                  width: getInputWidth(table.getPageCount()),
                  paddingRight: "4px", // Adjust padding for number input arrows
                  paddingLeft: "4px",
                }}
              />
              <span className="text-sm text-muted-foreground whitespace-nowrap">
                of {table.getPageCount()}
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              Last
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
