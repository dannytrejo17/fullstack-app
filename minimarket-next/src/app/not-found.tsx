import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[50vh] flex flex-col items-center justify-center px-6 text-center text-white">
      <p className="text-6xl font-bold text-white/20 mb-2">404</p>
      <h1 className="text-2xl font-bold mb-2">Página no encontrada</h1>
      <p className="text-white/60 text-sm mb-8 max-w-sm">
        La ruta no existe o ha cambiado.
      </p>
      <Link
        href="/"
        className="bg-amber-400 hover:bg-amber-500 text-zinc-900 font-semibold px-6 py-3 rounded-xl text-sm transition-colors"
      >
        Volver al inicio
      </Link>
    </main>
  );
}
