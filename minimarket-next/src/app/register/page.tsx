"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/page-header";
import { pageMainClass, pageNarrowClass } from "@/lib/page-layout";
import { firebaseAuth } from "@/lib/firebase";
import { usernameToAuthEmail } from "@/lib/auth-credentials";

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError(null);
    setMessage(null);

    try {
      await createUserWithEmailAndPassword(
        firebaseAuth,
        usernameToAuthEmail(username),
        password
      );
      setMessage("Cuenta creada. Ahora inicia sesión.");
      setTimeout(() => router.push("/login"), 700);
    } catch {
      setError("No se pudo registrar. Revisa usuario y contraseña (mínimo 6).");
    } finally {
      setPending(false);
    }
  }

  return (
    <main className={pageMainClass}>
      <div className={pageNarrowClass}>
        <PageHeader
          title="Registro"
          description="Crea una cuenta con usuario y contraseña."
        />
        <form
          onSubmit={onSubmit}
          className="w-full space-y-4 rounded-2xl bg-white p-6 shadow-md"
        >
          <div className="space-y-2">
            <Label htmlFor="username">Usuario</Label>
            <Input
              id="username"
              type="text"
              autoComplete="username"
              placeholder="tu_usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required
            />
          </div>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          {message ? <p className="text-sm text-teal-700">{message}</p> : null}

          <Button type="submit" className="w-full h-10" disabled={pending}>
            {pending ? "Creando..." : "Crear cuenta"}
          </Button>
        </form>
      </div>
    </main>
  );
}
