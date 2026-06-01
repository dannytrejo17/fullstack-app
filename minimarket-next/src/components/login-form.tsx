"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [githubPending, setGithubPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError(null);

    const res = await signIn("credentials", {
      username,
      password,
      redirect: false,
      callbackUrl: "/dashboard",
    });

    setPending(false);

    if (res?.ok) {
      router.push("/dashboard");
      return;
    }

    setError("Credenciales incorrectas. Revisa usuario y contraseña.");
  }

  return (
    <div className="w-full space-y-4 rounded-2xl bg-white p-6 shadow-md">
      <form onSubmit={onSubmit} className="space-y-4">
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
            required
          />
        </div>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <Button
          type="submit"
          className="w-full h-11 bg-amber-400 hover:bg-amber-500 text-zinc-900 font-semibold shadow"
          disabled={pending || githubPending}
        >
          {pending ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Entrando…
            </>
          ) : (
            "Entrar con usuario"
          )}
        </Button>
      </form>

      <div className="relative py-2">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-zinc-200" />
        </div>
        <div className="relative flex justify-center text-xs uppercase tracking-wide">
          <span className="bg-white px-3 text-zinc-400">o continúa con</span>
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full h-11 gap-2 border-zinc-300 bg-zinc-50 hover:bg-zinc-100 text-zinc-900 font-medium"
        disabled={pending || githubPending}
        onClick={() => {
          setGithubPending(true);
          void signIn("github", { callbackUrl: "/dashboard" });
        }}
      >
        {githubPending ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Conectando con GitHub…
          </>
        ) : (
          <>
            <svg
              aria-hidden
              className="size-5"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.754-1.335-1.754-1.087-.744.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23a11.5 11.5 0 0 1 3.003-.404c1.02.005 2.047.138 3.003.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            Iniciar sesión con GitHub
          </>
        )}
      </Button>

      <p className="text-center text-sm text-zinc-600">
        ¿No tienes cuenta?{" "}
        <Link href="/register" className="text-blue-600 hover:underline">
          Regístrate
        </Link>
      </p>
    </div>
  );
}
