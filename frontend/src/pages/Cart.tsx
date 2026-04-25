import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart, clearCart, total } = useCart();

  if (cart.length === 0) {
    return (
      <main className="max-w-2xl mx-auto px-6 py-16 text-center">
        <p className="text-gray-500 text-lg mb-4">Tu carrito está vacío.</p>
        <Link to="/products" className="text-indigo-600 hover:underline text-sm">
          Ver productos
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-2xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Carrito</h1>
      <ul className="flex flex-col gap-3 mb-6">
        {cart.map((p) => (
          <li
            key={p.id}
            className="flex justify-between items-center border border-gray-200 rounded-xl px-4 py-3 bg-white"
          >
            <div>
              <p className="font-medium text-gray-800">{p.name}</p>
              <p className="text-sm text-indigo-600">{p.price} €</p>
            </div>
            <button
              onClick={() => removeFromCart(p.id)}
              className="text-sm text-red-500 hover:text-red-700"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
      <div className="flex justify-between items-center border-t pt-4">
        <p className="text-lg font-bold text-gray-900">Total: {total} €</p>
        <button
          onClick={clearCart}
          className="text-sm bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Vaciar carrito
        </button>
      </div>
    </main>
  );
}
