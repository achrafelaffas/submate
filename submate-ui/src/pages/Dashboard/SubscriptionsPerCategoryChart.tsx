import { Cell, Label, Pie, PieChart } from "recharts";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { StatisticsApi, SubscriptionsPerCategory } from "@/api";
import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import TooltipDemo from "../../components/ToolTipDemo";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";

const chartConfig = {} satisfies ChartConfig;

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

interface ToolTip {
  name: string | undefined;
  value: number | undefined;
  fill: string | undefined;
}

const SubscriptionsPerCategoryChart = () => {
  const config = useAuth();
  const statisticsApi = new StatisticsApi(config);
  const [chartData, setChartData] = useState<SubscriptionsPerCategory[]>([]);
  const [tooTipData, setToolTipData] = useState<ToolTip[]>([]);
  const [totalSubs, setTotalSubs] = useState(0);

  const fecthData = async () => {
    await statisticsApi.getSubsCountPerCategory().then(
      (response) => {
        setChartData(response.data);

        const toolTipData: ToolTip[] = response.data.map((data, i) => ({
          name: data.category,
          value: data.count,
          fill: COLORS[i],
        }));

        setToolTipData(toolTipData);

        const totalSubs = response.data.reduce(
          (acc, curr) => acc + curr.count!,
          0
        );
        setTotalSubs(totalSubs);
      },
      (error) => console.log(error)
    );
  };

  useEffect(() => {
    fecthData();
  }, []);

  return (
    <Card className="flex flex-col border p-2">
      <CardHeader className="flex justify-center text-sm">
        <div className="flex items-center gap-2 font-medium text-xl">
          Subscriptions per category
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        {chartData.length < 1 && (
          <div className="flex flex-col items-center justify-center w-full h-full gap-5">
            <p>There's no data to show yet</p>
            <Link to="/subscriptions/new">
              <Button>Get Started</Button>
            </Link>
          </div>
        )}

        <TooltipDemo
          label="Keys"
          payload={tooTipData && tooTipData}
          className="mt-6"
        />

        {chartData.length > 0 && (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent className="" />}
              />
              <Pie
                data={chartData}
                dataKey="count"
                nameKey="category"
                innerRadius={60}
                strokeWidth={5}
                fill="#0088FE"
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {totalSubs}
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />

                {chartData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default SubscriptionsPerCategoryChart;
