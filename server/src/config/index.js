export const PORT = process.env.PORT || 3001;

/** Orígenes permitidos para CORS (coma-separado) o por defecto dev local */
export const ALLOWED_ORIGINS = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(",").map((o) => o.trim())
  : ["http://localhost:5173", "http://localhost:3000"];