import type { Order } from "./type";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:3001";

export async function getOrders(
  userId: string
): Promise<Order[]> {
  const response = await fetch(
    `${API_BASE_URL}/orders?userId=${encodeURIComponent(userId)}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch orders");
  }

  const data: Order[] = await response.json();

  return data;
}