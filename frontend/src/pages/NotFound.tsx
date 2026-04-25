import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-6">
      <h1 className="text-6xl font-bold text-indigo-600">404</h1>
      <p className="text-gray-600 text-lg">Página no encontrada</p>
      <Link to="/" className="text-indigo-600 hover:underline text-sm">
        Volver al inicio
      </Link>
    </main>
  );
}
