import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface SentimentIndicatorProps {
  positive: number;
  neutral: number;
  negative: number;
}

export function SentimentIndicator({ positive, neutral, negative }: SentimentIndicatorProps) {
  const total = positive + neutral + negative;
  const getPercentage = (value: number) => ((value / total) * 100).toFixed(0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm text-muted-foreground font-normal">
          Customer Sentiment
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center h-32 space-y-4">
          <div className="relative w-24 h-24 flex items-center justify-center">
            {/* Circular progress indicators */}
            <svg className="w-full h-full -rotate-90">
              <circle
                className="text-white/5"
                strokeWidth="8"
                stroke="currentColor"
                fill="transparent"
                r="36"
                cx="48"
                cy="48"
              />
              <circle
                className="text-green-500 transition-all duration-300 ease-in-out"
                strokeWidth="8"
                strokeDasharray={`${(positive / total) * 226} 226`}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="36"
                cx="48"
                cy="48"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-2xl">
              😊
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 w-full text-center text-sm">
            <div>
              <div className="text-green-500">{getPercentage(positive)}%</div>
              <div className="text-xs text-white/60">Positive</div>
            </div>
            <div>
              <div className="text-yellow-500">{getPercentage(neutral)}%</div>
              <div className="text-xs text-white/60">Neutral</div>
            </div>
            <div>
              <div className="text-red-500">{getPercentage(negative)}%</div>
              <div className="text-xs text-white/60">Negative</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 