import Link from "next/link";

export default function ProductoNotFound() {
  return (
    <main className="max-w-lg mx-auto px-6 py-20 text-center text-white">
      <h1 className="text-2xl font-bold mb-2">Producto no encontrado</h1>
      <p className="text-white/70 text-sm mb-6">
        Es posible que se haya vendido o eliminado.
      </p>
      <Link
        href="/productos"
        className="inline-block bg-amber-400 hover:bg-amber-500 text-zinc-900 font-semibold px-5 py-2 rounded-xl text-sm"
      >
        Ver catálogo
      </Link>
    </main>
  );
}
