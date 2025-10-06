export function getBaseUrl() {
  // ✅ kalau di client (browser), pakai relative
  if (typeof window !== "undefined") return "";

  // ✅ kalau di server (Vercel / build)
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;

  // ✅ fallback: domain vercel
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;

  // ✅ fallback lokal
  return "http://localhost:3000";
}
