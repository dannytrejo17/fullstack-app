import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { PageHeader } from "@/components/page-header";
import { pageMainClass, pageNarrowClass } from "@/lib/page-layout";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Contacta con MiniMarket.",
};

export default function ContactoPage() {
  return (
    <main className={pageMainClass}>
      <div className={pageNarrowClass}>
        <PageHeader
          title="Contacto"
          description="Escríbenos y te responderemos lo antes posible."
        />
        <ContactForm />
      </div>
    </main>
  );
}
