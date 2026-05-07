let products = [
  { id: 1, name: "iPhone 13", price: 700, description: "Smartphone Apple en buen estado", category: "Electrónica" },
  { id: 2, name: "Zapatillas Nike", price: 120, description: "Talla 42, usadas pocas veces", category: "Ropa" },
  { id: 3, name: "Portátil Dell", price: 900, description: "Intel i7, 16GB RAM, SSD 512GB", category: "Electrónica" },
  { id: 4, name: "Bicicleta de montaña", price: 350, description: "21 velocidades, ruedas 26\"", category: "Deporte" },
];

let nextId = 5;

export const getAllProducts = () => [...products];

export const getProductById = (id) => products.find((p) => p.id === id) || null;

export const createProduct = (data) => {
  const product = { id: nextId++, ...data };
  products.push(product);
  return product;
};

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
