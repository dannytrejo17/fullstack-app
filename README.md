# MiniMarket

**Logline:** Marketplace fullstack de segunda mano donde usuarios pueden publicar, buscar y eliminar productos de forma sencilla.

## Descripción breve

MiniMarket es una aplicación web completa con **Node.js + Express** en el backend y dos frontends: la versión original con **React + Vite** (`frontend/`) y la versión actual con **Next.js 15** (`minimarket-next/`), que cubre las fases comercial (App Router, ISR, SEO) y de autenticación (NextAuth, OAuth GitHub, credenciales Firebase, middleware).

Permite gestionar un catálogo de productos con operaciones CRUD, carrito de compra, validación de datos, formulario de contacto con Server Action y acceso privado al dashboard para usuarios autenticados.

## Despliegue

| Servicio | URL |
|----------|-----|
| Frontend Next.js (Vercel) | https://minimarket-next.vercel.app/ |
| Backend Express (Vercel) | https://minimarket-api-next.vercel.app/ |
| Frontend Vite (legacy) | https://minimarket-front-kohl.vercel.app/ |
| Backend Vite (legacy) | https://minimarket-three.vercel.app/ |
| Tablero Kanban (Trello) | https://trello.com/b/ywnVxrTd/fullstack-app |

## Características

### Catálogo y UX
- Listar, crear, actualizar y eliminar productos
- Carrito de compra con estado global (Context API)
- Búsqueda y filtrado de productos en tiempo real
- Validación de datos en frontend y backend
- API REST con arquitectura por capas
- Diseño responsive con Tailwind CSS

### Next.js (Fase 6)
- App Router, Server Components e ISR (`revalidate`, tags)
- Rutas dinámicas `/productos/[id]` con `generateStaticParams` y metadata SEO
- Optimización de imágenes con `next/image` (`priority`, `blur`)
- Server Action en formulario de contacto (validación servidor)
- Server Action en publicar producto con `revalidateTag`
- Middleware con cabeceras de seguridad
- Suspense, skeletons y `error.tsx`

### Autenticación (Fase 7)
- NextAuth con OAuth GitHub y credenciales (Firebase Auth)
- Páginas `/login`, `/register` y `/dashboard`
- Middleware protegiendo `/dashboard` y `/publicar`
- Documentación en `docs/seguridad/`

## Tecnologías

### Frontend (Next.js — principal)

| Tecnología | Uso |
|-----------|-----|
| Next.js 15 | App Router, SSR/SSG, Server Actions |
| React 19 | Librería de UI |
| TypeScript | Tipado estático |
| Tailwind CSS | Estilos responsive |
| Shadcn UI | Componentes de formulario y UI |
| NextAuth.js | Sesiones, OAuth y credenciales |
| Firebase Auth | Registro e inicio con email/contraseña |

### Frontend (Vite — versión original)

| Tecnología | Uso |
|-----------|-----|
| React | Librería de UI |
| TypeScript | Tipado estático |
| Tailwind CSS | Estilos responsive |
| Vite | Bundler y dev server |
| React Router | Navegación entre páginas |

### Backend

| Tecnología | Uso |
|-----------|-----|
| Express | Framework web |
| Node.js | Runtime en servidor |
| JavaScript | Lógica del servidor |
| CORS | Orígenes permitidos vía `FRONTEND_URL` |

### Auxiliares

| Tecnología | Uso |
|-----------|-----|
| Fetch API | Cliente HTTP tipado |
| Vercel | Despliegue frontend y backend |

## Estructura del proyecto

```
fullstack-app/
├── minimarket-next/           # Next.js 15 — Fase 6 + Fase 7 (principal)
│   ├── package.json
│   ├── next.config.ts
│   ├── .env.example
│   └── src/
│       ├── app/               # App Router (páginas, layout, API auth)
│       │   ├── api/auth/[...nextauth]/
│       │   ├── contacto/
│       │   ├── dashboard/
│       │   ├── login/
│       │   ├── productos/[id]/
│       │   ├── publicar/
│       │   └── register/
│       ├── actions/           # Server Actions (contacto, publicar)
│       ├── components/        # UI, formularios, grid
│       ├── lib/               # API client, auth, Firebase
│       ├── middleware.ts      # Protección de rutas + cabeceras
│       └── providers/         # SessionProvider, CartProvider
├── frontend/                  # React + Vite (versión original)
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   └── src/
│       ├── App.tsx
│       ├── api/client.ts
│       ├── components/
│       ├── context/
│       ├── hooks/
│       └── pages/
├── server/                    # Node.js + Express
│   ├── package.json
│   └── src/
│       ├── index.js
│       ├── config/
│       ├── routes/
│       ├── controllers/
│       ├── middleware/
│       └── services/
├── docs/                      # Documentación del proyecto
│   ├── agile.md
│   ├── idea.md
│   ├── design.md
│   ├── components.md
│   ├── hooks.md
│   ├── context.md
│   ├── routing.md
│   ├── forms.md
│   ├── api.md
│   ├── api-client.md
│   ├── testing.md
│   ├── deployment.md
│   ├── project-management.md
│   ├── retrospective.md
│   └── seguridad/             # Fase 7
│       ├── oauth.md
│       ├── middleware.md
│       └── credenciales.md
└── README.md
```

## Descargar y ejecutar

```bash
# Clonar el repositorio
git clone https://github.com/dannytrejo17/fullstack-app.git
cd fullstack-app

# Instalar y ejecutar backend (obligatorio para el catálogo)
cd server
npm install
npm run dev
# Servidor en http://localhost:3001

# En otra terminal: Next.js (recomendado — Fase 6 + 7)
cd minimarket-next
cp .env.example .env.local   # completar variables (ver .env.example)
npm install
npm run dev
# App en http://localhost:3000

# Alternativa: frontend Vite (versión original)
cd frontend
npm install
npm run dev
# App en http://localhost:5173
```

## Desplegar en Vercel

### Backend (Express)

1. Crea un proyecto en [vercel.com](https://vercel.com) apuntando a la carpeta `server` (o raíz del repo si usas `vercel.json`).
2. Configura el start command: `npm start`.
3. Añade la variable `FRONTEND_URL` con la URL del frontend Next (ej. `https://minimarket-next.vercel.app`).
4. Despliega y copia la URL pública (ej. `https://minimarket-api-next.vercel.app`).

### Frontend Next.js (principal)

1. Crea otro proyecto en Vercel con raíz `minimarket-next`.
2. Configura las variables de entorno (Production):

| Variable | Ejemplo |
|----------|---------|
| `NEXT_PUBLIC_API_URL` | `https://minimarket-api-next.vercel.app/api/v1` |
| `NEXT_PUBLIC_SITE_URL` | `https://minimarket-next.vercel.app` |
| `NEXTAUTH_URL` | `https://minimarket-next.vercel.app` |
| `NEXTAUTH_SECRET` | *(generar con `openssl rand -base64 32`)* |
| `GITHUB_ID` / `GITHUB_SECRET` | OAuth App en GitHub |
| `NEXT_PUBLIC_FIREBASE_*` | Consola Firebase |

3. En GitHub OAuth App, callback: `https://minimarket-next.vercel.app/api/auth/callback/github`.
4. Despliega.

### Frontend Vite (legacy)

1. Conecta el repositorio en Vercel.
2. Selecciona la carpeta `frontend` como raíz.
3. Configura `VITE_API_URL` con la URL del backend.
4. Despliega.
