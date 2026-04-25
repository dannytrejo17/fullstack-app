import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { productsApi } from "../api/client";
import type { Product } from "../types/Product";
import { useCart } from "../context/CartContext";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import Badge from "../components/Badge";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, cart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    productsApi
      .getOne(Number(id))
      .then(setProduct)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Spinner />;
  if (error || !product) return <ErrorMessage message={error ?? "Producto no encontrado"} />;

  const inCart = cart.some((p) => p.id === product.id);

  return (
    <main className="max-w-2xl mx-auto px-6 py-10">
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-indigo-600 hover:underline mb-6 block"
      >
        ← Volver
      </button>
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
          <Badge label={product.category} />
        </div>
        <p className="text-gray-600">{product.description}</p>
        <p className="text-3xl font-bold text-indigo-600">{product.price} €</p>
        <button
          onClick={() => addToCart(product)}
          disabled={inCart}
          className="bg-indigo-600 text-white py-2 rounded-xl font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {inCart ? "Ya en el carrito" : "Añadir al carrito"}
        </button>
      </div>
    </main>
  );
}
