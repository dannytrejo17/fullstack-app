# MiniMarket (Next.js)

Misma marca y UX que el frontend Vite (`frontend/`), con **App Router**, datos del catálogo vía **API REST** del `server/` y **Server Action** solo en el formulario de contacto.

## Variables de entorno

Copia `.env.example` a `.env.local` y ajusta:

- `NEXT_PUBLIC_API_URL` — base de la API (ej. `http://localhost:3001/api/v1` o tu despliegue Vercel del backend).
- `NEXT_PUBLIC_SITE_URL` — URL pública del sitio (metadata / Open Graph).

## Scripts

```bash
npm install
npm run dev
```

Raíz del proyecto en Vercel: carpeta `minimarket-next`.
