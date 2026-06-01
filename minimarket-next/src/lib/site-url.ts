/** URL pública del sitio; en Vercel usa VERCEL_URL si no hay NEXT_PUBLIC_SITE_URL. */
export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) return configured;

  const vercelHost = process.env.VERCEL_URL?.trim();
  if (vercelHost) return `https://${vercelHost}`;

  return "http://localhost:3000";
}
