/**
 * Tipos de producto: número (id) ↔ nombre (label) ↔ slugs para la URL.
 * Modifica aquí si quieres cambiar o añadir categorías.
 * El mismo número debes usarlo en el Excel (columna "tipo") y en Supabase.
 */
export const PRODUCT_TYPES = [
  { id: 1, label: "Teclado", labelPlural: "Teclados", slugs: ["teclados", "teclado"] },
  { id: 2, label: "Mouse", labelPlural: "Mouses", slugs: ["mouses", "mouse", "ratones"] },
  { id: 3, label: "Monitor", labelPlural: "Monitores", slugs: ["monitores", "monitor"] },
  { id: 4, label: "Audífono", labelPlural: "Audífonos", slugs: ["audifonos", "audifono", "audífonos", "audífono"] },
  { id: 5, label: "Cámara", labelPlural: "Cámaras", slugs: ["camaras", "camara", "cámaras", "cámara"] },
  { id: 6, label: "Micrófono", labelPlural: "Micrófonos", slugs: ["microfonos", "microfono", "micrófonos", "micrófono"] },
  { id: 7, label: "Placa base", labelPlural: "Placas base", slugs: ["placas-base", "placa-base"] },
  { id: 8, label: "Procesador", labelPlural: "Procesadores", slugs: ["procesadores", "procesador"] },
  { id: 9, label: "Otros", labelPlural: "Otros", slugs: [] },
] as const;

/** Normaliza texto para comparar (quitar acentos, minúsculas) */
function normalize(s: string): string {
  try {
    return s
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .toLowerCase();
  } catch {
    return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  }
}

/** Dado el slug o nombre de la URL (ej. "Teclados", "mouses"), devuelve el id numérico */
export function getTipoIdFromSlug(slug: string): number {
  const norm = normalize(slug);
  const found = PRODUCT_TYPES.find((t) => t.slugs.some((s) => normalize(s) === norm));
  return found ? found.id : 9; // 9 = Otros por defecto
}

/** Dado el id numérico, devuelve el label (ej. "Teclado") */
export function getTipoLabel(tipoId: number): string {
  const found = PRODUCT_TYPES.find((t) => t.id === tipoId);
  return found ? found.label : "Otros";
}
