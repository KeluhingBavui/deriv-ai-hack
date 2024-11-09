"use client";

import { Bar, BarChart, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface SentimentIndicatorProps {
  positive: number;
  neutral: number;
  negative: number;
}

export function SentimentIndicator({
  positive,
  neutral,
  negative,
}: SentimentIndicatorProps) {
  const total = positive + neutral + negative;
  const getPercentage = (value: number) =>
    Number(((value / total) * 100).toFixed(0));

  const chartData = [
    { sentiment: "positive", value: getPercentage(positive), fill: "hsl(var(--success))" },
    { sentiment: "neutral", value: getPercentage(neutral), fill: "hsl(var(--neutral))" },
    { sentiment: "negative", value: getPercentage(negative), fill: "hsl(var(--destructive))" },
  ];

  const chartConfig = {
    value: {
      label: "Percentage",
    },
    positive: {
      label: "Positive",
      color: "hsl(var(--success))",
    },
    neutral: {
      label: "Neutral",
      color: "hsl(var(--neutral))",
    },
    negative: {
      label: "Negative",
      color: "hsl(var(--destructive))",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sentiment Analysis</CardTitle>
        <CardDescription>Content sentiment distribution</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 10,
            }}
          >
            <YAxis
              dataKey="sentiment"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <XAxis dataKey="value" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="value"
              layout="vertical"
              radius={5}
            />
          </BarChart>
        </ChartContainer>

        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-green-500">
              {getPercentage(positive)}%
            </div>
            <div className="text-sm text-muted-foreground">Positive</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-neutral">
              {getPercentage(neutral)}%
            </div>
            <div className="text-sm text-muted-foreground">Neutral</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-500">
              {getPercentage(negative)}%
            </div>
            <div className="text-sm text-muted-foreground">Negative</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
