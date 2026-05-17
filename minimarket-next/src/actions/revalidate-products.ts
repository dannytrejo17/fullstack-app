"use server";

import { revalidatePath, revalidateTag } from "next/cache";

/** Tras crear/editar producto, refresca listados que usan fetch con tag "products". */
export async function revalidateProductPages() {
  revalidateTag("products");
  revalidatePath("/");
  revalidatePath("/productos");
}
