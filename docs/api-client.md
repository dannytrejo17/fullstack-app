# Capa de red en el frontend

## Cliente tipado: `src/api/client.ts`

Centraliza todas las llamadas HTTP. Usa `fetch` nativo con una función genérica `request<T>` que:
- Añade el header `Content-Type: application/json`
- Lanza un `Error` con el mensaje del servidor si la respuesta no es `ok`
- Maneja el caso 204 (sin cuerpo) devolviendo `undefined`

```ts
export const productsApi = {
  getAll: () => request<Product[]>("/products"),
  getOne: (id: number) => request<Product>(`/products/${id}`),
  create: (data: CreateProductInput) => request<Product>("/products", { method: "POST", body: JSON.stringify(data) }),
  update: (id: number, data: Partial<CreateProductInput>) => request<Product>(`/products/${id}`, { method: "PATCH", body: JSON.stringify(data) }),
  remove: (id: number) => request<void>(`/products/${id}`, { method: "DELETE" }),
};
```

## Tipos alineados con el backend

```ts
type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

type CreateProductInput = Omit<Product, "id">;
```

## Gestión de los tres estados de red

En `useProducts` (hook) y `ProductDetail` (efecto local):

| Estado   | Qué se muestra              |
|----------|-----------------------------|
| loading  | Componente `<Spinner />`    |
| error    | Componente `<ErrorMessage>` con botón de reintento |
| success  | Datos renderizados          |

## URL base

En desarrollo, Vite proxea `/api` a `http://localhost:3001`, por lo que el cliente usa `/api/v1` como base relativa.
En producción se configura con la variable de entorno `VITE_API_URL`.
