import express from "express";
import cors from "cors";
import { PORT, ALLOWED_ORIGIN } from "./config/index.js";
import productRoutes from "./routes/products.js";

const app = express();

// esto permite que el frontend pueda hacer peticiones al backend sin que el navegador las bloquee
app.use(cors({ origin: ALLOWED_ORIGIN }));

// para que express entienda el JSON que llega en el body de las peticiones
app.use(express.json());

// todas las rutas de productos empiezan por /api/v1/products
app.use("/api/v1/products", productRoutes);

// ruta simple para comprobar que el servidor está vivo
app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
