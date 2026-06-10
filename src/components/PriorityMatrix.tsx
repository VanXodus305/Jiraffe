"use client";

import {
  DashboardMatrix,
  DashboardIncidents,
  Incident,
  PriorityKey,
} from "@/types/dashboard";

import {
  Card,
  CardBody,
  Chip,
} from "@heroui/react";

interface Props {
  matrix: DashboardMatrix;
  incidents: DashboardIncidents;
}

const PRIORITIES: (
  | PriorityKey
  | "Total"
)[] = [
    "P1",
    "P2",
    "P3",
    "P4",
    "P5",
    "Total",
  ];

const priorityConfig = {
  P1: {
    color: "danger" as const,
    bg: "bg-red-50",
    border: "border-red-200",
  },
  P2: {
    color: "warning" as const,
    bg: "bg-orange-50",
    border: "border-orange-200",
  },
  P3: {
    color: "primary" as const,
    bg: "bg-blue-50",
    border: "border-blue-200",
  },
  P4: {
    color: "success" as const,
    bg: "bg-green-50",
    border: "border-green-200",
  },
  P5: {
    color: "default" as const,
    bg: "bg-slate-50",
    border: "border-slate-200",
  },
};

export default function PriorityMatrix({
  matrix,
  incidents,
}: Props) {
  const towers = Object.keys(matrix);

  return (
    <Card className="bg-white shadow-xl border-none">
      <CardBody className="p-0">
        <div
          className="
          px-5
          py-4
          bg-gradient-to-r
          from-blue-600
          via-indigo-600
          to-violet-600
          text-white
        "
        >
          <h2 className="text-2xl font-bold">
            Incident Matrix
          </h2>

          <p className="text-white/80 text-sm">
            Open & Unassigned Tickets
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1200px]">
            <thead>
              <tr className="bg-slate-100">
                <th
                  className="
                  sticky
                  left-0
                  z-20
                  bg-slate-100
                  p-3
                  text-left
                  border-b
                "
                >
                  Priority
                </th>

                {towers.map((tower) => (
                  <th
                    key={tower}
                    className="
                    p-3
                    text-center
                    text-sm
                    font-bold
                    border-b
                    min-w-[150px]
                  "
                  >
                    {tower}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {PRIORITIES.map((priority) => (
                <tr key={priority}>
                  <td
                    className="
                    sticky
                    left-0
                    z-10
                    bg-white
                    p-3
                    font-semibold
                    border-r
                    border-b
                  "
                  >
                    {priority}
                  </td>

                  {towers.map((tower) => {
                    if (priority === "Total") {
                      return (
                        <td
                          key={tower}
                          className="p-2 border-b"
                        >
                          <Card
                            className="
                            bg-gradient-to-br
                            from-indigo-500
                            to-violet-600
                            text-white
                          "
                          >
                            <CardBody className="py-4">
                              <div className="text-center">
                                <div className="text-xs opacity-80">
                                  Total
                                </div>

                                <div className="text-3xl font-black">
                                  {matrix[tower]
                                    ?.Total || 0}
                                </div>
                              </div>
                            </CardBody>
                          </Card>
                        </td>
                      );
                    }

                    const count =
                      matrix[tower][priority];

                    const towerIncidents =
                      incidents[tower][priority];

                    const config =
                      priorityConfig[
                      priority as keyof typeof priorityConfig
                      ];

                    return (
                      <td
                        key={tower}
                        className="p-2 align-top border-b"
                      >
                        <Card
                          className={`
                          ${config.bg}
                          ${config.border}
                          border
                          h-[180px]
                        `}
                        >
                          <CardBody className="p-2">
                            <div className="mb-2">
                              <Chip
                                size="sm"
                                color={config.color}
                                variant="flat"
                              >
                                {count}
                              </Chip>
                            </div>

                            <div
                              className="
                              space-y-1
                              overflow-y-auto
                              h-[120px]
                            "
                            >
                              {towerIncidents.length >
                                0 ? (
                                towerIncidents.map(
                                  (
                                    incident: Incident
                                  ) => (
                                    <Card
                                      key={
                                        incident.key
                                      }
                                      className="
                                      bg-white
                                      border
                                      border-slate-200
                                      shadow-none
                                    "
                                    >
                                      <CardBody className="p-2">
                                        <div className="text-[10px] font-bold text-blue-600">
                                          {
                                            incident.key
                                          }
                                        </div>

                                        <div className="text-[11px] line-clamp-2">
                                          {
                                            incident.summary
                                          }
                                        </div>
                                      </CardBody>
                                    </Card>
                                  )
                                )
                              ) : (
                                <div
                                  className="
                                  flex
                                  items-center
                                  justify-center
                                  h-full
                                  text-[11px]
                                  text-slate-400
                                "
                                >
                                  No incidents
                                </div>
                              )}
                            </div>
                          </CardBody>
                        </Card>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>
  );
}