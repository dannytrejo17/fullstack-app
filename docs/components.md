# Documentación de componentes

## Navbar
Barra de navegación fija. Muestra el logo y los enlaces principales. Consume `CartContext` para mostrar el contador del carrito.

Props: ninguna

## ProductCard
Tarjeta de producto reutilizable.

```ts
type Props = {
  product: Product;
  onDelete?: (id: number) => void; // opcional, muestra botón eliminar si se pasa
};
```

## Badge
Etiqueta de categoría pequeña.

```ts
type Props = { label: string };
```

## Spinner
Indicador de carga centrado. Sin props.

## ErrorMessage
Mensaje de error con reintento opcional.

```ts
type Props = {
  message: string;
  onRetry?: () => void;
};
```
