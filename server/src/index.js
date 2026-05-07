import express from "express";
import cors from "cors";
import { PORT, ALLOWED_ORIGIN } from "./config/index.js";
import productRoutes from "./routes/products.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(cors({ origin: ALLOWED_ORIGIN }));

app.use(express.json());

app.use("/api/v1/products", productRoutes);


app.get("/health", (_req, res) => res.json({ status: "ok" }));


app.use((req, res) => {
  res.status(404).json({
    error: "Ruta no encontrada"
  });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
