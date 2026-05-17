import * as productService from "../services/productService.js";


export const validateProduct = (req, res, next) => {
  const { name, price, description, category, province, city, imageUrl } = req.body;


  if (
    name == null ||
    typeof name !== "string" ||
    name.trim().length === 0
  ) {
    const err = new Error("name es obligatorio y debe ser un string no vacío");
    err.statusCode = 400;
    return next(err);
  }


  const parsedPrice = Number(price);

  if (
    price == null ||
    Number.isNaN(parsedPrice) ||
    parsedPrice <= 0
  ) {
    const err = new Error("price es obligatorio y debe ser un número mayor a 0");
    err.statusCode = 400;
    return next(err);
  }


  if (description !== undefined && typeof description !== "string") {
    const err = new Error("description debe ser un string");
    err.statusCode = 400;
    return next(err);
  }

  if (category !== undefined && typeof category !== "string") {
    const err = new Error("category debe ser un string");
    err.statusCode = 400;
    return next(err);
  }

  if (
    province == null ||
    typeof province !== "string" ||
    province.trim().length === 0
  ) {
    const err = new Error("province es obligatorio y debe ser un string no vacío");
    err.statusCode = 400;
    return next(err);
  }

  if (city == null || typeof city !== "string" || city.trim().length === 0) {
    const err = new Error("city es obligatorio y debe ser un string no vacío");
    err.statusCode = 400;
    return next(err);
  }

  if (imageUrl !== undefined && typeof imageUrl !== "string") {
    const err = new Error("imageUrl debe ser un string");
    err.statusCode = 400;
    return next(err);
  }

  req.body.price = parsedPrice;

  next();
};

export const validateProductUpdate = (req, res, next) => {
  const { name, price, description, category, province, city, imageUrl } = req.body;
  const allowedFields = [
    "name",
    "price",
    "description",
    "category",
    "province",
    "city",
    "imageUrl",
  ];
  const providedFields = Object.keys(req.body);

  if (providedFields.length === 0) {
    const err = new Error("Debes enviar al menos un campo para actualizar");
    err.statusCode = 400;
    return next(err);
  }

  const hasInvalidField = providedFields.some(
    (field) => !allowedFields.includes(field)
  );
  if (hasInvalidField) {
    const err = new Error(
      "Solo puedes actualizar name, price, description, category, province, city e imageUrl"
    );
    err.statusCode = 400;
    return next(err);
  }

  if (
    name !== undefined &&
    (typeof name !== "string" || name.trim().length === 0)
  ) {
    const err = new Error("name debe ser un string no vacío");
    err.statusCode = 400;
    return next(err);
  }

  if (price !== undefined) {
    const parsedPrice = Number(price);
    if (Number.isNaN(parsedPrice) || parsedPrice <= 0) {
      const err = new Error("price debe ser un número mayor a 0");
      err.statusCode = 400;
      return next(err);
    }
    req.body.price = parsedPrice;
  }

  if (description !== undefined && typeof description !== "string") {
    const err = new Error("description debe ser un string");
    err.statusCode = 400;
    return next(err);
  }

  if (category !== undefined && typeof category !== "string") {
    const err = new Error("category debe ser un string");
    err.statusCode = 400;
    return next(err);
  }

  if (province !== undefined && typeof province !== "string") {
    const err = new Error("province debe ser un string");
    err.statusCode = 400;
    return next(err);
  }

  if (city !== undefined && typeof city !== "string") {
    const err = new Error("city debe ser un string");
    err.statusCode = 400;
    return next(err);
  }

  if (imageUrl !== undefined && typeof imageUrl !== "string") {
    const err = new Error("imageUrl debe ser un string");
    err.statusCode = 400;
    return next(err);
  }

  next();
};


export const validateIdParam = (req, res, next) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    const err = new Error("id debe ser un número entero positivo");
    err.statusCode = 400;
    return next(err);
  }

  next();
};


export const validateProductExists = (req, res, next) => {
  const id = Number(req.params.id);
  const product = productService.getProductById(id);

  if (!product) {
    const err = new Error("Producto no encontrado");
    err.statusCode = 404;
    return next(err);
  }

  req.product = product;
  next();
};