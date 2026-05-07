import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center gap-4 text-center px-6 py-32">
      <h1 className="text-7xl font-bold text-white drop-shadow">404</h1>
      <p className="text-white/70 text-lg">Página no encontrada</p>
      <Link to="/" className="bg-amber-400 hover:bg-amber-500 text-zinc-900 font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors">
        Volver al inicio
      </Link>
    </main>
  );
}
