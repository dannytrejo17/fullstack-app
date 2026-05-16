"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[40vh] flex items-center justify-center px-6 py-16">
      <div className="max-w-md text-center space-y-4 text-white">
        <h1 className="text-2xl font-bold">Algo salió mal</h1>
        <p className="text-white/70 text-sm">
          Ha ocurrido un error inesperado. Puedes reintentar o volver al inicio.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Button
            type="button"
            onClick={() => reset()}
            className="bg-amber-400 text-zinc-900 hover:bg-amber-500"
          >
            Reintentar
          </Button>
          <Link
            href="/"
            className="inline-flex h-8 items-center justify-center rounded-lg border border-white/40 px-3 text-sm font-medium text-white hover:bg-white/10"
          >
            Inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
