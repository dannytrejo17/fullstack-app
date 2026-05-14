import type { Product } from "@/types/product";

/** Solo los 4 productos de seed tienen foto local fija si la API no envía imageUrl. */
const LOCAL_IDS = new Set([1, 2, 3, 4]);

export function productImageUrl(
  product: Pick<Product, "id" | "imageUrl">
): string | null {
  if (product.imageUrl?.trim()) return product.imageUrl.trim();
  if (LOCAL_IDS.has(product.id)) return `/productos/${product.id}.jpg`;
  return null;
}

export const HERO_IMAGE_URL = "/productos/hero.jpg";

/** Placeholder blur pequeño (JPEG 10x10) para `placeholder="blur"`. */
export const IMAGE_BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeF5f/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY3/wAARCAAKAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwABmQ/9k=";
