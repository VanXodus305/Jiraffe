"use client";

import { Card, CardBody } from "@heroui/react";
import { DashboardData } from "@/types/dashboard";

interface Props {
  data: DashboardData;
}

export default function KPICards({ data }: Props) {
  const towers = Object.keys(data);

  const totalOpen = towers.reduce(
    (sum, tower) => sum + data[tower].Total,
    0
  );

  const totalP1 = towers.reduce(
    (sum, tower) => sum + data[tower].P1,
    0
  );

  const activeTowers = towers.filter(
    (tower) => data[tower].Total > 0
  ).length;

  const cards = [
    {
      title: "Open Tickets",
      value: totalOpen,
    },
    {
      title: "Critical (P1)",
      value: totalP1,
    },
    {
      title: "Active Towers",
      value: activeTowers,
    },
    {
      title: "Unassigned",
      value: totalOpen,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 mb-8">
      {cards.map((card) => (
        <Card
          key={card.title}
          className="border border-zinc-800"
        >
          <CardBody>
            <p className="text-zinc-400">
              {card.title}
            </p>

            <h2 className="text-4xl font-bold mt-2">
              {card.value}
            </h2>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}