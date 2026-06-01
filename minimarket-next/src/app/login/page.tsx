import type { Metadata } from "next";
import { LoginForm } from "@/components/login-form";
import { PageHeader } from "@/components/page-header";
import { pageMainClass, pageNarrowClass } from "@/lib/page-layout";

export const metadata: Metadata = {
  title: "Iniciar sesión",
  description: "Accede a MiniMarket con GitHub o usuario y contraseña.",
};

export default function LoginPage() {
  return (
    <main className={pageMainClass}>
      <div className={pageNarrowClass}>
        <PageHeader
          title="Iniciar sesión"
          description="Usa GitHub o usuario/contraseña para entrar."
        />
        <LoginForm />
      </div>
    </main>
  );
}
