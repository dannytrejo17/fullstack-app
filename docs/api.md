# API REST - Documentación de endpoints

Base URL: `http://localhost:3001/api/v1`

---

## GET /products

Devuelve todos los productos.

**Response 200:**
```json
[
  {
    "id": 1,
    "name": "iPhone 13",
    "price": 700,
    "description": "Smartphone Apple en buen estado",
    "category": "Electrónica",
    "image": ""
  }
]
```

---

## GET /products/:id

**Response 200:**
```json
{ "id": 1, "name": "iPhone 13", "price": 700, "description": "...", "category": "Electrónica", "image": "" }
```

**Response 404:**
```json
{ "error": "Producto no encontrado" }
```

---

## POST /products

**Body:**
```json
{ "name": "Cámara Sony", "price": 450, "description": "Mirrorless, 24MP", "category": "Electrónica", "image": "" }
```

**Response 201:**
```json
{ "id": 5, "name": "Cámara Sony", "price": 450, "description": "Mirrorless, 24MP", "category": "Electrónica", "image": "" }
```

**Response 400:**
```json
{ "error": "name y price son obligatorios" }
```

---

## PATCH /products/:id

**Body (campos parciales):**
```json
{ "price": 400 }
```

**Response 200:** producto actualizado

**Response 404:** `{ "error": "Producto no encontrado" }`

---

## DELETE /products/:id

**Response 204:** sin cuerpo

**Response 404:** `{ "error": "Producto no encontrado" }`

---

## GET /health

**Response 200:**
```json
{ "status": "ok" }
```
