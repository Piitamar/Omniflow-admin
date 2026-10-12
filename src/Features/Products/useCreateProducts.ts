import { useState } from "react";
import type { Product } from "./types";

interface UseCreateProductResult {
  createProduct: (product: Product) => Promise<Product>;
  loading: boolean;
  error: string | null;
}

export function useCreateProduct(): UseCreateProductResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createProduct = async (product: Product): Promise<Product> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        throw new Error(`Failed to create product (${response.status})`);
      }

      const createdProduct: Product = await response.json();
      return createdProduct;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";

      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createProduct, loading, error };
}
