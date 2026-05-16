import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre MiniMarket",
  description:
    "Historia y valores de MiniMarket, marketplace de segunda mano.",
};

export default function SobrePage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12 w-full">
      <article className="bg-white/95 backdrop-blur rounded-2xl shadow-xl p-8 sm:p-10 space-y-6 text-gray-800 leading-relaxed">
        <h1 className="text-3xl font-bold text-gray-900">Sobre MiniMarket</h1>
        <p>
          MiniMarket nació como un marketplace sencillo para comprar y vender
          artículos de segunda mano sin fricción. Creemos que dar una segunda vida
          a los productos es bueno para el bolsillo y para el planeta.
        </p>
        <h2 className="text-xl font-semibold text-gray-900 pt-2">
          Cómo funciona
        </h2>
        <p>
          Publica con un formulario claro, navega por categorías y usa el carrito
          para organizar tus posibles compras. El catálogo vive en una API REST
          Node/Express, pensada para escalar o conectar con otros clientes.
        </p>
        <h2 className="text-xl font-semibold text-gray-900 pt-2">
          Esta versión Next.js
        </h2>
        <p>
          Esta parte del repositorio demuestra el mismo producto y marca que la
          app Vite, pero con App Router, componentes de servidor para datos vía
          API, ISR en el listado y Server Actions solo donde aporta (por ejemplo,
          el formulario de contacto).
        </p>
        <p className="text-sm text-gray-500">
          Contenido estático renderizado en servidor — ideal para SEO de páginas
          institucionales.
        </p>
      </article>
    </main>
  );
}
