import { useEffect, useState } from "react";
import { getOrders } from "./api";
import type { Order } from "./type";

interface UseOrdersProps {
  userId: string | undefined;
}

export function useOrders({ userId }: UseOrdersProps) {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!userId) {
      return;
    }

    const validUserId = userId;

    async function fetchOrders() {
      const data = await getOrders(validUserId);
      setOrders(data);
    }

    fetchOrders();
  }, [userId]);

  return { orders, setOrders };
}