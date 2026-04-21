import { Router } from "express";
import * as productController from "../controllers/productController.js";

const router = Router();

// cada ruta apunta a una función del controlador, aquí no hay lógica
router.get("/", productController.getAll);
router.get("/:id", productController.getOne);
router.post("/", productController.create);
router.patch("/:id", productController.update);
router.delete("/:id", productController.remove);

export default router;
