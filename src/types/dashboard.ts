export interface Incident {
  key: string;
  summary: string;
  status?: string;
}

export interface PriorityIncidents {
  P1: Incident[];
  P2: Incident[];
  P3: Incident[];
  P4: Incident[];
  P5: Incident[];
}

export type PriorityKey = "P1" | "P2" | "P3" | "P4" | "P5";

export interface TowerMatrix {
  P1: number;
  P2: number;
  P3: number;
  P4: number;
  P5: number;
  Total: number;
}

export type DashboardMatrix = Record<string, TowerMatrix>;

export type DashboardIncidents = Record<string, PriorityIncidents>;

export interface DashboardResponse {
  matrix: DashboardMatrix;
  incidents: DashboardIncidents;
  kpis: {
    totalTickets: number;
    criticalTickets: number;
  };
}
