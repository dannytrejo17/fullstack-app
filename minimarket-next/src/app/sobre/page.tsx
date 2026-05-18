import type { Metadata } from "next";
import { pageMainClass, pageNarrowClass } from "@/lib/page-layout";

export const metadata: Metadata = {
  title: "Sobre MiniMarket",
  description:
    "Conoce MiniMarket: compra y vende de segunda mano con claridad, confianza y sostenibilidad.",
};

export default function SobrePage() {
  return (
    <main className={pageMainClass}>
      <article
        className={`${pageNarrowClass} bg-white/95 backdrop-blur rounded-2xl shadow-xl p-8 sm:p-10 space-y-6 text-gray-800 leading-relaxed`}
      >
        <h1 className="text-3xl font-bold text-gray-900">Sobre MiniMarket</h1>

        <p>
          MiniMarket es un espacio para <strong>comprar y vender de segunda mano</strong>{" "}
          de forma sencilla. Creemos que lo que ya no usas puede ser útil para otra
          persona, y que comprar usado es una forma inteligente de ahorrar y de{" "}
          <strong>reducir desperdicio</strong>.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 pt-2">
          Cómo funciona
        </h2>
        <ol className="list-decimal list-inside space-y-2 pl-1">
          <li>
            <strong>Explora</strong> el catálogo y encuentra lo que buscas por
            categoría o con la búsqueda.
          </li>
          <li>
            <strong>Publica</strong> lo que quieras vender con los datos básicos
            para que otros te encuentren.
          </li>
          <li>
            <strong>Organiza</strong> lo que te interesa con el carrito y, si lo
            necesitas, <strong>escríbenos</strong> desde contacto para dudas o
            sugerencias.
          </li>
        </ol>

        <h2 className="text-xl font-semibold text-gray-900 pt-2">
          Nuestros valores
        </h2>
        <ul className="list-disc list-inside space-y-2 pl-1">
          <li>
            <strong>Claridad:</strong> formularios y pasos fáciles de seguir.
          </li>
          <li>
            <strong>Confianza:</strong> información visible sobre cada artículo.
          </li>
          <li>
            <strong>Sostenibilidad:</strong> dar una segunda vida a los productos.
          </li>
        </ul>

        <p className="text-gray-700 border-t border-gray-200 pt-6">
          MiniMarket nace para que <strong>vender y comprar de segunda mano</strong>{" "}
          sea rápido, sin complicaciones.
        </p>
      </article>
    </main>
  );
}
