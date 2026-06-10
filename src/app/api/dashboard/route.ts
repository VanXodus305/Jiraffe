import { jira } from "@/lib/jira";
import { NextResponse } from "next/server";

import {
  DashboardMatrix,
  DashboardIncidents,
  TowerMatrix,
} from "@/types/dashboard";

const ALL_TOWERS = [
  "Finance",
  "Marketing",
  "HR",
  "Sales",
  "Infrastructure",
  "Security",
  "Network",
  "Application",
];

const priorityMap: Record<string, string> = {
  Highest: "P1",
  High: "P2",
  Medium: "P3",
  Low: "P4",
  Lowest: "P5",
};

interface JiraIssue {
  key: string;

  fields: {
    summary: string;

    status?: {
      name: string;
    };

    priority?: {
      name: string;
    };

    [key: string]: unknown;
  };
}

export async function GET() {
  const response = await jira.post("/rest/api/3/search/jql", {
    jql: `
      assignee IS EMPTY
      AND statusCategory != Done
    `,
    fields: ["summary", "priority", "status", process.env.JIRA_TOWER_FIELD],
    maxResults: 1000,
  });

  const issues = response.data.issues;
  const towerField = process.env.JIRA_TOWER_FIELD!;

  const matrix: DashboardMatrix = {};
  const incidents: DashboardIncidents = {};
  ALL_TOWERS.forEach((tower) => {
    matrix[tower] = {
      P1: 0,
      P2: 0,
      P3: 0,
      P4: 0,
      P5: 0,
      Total: 0,
    };

    incidents[tower] = {
      P1: [],
      P2: [],
      P3: [],
      P4: [],
      P5: [],
    };
  });

  issues.forEach((issue: JiraIssue) => {
    const towerValue = issue.fields[towerField] as { value?: string };

    const tower = towerValue?.value || "Unknown";

    if (!(tower in matrix)) {
      return;
    }
    const priority = (priorityMap[issue.fields.priority?.name ?? ""] ??
      "P3") as "P1" | "P2" | "P3" | "P4" | "P5";
    matrix[tower][priority]++;
    matrix[tower].Total++;

    incidents[tower][priority].push({
      key: issue.key,
      summary: issue.fields.summary,
      status: issue.fields.status?.name,
    });
  });

  return NextResponse.json({
    matrix,
    incidents,
    kpis: {
      totalTickets: issues.length,
      criticalTickets: Object.values(matrix).reduce(
        (sum: number, tower: TowerMatrix) => sum + tower.P1,
        0,
      ),
    },
  });
}
