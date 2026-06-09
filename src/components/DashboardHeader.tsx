import { Chip } from "@heroui/react";

export default function DashboardHeader() {
  return (
    <div className="mb-10">
      <Chip
        color="primary"
        variant="flat"
        className="mb-4"
      >
        LIVE MONITORING
      </Chip>

      <h1
        className="
          text-6xl
          font-black
          tracking-tight
          bg-gradient-to-r
          from-blue-600
          via-indigo-600
          to-violet-600
          bg-clip-text
          text-transparent
        "
      >
        Jiraffe Command Center
      </h1>

      <p className="text-slate-600 mt-4 text-lg">
        Real-time Jira Incident Operations Dashboard
      </p>
    </div>
  );
}