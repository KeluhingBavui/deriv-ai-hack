import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DataTableToolbarProps {
  selectedSentiment: string;
  onSentimentChange: (value: string) => void;
}

export function DataTableToolbar({ 
  selectedSentiment,
  onSentimentChange 
}: DataTableToolbarProps) {
  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex flex-1 items-center space-x-2">
        <Select 
          value={selectedSentiment} 
          onValueChange={onSentimentChange}
        >
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
      </div>
    </div>
  );
} 