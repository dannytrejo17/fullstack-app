import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";

export default function Home() {
  const { products, loading, error, refetch, deleteProduct } = useProducts();
  const [search, setSearch] = useState("");

  const filtered = useMemo(
    () =>
      products.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.category.toLowerCase().includes(search.toLowerCase())
      ),
    [products, search]
  );

  return (
    <main className="max-w-5xl mx-auto px-6 py-10">
      {/* Hero */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          Compra y vende con facilidad
        </h1>
        <p className="text-gray-500 text-lg mb-6">
          Descubre productos de segunda mano o publica el tuyo.
        </p>
        <Link
          to="/create"
          className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-700 transition-colors"
        >
          Publicar producto
        </Link>
      </div>

      {/* Buscador */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar por nombre o categoría..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      {/* Productos */}
      {loading && <Spinner />}
      {error && <ErrorMessage message={error} onRetry={refetch} />}
      {!loading && !error && filtered.length === 0 && (
        <p className="text-gray-500 text-center py-16">No se encontraron productos.</p>
      )}
      {!loading && !error && filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} onDelete={deleteProduct} />
          ))}
        </div>
      )}
    </main>
  );
}
