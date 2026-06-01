# OAuth en MiniMarket (GitHub + NextAuth)

MiniMarket permite iniciar sesión con GitHub usando **NextAuth** como intermediario. El usuario no escribe su contraseña en nuestra web: es redirigido a GitHub, autoriza el acceso y vuelve ya autenticado. A continuación se describe ese recorrido, desde el botón **"Iniciar sesión con GitHub"** hasta la entrada en el dashboard.

## La idea:

OAuth permite que el usuario entre con su cuenta de GitHub **sin compartir su contraseña de GitHub con MiniMarket**. GitHub confirma la identidad y la aplicación crea la sesión. MiniMarket nunca ve la contraseña de GitHub.

## Quién interviene

- **El usuario** — quiere acceder a la app.
- **La app (Next.js)** — lo que se ve en el navegador.
- **NextAuth** — la ruta `/api/auth/[...nextauth]` que gestiona el protocolo.
- **GitHub** — comprueba quién es el usuario.

## Qué ocurre cuando se pulsa el botón

### 1. Clic en "Iniciar sesión con GitHub"

En `login-form.tsx` está definido así:

```ts
signIn("github", { callbackUrl: "/dashboard" })
```

Eso redirige el navegador a una ruta interna de NextAuth, por ejemplo `/api/auth/signin/github`.

### 2. Redirección a GitHub

NextAuth construye una URL hacia GitHub con el `client_id` (`GITHUB_ID`), la URL de retorno (`redirect_uri`), los permisos solicitados y un `state` aleatorio para evitar CSRF.

El navegador sale de localhost:3000 y entra en github.com.

### 3. Autorización en GitHub

GitHub muestra un mensaje del tipo "MiniMarket quiere acceder a tu cuenta". Si el usuario acepta, GitHub devuelve a la app con un `code` en la URL:

```
/api/auth/callback/github?code=...&state=...
```

### 4. NextAuth intercambia el código en el servidor

Este paso ocurre **en el servidor**, no en el navegador:

1. Se comprueba el `state`.
2. Se intercambia el `code` por un access token (usando `GITHUB_SECRET`).
3. Con ese token se obtiene el perfil: nombre, email, avatar e id.

### 5. Creación de la sesión

NextAuth guarda los datos del usuario, genera un JWT firmado con `NEXTAUTH_SECRET` y lo almacena en una cookie **HttpOnly** (`next-auth.session-token`).

HttpOnly significa que JavaScript del navegador no puede leerla directamente, lo que reduce el riesgo de robo por XSS.

### 6. Redirección al dashboard

NextAuth redirige a `/dashboard`. El middleware comprueba la cookie y permite el acceso.

Resumen del flujo:

```
Botón GitHub → NextAuth → GitHub (login) → callback → cookie JWT → /dashboard
```

## Configuración en el proyecto

En `src/app/api/auth/[...nextauth]/route.ts`:

```ts
GitHubProvider({
  clientId: process.env.GITHUB_ID!,
  clientSecret: process.env.GITHUB_SECRET!,
})
```

Variables en `.env.local` (no deben subirse a Git):

- `GITHUB_ID` y `GITHUB_SECRET` — OAuth App en GitHub
- `NEXTAUTH_SECRET` — firma de las cookies de sesión
- `NEXTAUTH_URL` — en local, `http://localhost:3000`

En GitHub hay que registrar la callback URL exacta, por ejemplo:

```
http://localhost:3000/api/auth/callback/github
```

(y la equivalente en Vercel al desplegar).

## Cerrar sesión

`signOut()` elimina la cookie de sesión de MiniMarket, pero **no** cierra la sesión del usuario en GitHub. Si vuelve a usar "Iniciar sesión con GitHub", GitHub puede reconocerlo de inmediato si sigue autenticado allí.

## Conclusión

OAuth delega la verificación de identidad en GitHub. NextAuth gestiona el protocolo, los tokens y la cookie de sesión. La aplicación solo necesita confiar en la sesión que NextAuth crea.
