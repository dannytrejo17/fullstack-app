# Context y estado global

## CartContext

Ubicación: `src/context/CartContext.tsx`

Gestiona el carrito de compra de forma global. Se creó con `createContext` y se expone a través de un `CartProvider` que envuelve toda la app en `App.tsx`.

### Qué expone

```ts
type CartContextType = {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  total: number; // suma de precios
};
```

### Cómo se consume

```tsx
import { useCart } from "../context/CartContext";

const { cart, addToCart } = useCart();
```

### Cuándo usar Context API

Context es útil cuando varios componentes en distintos niveles del árbol necesitan el mismo estado y pasar props se vuelve tedioso (prop drilling). En este caso, el carrito se usa en `Navbar` (contador), `ProductDetail` (botón añadir) y `Cart` (listado), por eso tiene sentido centralizarlo.

No es necesario para estado local de un solo componente (formularios, búsqueda), donde `useState` es suficiente.
