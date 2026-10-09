import { useEffect, useState } from "react";
import { getDashboardData } from "./api";
import type { DashboardState } from "./types";

export function useDashboard(userId?: string) {
  const [dashboard, setDashboard] = useState<DashboardState | null>(null);
  const [isLoading, setIsLoading] = useState(!!userId);

  useEffect(() => {
    if (!userId) return;

    getDashboardData(userId)
      .then((data) => {
        setDashboard(data);
        setIsLoading(false);
      });
  }, [userId]);

  return { dashboard, isLoading };
}