"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
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
import { Feedback, Issue } from "@/types";
import { DataTableToolbar } from "./data-table-toolbar";
import { ExportButton } from "./ExportButton";
import { FeedbackDetails } from "./FeedbackDetails";

interface DataTableProps<TData extends Issue, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData extends Issue, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({});
  const [selectedSentiment, setSelectedSentiment] = useState<string>("all");
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
  const [feedbackData, setFeedbackData] = useState<Record<string, Feedback[]>>(
    {}
  );

  // Filter the data based on selected sentiment
  const filteredData = useMemo(() => {
    if (selectedSentiment === "all") return data;
    return data.filter((item) => item.sentiment === selectedSentiment);
  }, [data, selectedSentiment]);

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

  const toggleRow = async (issueId: string) => {
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
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
  });

  const selectedRows = table
    .getFilteredSelectedRowModel()
    .rows.map((row) => row.original);

  return (
    <div className="space-y-4">
      <DataTableToolbar
        selectedSentiment={selectedSentiment}
        onSentimentChange={setSelectedSentiment}
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
                    onClick={() => toggleRow(row.original.id)}
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
                  {expandedRows[row.original.id] && (
                    <TableRow>
                      <TableCell colSpan={columns.length} className="p-0">
                        <FeedbackDetails
                          feedbackList={feedbackData[row.original.id] || []}
                        />
                      </TableCell>
                    </TableRow>
                  )}
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
