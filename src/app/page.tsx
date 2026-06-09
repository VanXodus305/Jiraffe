"use client";

import { useEffect, useState } from "react";

import DashboardHeader from "@/components/DashboardHeader";
import KPICards from "@/components/KPICards";
import PriorityMatrix from "@/components/PriorityMatrix";
import DashboardCharts from "@/components/DashboardCharts";

import { DashboardData } from "@/types/dashboard";

export default function Home() {
  const [data, setData] =
    useState<DashboardData>({});

  const [loading, setLoading] =
    useState(true);

  async function loadData() {
    try {
      const response = await fetch(
        "/api/dashboard"
      );

      const result = await response.json();
      console.log(data);
      setData(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();

    const interval = setInterval(
      loadData,
      30000
    );

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <main className="min-h-screen p-4 md:p-8">
      <DashboardHeader />

      <KPICards data={data} />

      <PriorityMatrix data={data} />

      <DashboardCharts data={data} />
    </main>
  );
}