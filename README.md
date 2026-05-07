# MiniMarket

**Logline:** Marketplace fullstack de segunda mano donde usuarios pueden publicar, buscar y eliminar productos de forma sencilla.

## Descripción breve

MiniMarket es una aplicación web completa construida con React + TypeScript + Tailwind en el frontend y Node.js + Express en el backend. Permite a los usuarios gestionar un catálogo de productos con operaciones CRUD, carrito de compras y validación de datos en tiempo real.

## Despliegue

| Servicio | URL |
|----------|-----|
| Frontend (Vercel) | _pendiente de despliegue_ |
| Backend (Vercel) | _pendiente de despliegue_ |
| Tablero Kanban (Trello) | https://trello.com/b/ywnVxrTd/fullstack-app |

## Características

- Listar, crear, actualizar y eliminar productos
- Carrito de compra con estado global (Context API)
- Búsqueda y filtrado de productos en tiempo real
- Validación de datos en frontend y backend
- API REST con arquitectura por capas
- Diseño responsive con Tailwind CSS

## Tecnologías

### Frontend

| Tecnología | Uso |
|-----------|-----|
| React | Librería de UI |
| TypeScript | Tipado estático en JavaScript |
| Tailwind CSS | Estilos y diseño responsive |

### Backend

| Tecnología | Uso |
|-----------|-----|
| Express | Framework web minimalista |
| Node.js | Runtime de JavaScript en servidor |
| JavaScript | Lógica del servidor |

### Auxiliares

| Tecnología | Uso |
|-----------|-----|
| Vite | Bundler y dev server rápido |
| React Router | Navegación entre páginas |
| Fetch API | Cliente HTTP tipado |

## Estructura del proyecto

```
fullstack-app/
├── frontend/                  # React + TypeScript + Tailwind (Vite)
│   ├── index.html             # HTML semántico
│   ├── package.json
│   ├── vite.config.ts         # Configuración de Vite
│   ├── tsconfig.json
│   └── src/
│       ├── App.tsx            # Componente raíz
│       ├── main.tsx           # Punto de entrada
│       ├── api/
│       │   └── client.ts      # Cliente HTTP tipado
│       ├── components/        # Componentes reutilizables
│       ├── context/           # CartContext (estado global)
│       ├── hooks/             # useProducts (custom hook)
│       ├── pages/             # Páginas de la app
│       └── types/             # Tipos TypeScript
├── server/                    # Node.js + Express
│   ├── package.json
│   ├── src/
│   │   ├── index.js           # Punto de entrada del servidor
│   │   ├── config/            # Configuración del servidor
│   │   ├── routes/            # Rutas de API
│   │   ├── controllers/       # Controladores
│   │   ├── middleware/        # Middlewares de validación
│   │   └── services/          # Lógica de negocio
│   └── README.md              # Documentación del backend
├── docs/                      # Documentación del proyecto
│   ├── agile.md               # Metodologías Agile
│   ├── idea.md                # Idea del proyecto
│   ├── design.md              # Arquitectura y diseño
│   ├── components.md          # Documentación de componentes
│   ├── hooks.md               # Hooks de React
│   ├── context.md             # Context API
│   ├── routing.md             # Rutas de la app
│   ├── forms.md               # Formularios
│   ├── api.md                 # Endpoints de la API
│   ├── api-client.md          # Capa de red frontend
│   ├── testing.md             # Testing manual
│   ├── deployment.md          # Despliegue
│   ├── project-management.md  # Gestión del proyecto
│   └── retrospective.md       # Retrospectiva final
└── README.md

```

## Descargar y ejecutar

```bash
# Clonar el repositorio
git clone https://github.com/user/fullstack-app.git
cd fullstack-app

# Instalar y ejecutar backend
cd server
npm install
npm run dev
# Servidor en http://localhost:3001

# En otra terminal: instalar y ejecutar frontend
cd frontend
npm install
npm run dev
# App en http://localhost:5173
```

## Desplegar en Vercel

### Frontend

1. Conecta el repositorio en [vercel.com](https://vercel.com)
2. Selecciona la carpeta `frontend` como raíz del proyecto
3. Vercel detecta Vite automáticamente
4. Configura la variable de entorno `VITE_API_URL` con la URL del backend
5. Despliega

### Backend

1. Crea un nuevo proyecto en Vercel
2. Conecta el repositorio y selecciona la carpeta `server` como raíz
3. Configura el start command: `npm start`
4. Despliega
5. Copia la URL del backend y úsala en `VITE_API_URL` del frontend

