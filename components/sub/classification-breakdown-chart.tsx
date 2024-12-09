"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

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

const chartConfig = {
  patients: {
    label: "Patients",
  },
  nonDemented: {
    label: "Non-Demented",
    color: "chart-1",
  },
  moderateDemented: {
    label: "Moderately Demented",
    color: "hsl(var(--chart-2))",
  },
  veryMildDemented: {
    label: "Very Mildly Demented",
    color: "hsl(var(--chart-3))",
  },
  mildDemented: {
    label: "Mildly Demented",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

export function ClassBreakdownChart() {
  const [totalPatients, setTotalPatients] = React.useState(0);
  const [classBreakdown, setClassBreakdown] = React.useState();

  React.useEffect(() => {
    fetch("/api/stats/patientCount")
      .then((res) => res.json())
      .then((data) => {
        setTotalPatients(data.patientCount);
      });

    fetch("/api/stats/classbreakdown")
      .then((res) => res.json())
      .then((data) => {
        setClassBreakdown(data.classBreakdown);
      });
  }, []);

  return (
    <Card className="">
      <CardHeader className="items-center pb-0">
        <CardTitle>Classification Breakdown</CardTitle>
        <CardDescription>January - December 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0 mt-2">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={classBreakdown}
              dataKey="count"
              nameKey="class"
              innerRadius={60}
              strokeWidth={5}
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
                          {totalPatients.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Patients
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
