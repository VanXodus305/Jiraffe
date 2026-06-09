"use client";

import { DashboardData } from "@/types/dashboard";

interface Props {
  data: DashboardData;
}

function getCellColor(value: number) {
  if (value === 0) {
    return "bg-green-500/10";
  }

  if (value <= 2) {
    return "bg-yellow-500/10";
  }

  if (value <= 5) {
    return "bg-orange-500/10";
  }

  return "bg-red-500/20";
}

export default function PriorityMatrix({
  data,
}: Props) {
  const towers = Object.keys(data);

  return (
    <div className="overflow-x-auto rounded-2xl border border-zinc-800">
      <table className="w-full min-w-[900px]">
        <thead>
          <tr className="">
            <th className="p-4 text-left">
              Priority
            </th>

            {towers.map((tower) => (
              <th
                key={tower}
                className="p-4 text-center"
              >
                {tower}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {["P1", "P2", "P3", "P4", "P5", "Total"].map(
            (priority) => (
              <tr key={priority}>
                <td className="border border-zinc-800 p-4 font-semibold">
                  {priority}
                </td>

                {towers.map((tower) => {
                  const value =
                    data[tower][
                    priority as keyof typeof data[string]
                    ];

                  return (
                    <td
                      key={tower}
                      className={`border border-zinc-800 text-center p-4 ${getCellColor(
                        Number(value)
                      )}`}
                    >
                      {value}
                    </td>
                  );
                })}
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}