"use server";

export type ContactState = {
  ok?: boolean;
  message?: string;
  fieldErrors?: {
    name?: string;
    email?: string;
    body?: string;
  };
};

function validate(
  name: string,
  email: string,
  body: string
): ContactState["fieldErrors"] | null {
  const fieldErrors: NonNullable<ContactState["fieldErrors"]> = {};
  if (!name.trim() || name.trim().length < 2) {
    fieldErrors.name = "Indica un nombre (mínimo 2 caracteres).";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    fieldErrors.email = "Introduce un email válido.";
  }
  if (!body.trim() || body.trim().length < 10) {
    fieldErrors.body = "El mensaje debe tener al menos 10 caracteres.";
  }
  return Object.keys(fieldErrors).length ? fieldErrors : null;
}

export async function submitContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const name = String(formData.get("name") ?? "");
  const email = String(formData.get("email") ?? "");
  const body = String(formData.get("message") ?? "");

  const fieldErrors = validate(name, email, body);
  if (fieldErrors) return { fieldErrors };

  // En producción aquí enviarías email, CRM, cola, etc.
  return {
    ok: true,
    message: "Gracias. Hemos recibido tu mensaje y te responderemos pronto.",
  };
}
