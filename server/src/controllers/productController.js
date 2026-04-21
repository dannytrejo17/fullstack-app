import * as productService from "../services/productService.js";

// devuelve todos los productos
export const getAll = (req, res) => {
  const products = productService.getAllProducts();
  res.json(products);
};

// busca un producto por id, si no existe devuelve 404
export const getOne = (req, res) => {
  const id = parseInt(req.params.id);
  const product = productService.getProductById(id);
  if (!product) return res.status(404).json({ error: "Producto no encontrado" });
  res.json(product);
};

// crea un producto nuevo, valida que tenga nombre y precio antes de guardarlo
export const create = (req, res) => {
  const { name, price, description, category } = req.body;

  // si falta el nombre o el precio no dejamos continuar
  if (!name || price === undefined) {
    return res.status(400).json({ error: "name y price son obligatorios" });
  }

  const product = productService.createProduct({
    name,
    price: Number(price),
    description: description || "",
    category: category || "General",
  });

  res.status(201).json(product); // 201 significa "creado correctamente"
};

// actualiza solo los campos que llegan en el body, no hace falta mandar todo
export const update = (req, res) => {
  const id = parseInt(req.params.id);
  const updated = productService.updateProduct(id, req.body);
  if (!updated) return res.status(404).json({ error: "Producto no encontrado" });
  res.json(updated);
};

// elimina el producto, si no existe devuelve 404
export const remove = (req, res) => {
  const id = parseInt(req.params.id);
  const deleted = productService.deleteProduct(id);
  if (!deleted) return res.status(404).json({ error: "Producto no encontrado" });
  res.status(204).send(); // 204 = ok pero sin contenido que devolver
};
