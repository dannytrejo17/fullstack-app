const AUTH_EMAIL_DOMAIN = "minimarket.local";

/** Convierte un nombre de usuario en el email sintético que usa Firebase. */
export function usernameToAuthEmail(username: string): string {
  const value = username.trim();
  if (value.includes("@")) return value;
  return `${value.toLowerCase()}@${AUTH_EMAIL_DOMAIN}`;
}

/** Muestra el usuario legible a partir del email guardado en sesión. */
export function authEmailToUsername(email: string): string {
  const suffix = `@${AUTH_EMAIL_DOMAIN}`;
  if (email.endsWith(suffix)) {
    return email.slice(0, -suffix.length);
  }
  return email;
}
