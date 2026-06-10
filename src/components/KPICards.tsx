"use client";

import {
  Card,
  CardBody,
} from "@heroui/react";

import {
  AlertTriangle,
  Activity,
  Building2,
  Ticket,
} from "lucide-react";

import { DashboardMatrix } from "@/types/dashboard";

interface Props {
  data: DashboardMatrix;
}

export default function KPICards({
  data,
}: Props) {
  const towers = Object.keys(data);

  const totalOpen = towers.reduce(
    (sum, tower) =>
      sum + data[tower].Total,
    0
  );

  const totalP1 = towers.reduce(
    (sum, tower) =>
      sum + data[tower].P1,
    0
  );

  const activeTowers =
    towers.filter(
      (tower) =>
        data[tower].Total > 0
    ).length;

  const cards = [
    {
      title: "Open Tickets",
      value: totalOpen,
      icon: Ticket,
      bg: "from-blue-500 to-cyan-500",
    },
    {
      title: "Critical",
      value: totalP1,
      icon: AlertTriangle,
      bg: "from-red-500 to-pink-500",
    },
    {
      title: "Active Towers",
      value: activeTowers,
      icon: Building2,
      bg: "from-violet-500 to-purple-500",
    },
    {
      title: "Live Monitoring",
      value: totalOpen,
      icon: Activity,
      bg: "from-emerald-500 to-green-500",
    },
  ];

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <Card
            key={card.title}
            className="overflow-hidden border-none shadow-xl"
          >
            <CardBody
              className={`
                bg-gradient-to-br
                ${card.bg}
                text-white
                p-6
              `}
            >
              <div className="flex justify-between">
                <div>
                  <p className="text-white/80">
                    {card.title}
                  </p>

                  <h2 className="text-5xl font-black mt-3">
                    {card.value}
                  </h2>
                </div>

                <Icon size={40} />
              </div>
            </CardBody>
          </Card>
        );
      })}
    </div>
  );
}