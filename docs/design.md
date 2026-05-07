# Arquitectura de la aplicación

## Estructura de componentes

```
App
├── CartProvider (context global)
├── Navbar
└── Routes
    ├── Home
    ├── Products → ProductCard, Spinner, ErrorMessage
    ├── ProductDetail → Badge, Spinner, ErrorMessage
    ├── CreateProduct
    ├── Cart
    └── NotFound
```

## Componentes reutilizables

- `ProductCard`: muestra un producto con acciones (ver detalle, eliminar)
- `Badge`: etiqueta de categoría
- `Spinner`: indicador de carga
- `ErrorMessage`: mensaje de error con botón de reintento

## Gestión de estado

- Estado local (`useState`) para formularios y búsqueda
- Custom hook `useProducts` para el estado de la lista de productos
- Context API (`CartContext`) para el carrito compartido entre páginas

## Backend / API REST

Base URL: `/api/v1`

| Método | Endpoint           | Descripción              | Códigos HTTP     |
|--------|--------------------|--------------------------|------------------|
| GET    | /products          | Lista todos los productos | 200             |
| GET    | /products/:id      | Obtiene un producto       | 200, 404        |
| POST   | /products          | Crea un producto          | 201, 400        |
| PATCH  | /products/:id      | Actualiza un producto     | 200, 404        |
| DELETE | /products/:id      | Elimina un producto       | 204, 404        |

## Contrato de datos

```ts
type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
};
```

## Persistencia

- Los productos viven en el servidor (in-memory en dev, reemplazable por DB)
- El carrito vive solo en el cliente (Context, no persiste entre recargas)

## Flujo de datos

```
Usuario → React UI → productsApi (client.ts) → fetch → Express API
                                                          ↓
                                                   productService
                                                   (in-memory store)
```

## Arquitectura por capas del backend

```
server/src/
├── config/       → variables de entorno y configuración
├── routes/       → definición de endpoints (Express Router)
├── controllers/  → lógica HTTP (req/res, validación de entrada)
└── services/     → lógica de negocio y acceso a datos
```
