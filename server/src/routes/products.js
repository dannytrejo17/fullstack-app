import { Router } from "express";
import * as productController from "../controllers/productController.js";
import {
  validateProduct,
  validateProductUpdate,
  validateIdParam,
  validateProductExists
} from "../middleware/validationMiddleware.js";

const router = Router();

// GET all
router.get("/", productController.getAll);

// GET one
router.get(
  "/:id",
  validateIdParam,
  validateProductExists,
  productController.getOne
);

// CREATE
router.post(
  "/",
  validateProduct,
  productController.create
);

// UPDATE
router.patch(
  "/:id",
  validateIdParam,
  validateProductExists,
  validateProductUpdate,
  productController.update
);

// DELETE
router.delete(
  "/:id",
  validateIdParam,
  validateProductExists,
  productController.remove
);

export default router;