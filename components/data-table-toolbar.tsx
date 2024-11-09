import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface DataTableToolbarProps {
  selectedSentiment: string;
  selectedSource: string;
  selectedTeam: string;
  onSentimentChange: (value: string) => void;
  onSourceChange: (value: string) => void;
  onTeamChange: (value: string) => void;
  onReset: () => void;
  showReset: boolean;
  exportButton: React.ReactNode;
}

export function DataTableToolbar({
  selectedSentiment,
  selectedSource,
  selectedTeam,
  onSentimentChange,
  onSourceChange,
  onTeamChange,
  onReset,
  showReset,
  exportButton,
}: DataTableToolbarProps) {
  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex flex-1 items-center space-x-2">
        <Select value={selectedSentiment} onValueChange={onSentimentChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by sentiment">
              {selectedSentiment === "all"
                ? "All Sentiments"
                : selectedSentiment}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sentiments</SelectItem>
            <SelectItem value="Positive">Positive</SelectItem>
            <SelectItem value="Neutral">Neutral</SelectItem>
            <SelectItem value="Negative">Negative</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedSource} onValueChange={onSourceChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by source">
              {selectedSource === "all" ? "All Sources" : selectedSource}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sources</SelectItem>
            <SelectItem value="Trust Pilot">Trust Pilot</SelectItem>
            <SelectItem value="Live Chat">Live Chat</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedTeam} onValueChange={onTeamChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by team">
              {selectedTeam === "all" ? "All Teams" : selectedTeam}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Teams</SelectItem>
            <SelectItem value="Finance">Finance</SelectItem>
            <SelectItem value="Engineering">Engineering</SelectItem>
            <SelectItem value="Product">Product</SelectItem>
            <SelectItem value="Risk and Compliance">Risk and Compliance</SelectItem>
          </SelectContent>
        </Select>

        {showReset && (
          <Button variant="ghost"   onClick={onReset} className="px-4">
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      {exportButton}
    </div>
  );
}
