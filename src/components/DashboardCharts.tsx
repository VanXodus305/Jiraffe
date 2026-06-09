"use client";

import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { Card, CardBody } from "@heroui/react";
import { DashboardData } from "@/types/dashboard";

interface Props {
  data: DashboardData;
}

export default function DashboardCharts({
  data,
}: Props) {
  const chartData = Object.entries(data).map(
    ([tower, values]) => ({
      tower,
      total: values.Total,
    })
  );

  return (
    <Card className="border border-zinc-800 mt-8">
      <CardBody>
        <h2 className="text-xl font-semibold mb-4">
          Tower Distribution
        </h2>

        <div className="h-[350px]">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <BarChart data={chartData}>
              <XAxis dataKey="tower" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardBody>
    </Card>
  );
}