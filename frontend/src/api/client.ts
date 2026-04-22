import type { Product, CreateProductInput } from "../types/Product";

// si hay una variable de entorno la uso, si no apunto a la ruta relativa (el proxy de vite lo redirige al backend)
const BASE_URL = import.meta.env.VITE_API_URL ?? "/api/v1";

// función genérica para no repetir el mismo fetch en cada llamada
// el <T> es para decirle a TypeScript qué tipo de dato espero que devuelva
async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  // si la respuesta no es ok lanzo un error con el mensaje que devuelve el servidor
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
