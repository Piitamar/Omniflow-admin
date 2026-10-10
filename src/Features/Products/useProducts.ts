
import { useEffect, useState } from "react";
import type { Product } from "./types";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:3001";

interface UseProductsProps {
  userId: string | undefined;
}

export function useProducts({ userId }: UseProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!userId) {
      return;
    }

    const validUserId = userId;

    async function fetchProducts() {
      const response = await fetch(
        `${API_BASE_URL}/products?userId=${encodeURIComponent(validUserId)}`
      );
      const data: Product[] = await response.json();
      setProducts(data);
    }

    fetchProducts();
  }, [userId]);

  return { products, setProducts };
}