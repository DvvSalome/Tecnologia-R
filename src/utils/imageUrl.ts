/**
 * Devuelve la URL final de una imagen de producto.
 * - Si ya es una URL absoluta (http/https), se devuelve tal cual.
 * - Si es una ruta relativa (ej. /images/...), se resuelve con el origin actual.
 */
export function getProductImageUrl(img: string | undefined | null, fallback: string): string {
  if (!img) return fallback;
  if (img.startsWith('http://') || img.startsWith('https://')) return img;
  const path = img.startsWith('/') ? img : `/${img}`;
  if (typeof window === 'undefined') return path; // SSR/build
  return `${window.location.origin}${path}`;
}
