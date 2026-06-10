"use client";

import {
  Card,
  CardBody,
} from "@heroui/react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import {
  DashboardMatrix,
  TowerMatrix,
} from "@/types/dashboard";

interface Props {
  data: DashboardMatrix;
}

export default function DashboardCharts({
  data,
}: Props) {
  const chartData =
    Object.entries(data).map(
      ([tower, values]: [
        string,
        TowerMatrix,
      ]) => ({
        tower,
        total: values.Total,
      })
    );

  return (
    <Card className="mt-6 border-none shadow-xl">
      <CardBody>
        <div className="mb-6">
          <h2 className="text-2xl font-bold">
            Incident Distribution
          </h2>

          <p className="text-slate-500">
            Open incidents by tower
          </p>
        </div>

        <div className="h-[280px]">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="tower" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="total"
                radius={[10, 10, 0, 0]}
                fill="#4f46e5"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardBody>
    </Card>
  );
}