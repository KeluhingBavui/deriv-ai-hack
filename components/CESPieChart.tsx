import { Pie, PieChart, Sector} from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface CESPieChartProps {
  value: number;
}

export function CESPieChart({ value }: CESPieChartProps) {
  const getActiveIndex = (value: number) => {
    return 7 - Math.round(value);
  };

  const chartData = [
    {
      name: "Level 7",
      value: 1,
      fill: "#E74C3C",
      range: "7",
    },
    {
      name: "Level 6",
      value: 1,
      fill: "#E67E22",
      range: "6",
    },
    {
      name: "Level 5",
      value: 1,
      fill: "#F39C12",
      range: "5",
    },
    {
      name: "Level 4",
      value: 1,
      fill: "#F4D03F",
      range: "4",
    },
    {
      name: "Level 3",
      value: 1,
      fill: "#82E0AA",
      range: "3",
    },
    {
      name: "Level 2",
      value: 1,
      fill: "#27AE60",
      range: "2",
    },
    {
      name: "Level 1",
      value: 1,
      fill: "#2ECC71",
      range: "1",
    },
  ];

  const chartConfig = {
    level7: {
      label: "Very Difficult",
      color: "#E74C3C",
    },
    level6: {
      label: "Difficult",
      color: "#E67E22",
    },
    level5: {
      label: "Somewhat Difficult",
      color: "#F39C12",
    },
    level4: {
      label: "Neutral",
      color: "#F4D03F",
    },
    level3: {
      label: "Somewhat Easy",
      color: "#82E0AA",
    },
    level2: {
      label: "Easy",
      color: "#27AE60",
    },
    level1: {
      label: "Very Easy",
      color: "#2ECC71",
    },
  } satisfies ChartConfig;

  return (
    <Card className="flex flex-col h-full">
        <CardHeader>
        <CardTitle>Customer Effort Score</CardTitle>
        <CardDescription>How easy is it to use your product?</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex items-center justify-center">
        <div className="relative w-full">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square h-[250px]"
          >
            <PieChart>
              <ChartTooltip 
                cursor={false} 
                content={<ChartTooltipContent />} 
              />
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
              <div className="text-3xl font-bold">{value}/7</div>
              <div className="text-sm text-muted-foreground">CES Score</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 