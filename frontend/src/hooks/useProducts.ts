import { useState, useEffect, useCallback } from "react";
import { productsApi } from "../api/client";
import type { Product, CreateProductInput } from "../types/Product";

type State = {
  products: Product[];
  loading: boolean;
  error: string | null;
};

export function useProducts() {
  const [state, setState] = useState<State>({ products: [], loading: true, error: null });

  const fetchProducts = useCallback(async () => {
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const data = await productsApi.getAll();
      setState({ products: data, loading: false, error: null });
    } catch (err) {
      setState({ products: [], loading: false, error: (err as Error).message });
    }
  }, []);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const deleteProduct = useCallback(async (id: number) => {
    await productsApi.remove(id);
    setState((s) => ({ ...s, products: s.products.filter((p) => p.id !== id) }));
  }, []);

  const createProduct = useCallback(async (data: CreateProductInput) => {
    const created = await productsApi.create(data);
    setState((s) => ({ ...s, products: [...s.products, created] }));
    return created;
  }, []);

  return { ...state, refetch: fetchProducts, deleteProduct, createProduct };
}
