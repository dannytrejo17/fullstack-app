# Testing manual

## Checklist de pruebas

### Navegación
- [ ] Todos los enlaces del Navbar funcionan
- [ ] El botón "Volver" en ProductDetail regresa a la página anterior
- [ ] La ruta `/ruta-inexistente` muestra la página 404

---

### Lista de productos
- [ ] Los productos se cargan desde la API al entrar en `/products`
- [ ] El spinner aparece mientras carga
- [ ] Si la API falla, aparece el mensaje de error con botón "Reintentar"
- [ ] El filtro de búsqueda filtra por nombre y categoría en tiempo real

---

### Detalle de producto
- [ ] Muestra nombre, descripción, precio y categoría correctos
- [ ] El botón "Añadir al carrito" añade el producto
- [ ] El botón se deshabilita si el producto ya está en el carrito
- [ ] El contador del Navbar se actualiza

---

### Crear producto
- [ ] El formulario valida campos vacíos y precio <= 0
- [ ] Los errores aparecen bajo cada campo
- [ ] El backend devuelve error cuando se envían valores no permitidos
- [ ] El middleware de validación bloquea datos inválidos antes de llegar al controlador
- [ ] Los errores se centralizan mediante `next(err)` y `errorHandler`
- [ ] Al enviar correctamente redirige a `/products`
- [ ] El nuevo producto aparece en la lista

---

### Actualizar producto
- [ ] `PATCH /api/v1/products/:id` devuelve `200 OK`
- [ ] Los cambios se reflejan correctamente en la interfaz
- [ ] El backend valida correctamente los datos enviados

---

### Eliminar producto
- [ ] El botón "Eliminar" llama a `DELETE /api/v1/products/:id`
- [ ] El endpoint devuelve `204 No Content`
- [ ] El producto desaparece de la lista sin recargar

---

### Carrito
- [ ] Los productos añadidos aparecen en `/cart`
- [ ] El total se calcula correctamente
- [ ] El botón "Eliminar" quita productos del carrito
- [ ] El botón "Vaciar carrito" limpia todo el carrito

---

### API REST
- [ ] `GET /api/v1/products` devuelve `200 OK`
- [ ] `GET /api/v1/products/:id` devuelve `200 OK`
- [ ] `POST /api/v1/products` devuelve `201 Created`
- [ ] `PATCH /api/v1/products/:id` devuelve `200 OK`
- [ ] `DELETE /api/v1/products/:id` devuelve `204 No Content`
- [ ] Rutas inexistentes devuelven `404 Not Found`
- [ ] Errores inesperados devuelven `500 Internal Server Error`

---

### Responsive
- [ ] La grid de productos se adapta a 1 columna en móvil
- [ ] El formulario es usable en pantallas pequeñas
- [ ] El Navbar no se desborda en móvil

---

# Resultados de las pruebas

- [ ] La creación de producto funciona y redirige correctamente a `/products`
- [ ] El backend valida correctamente `name`, `price`, `description` y `category`
- [ ] El middleware evita crear productos con datos inválidos
- [ ] Los errores del backend se muestran correctamente en la UI
- [ ] El flujo frontend ↔ API ↔ backend funciona correctamente
- [ ] El estado global del carrito se sincroniza correctamente entre componentes

---

# Errores encontrados y corregidos

- El cliente de API utilizaba una URL absoluta.  
  Se cambió a una ruta relativa usando proxy de Vite para evitar problemas de CORS en desarrollo.

- El backend permitía crear productos con `price: null`.  
  Se añadió validación estricta en middleware usando:
  - `Number(price)`
  - `Number.isNaN`
  - validación de valores menores o iguales a 0

- Algunas rutas inexistentes devolvían HTML por defecto de Express.  
  Se añadió un middleware global `404` que responde en formato JSON.

- Los errores estaban distribuidos entre controladores y middlewares.  
  Se centralizó el manejo de errores usando `next(err)` y `errorHandler`.

---

# Conclusión

Las pruebas manuales permitieron verificar correctamente:

- La integración entre frontend y backend
- El funcionamiento de la API REST
- El manejo centralizado de errores
- Las validaciones del servidor
- El comportamiento responsive de la interfaz
- La sincronización del estado global del carrito