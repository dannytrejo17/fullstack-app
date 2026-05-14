import type { CreateProductInput, Product } from "@/types/product";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ??
  "http://localhost:3001/api/v1";

/** En local siempre datos frescos; en producción ISR (60 s) con tag "products". */
function productListFetchInit(): RequestInit {
  if (process.env.NODE_ENV === "development") {
    return { cache: "no-store" };
  }
  return { next: { revalidate: 60, tags: ["products"] } };
}

async function parseJson<T>(res: Response): Promise<T> {
  if (res.status === 204) return undefined as T;
  const data = (await res.json()) as T | { error?: string };
  if (!res.ok) {
    const err = (data as { error?: string }).error ?? `HTTP ${res.status}`;
    throw new Error(err);
  }
  return data as T;
}

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`${API_BASE}/products`, productListFetchInit());
  return parseJson<Product[]>(res);
}

export async function fetchProduct(id: number): Promise<Product | null> {
  const res = await fetch(`${API_BASE}/products/${id}`, productListFetchInit());
  if (res.status === 404) return null;
  return parseJson<Product>(res);
}

export async function createProduct(
  data: CreateProductInput
): Promise<Product> {
  const res = await fetch(`${API_BASE}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return parseJson<Product>(res);
}
