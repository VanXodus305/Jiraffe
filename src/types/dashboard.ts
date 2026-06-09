export type TowerData = {
  P1: number;
  P2: number;
  P3: number;
  P4: number;
  P5: number;
  Total: number;
};

export type DashboardData = {
  [tower: string]: TowerData;
};
