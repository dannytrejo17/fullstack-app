import * as productService from "../services/productService.js";

export const getAll = (req, res, next) => {
  try {
    const products = productService.getAllProducts();
    res.json(products);
  } catch (err) {
    next(err);
  }
};


export const getOne = (req, res, next) => {
  try {
    res.json(req.product);
  } catch (err) {
    next(err);
  }
};

export const create = (req, res, next) => {
  try {
    const { name, price, description, category } = req.body;

    const product = productService.createProduct({
      name,
      price,
      description: description || "",
      category: category || "General",
    });

    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

export const update = (req, res, next) => {
  try {
    const id = req.product.id;
    const updated = productService.updateProduct(id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const remove = (req, res, next) => {
  try {
    const id = req.product.id;
    productService.deleteProduct(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};