// como no tenemos base de datos, guardo los productos en un array en memoria
// cuando se reinicia el servidor se pierden los cambios, pero para practicar va bien
let products = [
  { id: 1, name: "iPhone 13", price: 700, description: "Smartphone Apple en buen estado", category: "Electrónica" },
  { id: 2, name: "Zapatillas Nike", price: 120, description: "Talla 42, usadas pocas veces", category: "Ropa" },
  { id: 3, name: "Portátil Dell", price: 900, description: "Intel i7, 16GB RAM, SSD 512GB", category: "Electrónica" },
  { id: 4, name: "Bicicleta de montaña", price: 350, description: "21 velocidades, ruedas 26\"", category: "Deporte" },
];

// uso esto para que cada producto nuevo tenga un id único
let nextId = 5;

// devuelvo una copia del array para que nadie lo modifique desde fuera sin pasar por aquí
export const getAllProducts = () => [...products];

export const getProductById = (id) => products.find((p) => p.id === id) || null;

export const createProduct = (data) => {
  const product = { id: nextId++, ...data };
  products.push(product);
  return product;
};

// uso spread para mezclar los datos viejos con los nuevos, así solo se actualizan los campos que llegan
export const updateProduct = (id, data) => {
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return null;
  products[index] = { ...products[index], ...data };
  return products[index];
};

export const deleteProduct = (id) => {
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return false;
  products.splice(index, 1); // splice elimina el elemento en esa posición
  return true;
};
