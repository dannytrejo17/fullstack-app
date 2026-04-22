export type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
};

export type CreateProductInput = Omit<Product, "id">;
