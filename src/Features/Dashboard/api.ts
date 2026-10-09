import type { DashboardState } from "./types";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

type AccountStatusResponse = Omit<DashboardState, "category" | "recentOrders">;

interface CategorySalesResponse {
  id: string;
  userId: string;
  category: string;
  percentage: number;
}

interface RecentOrdersResponse {
  id: string;
  userId: string;
  customer: string;
  type: string;
  date: string;
  amount: number;
  status: string;
}

async function getCollection<T>(collection: string): Promise<T[]> {
  const response = await fetch(`${API_BASE_URL}/${collection}`);

  if (!response.ok) {
    throw new Error(`Không thể tải dữ liệu ${collection} (${response.status})`);
  }

  return response.json() as Promise<T[]>;
}

export async function getDashboardData(
  userId: string,
): Promise<DashboardState | null> {
  try {
    const [accountStatuses, categorySales, recentOrders] = await Promise.all([
      getCollection<AccountStatusResponse>("accountStatus"),
      getCollection<CategorySalesResponse>("categorySales"),
      getCollection<RecentOrdersResponse>("orders")
    ]);

    const accountStatus = accountStatuses.find((item) => item.userId === userId);
    const categorySale = categorySales.filter((item) => item.userId === userId);
    const recentOrder = recentOrders.filter((item) => item.userId === userId);
    if (!accountStatus || !categorySale || !recentOrder) return null;

    return {
      ...accountStatus,
      categories: categorySales,
      recentOrders: recentOrders
    };

  } catch (error) {
    console.error("Lỗi khi tải dữ liệu dashboard:", error);
    return null;
  }
}
