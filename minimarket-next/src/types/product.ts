export type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  province: string;
  city: string;
  imageUrl?: string;
};

/** Alta de producto: sin imagen (solo los ejemplos del seed llevan imageUrl). */
export type CreateProductInput = Omit<Product, "id" | "imageUrl">;
