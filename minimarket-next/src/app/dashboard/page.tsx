import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { authOptions } from "@/lib/auth-options";
import { pageMainClass, pageNarrowClass } from "@/lib/page-layout";
import { authEmailToUsername } from "@/lib/auth-credentials";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Área privada de MiniMarket.",
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <main className={pageMainClass}>
      <div className={pageNarrowClass}>
        <PageHeader
          title="Dashboard"
          description="Zona privada. Solo usuarios autenticados."
        />
        <div className="rounded-2xl bg-white p-6 shadow-md space-y-3">
          <p className="text-sm text-zinc-600">
            Bienvenido,{" "}
            <span className="font-semibold text-zinc-900">
              {session.user?.name ?? "Usuario"}
            </span>
          </p>
          {session.user?.email && (
            <p className="text-sm text-zinc-600">
              Usuario:{" "}
              <span className="font-medium text-zinc-900">
                {authEmailToUsername(session.user.email)}
              </span>
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
