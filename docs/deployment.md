# Despliegue

## Frontend → Vercel

1. Conecta el repositorio en [vercel.com](https://vercel.com)
2. Configura el directorio raíz como `frontend`
3. Vercel detecta Vite automáticamente
4. Añade la variable de entorno `VITE_API_URL` con la URL del backend (después de desplegar el backend)
5. Despliega

## Backend → Vercel

1. Crea un nuevo proyecto en Vercel (mismo repositorio)
2. Conecta el repositorio y selecciona la carpeta `server` como raíz
3. Configura el start command: `npm start`
4. Vercel detecta `package.json` y ejecuta automáticamente
5. Copia la URL pública del backend
6. Actualiza la variable `VITE_API_URL` en el frontend con esta URL y redeploy

## Variables de entorno

| Variable       | Dónde        | Valor ejemplo                    |
|----------------|--------------|----------------------------------|
| VITE_API_URL   | Frontend     | https://tu-backend.vercel.app/api/v1 |
| PORT           | Backend      | 3001                             |

## Verificación post-despliegue

- Abre la URL del frontend y comprueba que los productos cargan
- Crea un producto desde el formulario y verifica que aparece en la lista
- Comprueba `/health` en la URL del backend: debe devolver `{ "status": "ok" }`

