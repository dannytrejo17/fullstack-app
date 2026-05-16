import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { PublicarForm } from "@/components/publicar-form";
import { pageMainClass, pageNarrowClass } from "@/lib/page-layout";

export const metadata: Metadata = {
  title: "Publicar",
  description: "Publica un producto de segunda mano en MiniMarket.",
};

export default function PublicarPage() {
  return (
    <main className={pageMainClass}>
      <div className={pageNarrowClass}>
        <PageHeader
          title="Publicar producto"
          description="Completa el formulario para añadir un anuncio al catálogo."
        />
        <PublicarForm />
      </div>
    </main>
  );
}
