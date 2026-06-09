"use client";

import {
  Card,
  CardBody,
  Chip,
} from "@heroui/react";

interface Props {
  incident: {
    key: string;
    summary: string;
    status: string;
  };
}

export default function IncidentCard({
  incident,
}: Props) {
  return (
    <Card
      shadow="sm"
      className="
      min-w-[180px]
      bg-white/10
      backdrop-blur-md
      border
      border-white/10
    "
    >
      <CardBody className="p-2">
        <div className="font-semibold text-xs">
          {incident.key}
        </div>

        <div className="text-xs mt-1 line-clamp-2">
          {incident.summary}
        </div>

        <Chip
          size="sm"
          color="primary"
          className="mt-2"
        >
          {incident.status}
        </Chip>
      </CardBody>
    </Card>
  );
}