"use server";

import { revalidateProductPages } from "@/actions/revalidate-products";
import { createProduct } from "@/lib/api";
import { redirect } from "next/navigation";

export type Publish = {
  message?: string;
};

export async function publishProduct(
  _prev: Publish,
  formData: FormData
): Promise<Publish> {
  const name = String(formData.get("name") ?? "").trim();
  const price = Number(formData.get("price"));
  const description = String(formData.get("description") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const province = String(formData.get("province") ?? "").trim();
  const city = String(formData.get("city") ?? "").trim();

  if (
    !name ||
    !category ||
    !description ||
    Number.isNaN(price) ||
    !province ||
    !city
  ) {
    return { message: "Completa todos los campos correctamente." };
  }

  try {
    await createProduct({
      name,
      price,
      category,
      description,
      province,
      city,
    });
    await revalidateProductPages();
  } catch (e) {
    return {
      message:
        e instanceof Error ? e.message : "Error al publicar el producto.",
    };
  }

  redirect("/productos");
}