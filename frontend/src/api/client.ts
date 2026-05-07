import type { Product, CreateProductInput } from "../types/Product";

const BASE_URL = import.meta.env.VITE_API_URL ?? "https://minimarket-three.vercel.app";


async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error((body as { error?: string }).error ?? `HTTP ${res.status}`);
  }

  // el delete devuelve 204 sin cuerpo, si intento hacer .json() peta
  if (res.status === 204) return undefined as T;

  return res.json() as Promise<T>;
}

// junto todas las llamadas a la API en un objeto para tenerlas organizadas
export const productsApi = {
  getAll: () => request<Product[]>("/products"),
  getOne: (id: number) => request<Product>(`/products/${id}`),
  create: (data: CreateProductInput) =>
    request<Product>("/products", { method: "POST", body: JSON.stringify(data) }),
  update: (id: number, data: Partial<CreateProductInput>) =>
    request<Product>(`/products/${id}`, { method: "PATCH", body: JSON.stringify(data) }),
  remove: (id: number) => request<void>(`/products/${id}`, { method: "DELETE" }),
};
