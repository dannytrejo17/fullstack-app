# Rutas y navegación

Configurado con React Router v7 en `App.tsx`.

| Ruta              | Componente      | Descripción                        |
|-------------------|-----------------|------------------------------------|
| `/`               | Home            | Página de inicio con CTA           |
| `/products`       | Products        | Lista de productos con búsqueda    |
| `/products/:id`   | ProductDetail   | Detalle de un producto             |
| `/create`         | CreateProduct   | Formulario para publicar producto  |
| `/cart`           | Cart            | Carrito de compra                  |
| `*`               | NotFound        | Página 404                         |

## Navegación programática

En `ProductDetail` se usa `useNavigate()` para el botón "Volver":

```ts
const navigate = useNavigate();
navigate(-1); // vuelve a la página anterior
```

## Parámetros de ruta

En `ProductDetail` se extrae el `id` con `useParams`:

```ts
const { id } = useParams<{ id: string }>();
```
