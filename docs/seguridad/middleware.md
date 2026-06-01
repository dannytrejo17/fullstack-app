# Middleware y rutas protegidas

En MiniMarket hay páginas que solo deben verse con sesión iniciada: `/dashboard`, `/publicar`, etc. Existen varias formas de protegerlas y no ofrecen el mismo nivel de seguridad.

## Proteger solo en el cliente (useEffect)

Un enfoque habitual sería:

```tsx
"use client";
useEffect(() => {
  if (status === "unauthenticated") router.push("/login");
}, [status]);
```

El problema es que **Next.js ya envió la página al navegador**. La comprobación llega tarde. Puede mostrarse un flash del contenido privado antes del redirect, o alguien con conocimientos técnicos puede inspeccionar el JavaScript descargado. Además, ocultar la página no impide abusar de la API o de server actions si no comprueban sesión en el servidor.

Usarlo **solo** en el cliente da una falsa sensación de seguridad. Puede servir para mejorar la experiencia de usuario, pero no como única defensa.

## Proteger en el Server Component

En el dashboard se usa:

```tsx
const session = await getServerSession(authOptions);
if (!session) redirect("/login");
```

La comprobación ocurre en el **servidor**, antes de renderizar. Es adecuado para páginas concretas con datos sensibles. La limitación es que hay que repetir la lógica en cada ruta privada si no hay middleware, y la petición ya ha entrado en Next.js.

En MiniMarket esto se combina con el middleware en `/dashboard` como capa adicional.

## Middleware con withAuth (enfoque principal)

En `middleware.ts`:

```ts
export default withAuth(
  function middleware(request) {
    return applySecurityHeaders(request);
  },
  { pages: { signIn: "/login" } }
);

export const config = {
  matcher: ["/dashboard/:path*", "/publicar/:path*", /* ... */],
};
```

`withAuth` intercepta la petición **antes** de renderizar la página:

1. Comprueba si existe una cookie de sesión válida.
2. Si no hay sesión → redirect a `/login?callbackUrl=/ruta-original`.
3. Si hay sesión → permite continuar y aplica cabeceras de seguridad.

El middleware se ejecuta antes de renderizar la página: primero se valida la autenticación, después se sirve el contenido.

## Rutas protegidas

- `/dashboard` — área privada con datos de sesión
- `/publicar` — solo usuarios autenticados

Rutas públicas: `/`, `/productos`, `/login`, `/register`, `/contacto`, `/carrito`.

## Cabeceras de seguridad

El middleware también aplica cabeceras como `X-Frame-Options: DENY` (evita embeber la web en iframes), `X-Content-Type-Options: nosniff` y otras. Solo en las rutas incluidas en el `matcher`.

## Ejemplo: acceder a /dashboard sin sesión

1. El usuario solicita `/dashboard`.
2. El middleware detecta que no hay sesión → redirect a `/login?callbackUrl=%2Fdashboard`.
3. Tras iniciar sesión, NextAuth redirige de vuelta.
4. El middleware valida la cookie y permite el acceso.
5. `getServerSession` en la página obtiene los datos del usuario para renderizar.

## Lectura de sesión: servidor vs cliente

- **Servidor** (`getServerSession`) — en `dashboard/page.tsx`, para mostrar datos sin parpadeos.
- **Cliente** (`useSession`, `signOut`) — en el header, para los botones Entrar y Cerrar sesión.

Cada herramienta tiene su función: el middleware protege la ruta, `getServerSession` lee datos en el servidor y `useSession` actualiza la interfaz en el cliente.

## Limitación del proyecto demo

El middleware protege **páginas de Next.js**. La API Express de productos (`POST /api/v1/products`) no pasa por ahí y permanece abierta para demostrar el CRUD con Postman. En un entorno de producción también habría que exigir autenticación en la API.

## Resumen

| Dónde se protege | ¿Suficiente solo? |
|------------------|-------------------|
| useEffect en cliente | No |
| getServerSession en la página | Sí, pero hay que repetir en cada ruta |
| **Middleware withAuth** | Sí, y de forma centralizada |

En MiniMarket se combinan middleware y `getServerSession` en el dashboard: una comprobación al entrar en la ruta y otra al renderizar la página.
