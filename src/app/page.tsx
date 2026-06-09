"use client";

import { useEffect, useState } from "react";

import DashboardHeader from "@/components/DashboardHeader";
import KPICards from "@/components/KPICards";
import PriorityMatrix from "@/components/PriorityMatrix";
import DashboardCharts from "@/components/DashboardCharts";

export default function Home() {
  const [dashboard, setDashboard] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  async function loadData() {
    try {
      const response = await fetch(
        "/api/dashboard"
      );

      const result = await response.json();

      setDashboard(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();

    const interval = setInterval(() => {
      loadData();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (loading || !dashboard) {
    return (
      <div
        className="
          min-h-screen
          flex
          items-center
          justify-center
          text-white
          text-xl
        "
      >
        Loading Dashboard...
      </div>
    );
  }

  return (
    <main
      className="
    max-w-[1500px]
    mx-auto
    px-4
    py-6
  "

    >
      <DashboardHeader />

      <KPICards
        data={dashboard.matrix}
      />

      <PriorityMatrix
        matrix={dashboard.matrix}
        incidents={dashboard.incidents}
      />

      <DashboardCharts
        data={dashboard.matrix}
      />
    </main>
  );
}