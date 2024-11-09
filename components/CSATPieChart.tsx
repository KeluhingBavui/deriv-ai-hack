import { Pie, PieChart, Sector } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface CSATPieChartProps {
  value: number;
}

export function CSATPieChart({ value }: CSATPieChartProps) {
  const getActiveIndex = (value: number) => {
    if (value >= 90) return 3;
    if (value >= 70) return 2;
    if (value >= 50) return 1;
    return 0;
  };

  const chartData = [
    {
      name: "Needs Improvement",
      value: 50,
      fill: "hsl(var(--destructive))",
      range: "0-50",
    },
    {
      name: "Fair",
      value: 20,
      fill: "hsl(var(--warning))",
      range: "50-70",
    },
    {
      name: "Good",
      value: 20,
      fill: "hsl(var(--neutral))",
      range: "70-90",
    },
    {
      name: "Excellent",
      value: 10,
      fill: "hsl(var(--success))",
      range: "90-100",
    },
  ];

  const chartConfig = {
    needsImprovement: {
      label: "Needs Improvement",
      color: "hsl(var(--destructive))",
    },
    fair: {
      label: "Fair",
      color: "hsl(var(--warning))",
    },
    good: {
      label: "Good",
      color: "hsl(var(--neutral))",
    },
    excellent: {
      label: "Excellent",
      color: "hsl(var(--success))",
    },
  } satisfies ChartConfig;

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>Customer Satisfaction Score</CardTitle>
        <CardDescription>How satisfied are customers with your product?</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex items-center justify-center">
        <div className="relative w-full">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square h-[250px]"
          >
            <PieChart>
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={80}
                strokeWidth={5}
                activeIndex={getActiveIndex(value)}
                activeShape={({
                  outerRadius = 0,
                  ...props
                }: PieSectorDataItem) => (
                  <Sector {...props} outerRadius={outerRadius + 10} />
                )}
              />
            </PieChart>
          </ChartContainer>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-3xl font-bold">{value}%</div>
              <div className="text-sm text-muted-foreground">CSAT Score</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
