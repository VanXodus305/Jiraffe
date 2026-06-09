import { jira } from "@/lib/jira";
import { NextResponse } from "next/server";

const priorityMap: Record<string, string> = {
  Highest: "P1",
  High: "P2",
  Medium: "P3",
  Low: "P4",
  Lowest: "P5",
};

export async function GET() {
  try {
    const response = await jira.post("/rest/api/3/search/jql", {
      jql: `
        assignee IS EMPTY
        AND statusCategory != Done
      `,
      fields: ["summary", "priority", "assignee", process.env.JIRA_TOWER_FIELD],
      maxResults: 1000,
    });

    const issues = response.data.issues;
    const towerField = process.env.JIRA_TOWER_FIELD!;

    const matrix: Record<
      string,
      {
        P1: number;
        P2: number;
        P3: number;
        P4: number;
        P5: number;
        Total: number;
      }
    > = {};

    issues.forEach((issue: any) => {
      const tower = issue.fields?.[towerField]?.value || "Unknown";

      const jiraPriority = issue.fields?.priority?.name || "Medium";

      const priority = priorityMap[jiraPriority] || "P3";

      if (!matrix[tower]) {
        matrix[tower] = {
          P1: 0,
          P2: 0,
          P3: 0,
          P4: 0,
          P5: 0,
          Total: 0,
        };
      }

      matrix[tower][priority as keyof (typeof matrix)[string]]++;

      matrix[tower].Total++;
    });

    return NextResponse.json(matrix);
  } catch (error: any) {
    console.error(error.response?.data || error);

    return NextResponse.json(
      {
        error: "Failed to fetch Jira issues",
        details: error.response?.data,
      },
      {
        status: 500,
      },
    );
  }
}
