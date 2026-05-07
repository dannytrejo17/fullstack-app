# Hooks de React

## useProducts (custom hook)

Ubicación: `src/hooks/useProducts.ts`

Gestiona el ciclo de vida completo de la lista de productos: carga, error, y mutaciones.

```ts
const { products, loading, error, refetch, deleteProduct, createProduct } = useProducts();
```

Internamente usa:
- `useState` para el estado `{ products, loading, error }`
- `useEffect` para lanzar la carga inicial al montar
- `useCallback` en `fetchProducts`, `deleteProduct` y `createProduct` para evitar recrear funciones en cada render

## useCart (hook de contexto)

Ubicación: `src/context/CartContext.tsx`

Accede al contexto del carrito. Lanza error si se usa fuera del `CartProvider`.

```ts
const { cart, addToCart, removeFromCart, clearCart, total } = useCart();
```

## useMemo en Products.tsx

La lista filtrada se calcula con `useMemo` para evitar recalcular en cada render cuando el estado no relacionado cambia:

```ts
const filtered = useMemo(
  () => products.filter(p => p.name.includes(search) || p.category.includes(search)),
  [products, search]
);
```
