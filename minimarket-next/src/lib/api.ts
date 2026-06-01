import type { CreateProductInput, Product } from "@/types/product";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ||
  "http://localhost:3001/api/v1";

const FETCH_TIMEOUT_MS = 8_000;

/** En local siempre datos frescos; en producción ISR (60 s) con tag "products". */
function productListFetchInit(): RequestInit {
  if (process.env.NODE_ENV === "development") {
    return { cache: "no-store" };
  }
  return { next: { revalidate: 60, tags: ["products"] } };
}

async function fetchApi(path: string, init?: RequestInit): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    return await fetch(`${API_BASE}${path}`, {
      ...init,
      signal: controller.signal,
    });
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error(
        "La API tardó demasiado. Comprueba que el backend Express esté corriendo (puerto 3001)."
      );
    }
    throw new Error(
      "No se pudo conectar con la API. ¿Está el backend Express en marcha en el puerto 3001?"
    );
  } finally {
    clearTimeout(timeout);
  }
}

async function parseJson<T>(res: Response): Promise<T> {
  if (res.status === 204) return undefined as T;

  const contentType = res.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    throw new Error(
      "La API no devolvió JSON. ¿Está el backend Express corriendo en el puerto 3001?"
    );
  }

  const data = (await res.json()) as T | { error?: string };
  if (!res.ok) {
    const err = (data as { error?: string }).error ?? `HTTP ${res.status}`;
    throw new Error(err);
  }
  return data as T;
}

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetchApi("/products", productListFetchInit());
  return parseJson<Product[]>(res);
}

export async function fetchProduct(id: number): Promise<Product | null> {
  const res = await fetchApi(`/products/${id}`, productListFetchInit());
  if (res.status === 404) return null;
  return parseJson<Product>(res);
}

export async function createProduct(
  data: CreateProductInput
): Promise<Product> {
  const res = await fetchApi("/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return parseJson<Product>(res);
}
