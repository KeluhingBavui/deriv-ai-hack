import { Pie, PieChart, Sector } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";
import {
  Card,
  CardDescription,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface NPSPieChartProps {
  value: number;
}

export function NPSPieChart({ value }: NPSPieChartProps) {
  const getActiveIndex = (value: number) => {
    if (value >= 9) return 2;
    if (value >= 7) return 1;
    return 0;
  };

  const chartData = [
    {
      name: "Detractors",
      value: 6,
      fill: "hsl(var(--destructive))",
      range: "1-6",
    },
    {
      name: "Passives",
      value: 2,
      fill: "hsl(var(--warning))",
      range: "7-8",
    },
    {
      name: "Promoters",
      value: 2,
      fill: "hsl(var(--success))",
      range: "9-10",
    },
  ];

  const chartConfig = {
    detractors: {
      label: "Detractors",
      color: "hsl(var(--destructive))",
    },
    passives: {
      label: "Passives",
      color: "hsl(var(--warning))",
    },
    promoters: {
      label: "Promoters",
      color: "hsl(var(--success))",
    },
  } satisfies ChartConfig;

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>Net Promoter Score</CardTitle>
        <CardDescription>How well do customers recommend your product?</CardDescription>
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
              <div className="text-3xl font-bold">{value}/10</div>
              <div className="text-sm text-muted-foreground">NPS Score</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
