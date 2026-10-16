/**
 * Tipos de producto: número (id) ↔ nombre (label) ↔ slugs para la URL.
 * Modifica aquí si quieres cambiar o añadir categorías.
 * El mismo número debes usarlo en el Excel (columna "tipo") y en Supabase.
 */
export const PRODUCT_TYPES = [
  { id: 1, label: "Teclado", labelPlural: "Teclados", slugs: ["teclados", "teclado"] },
  { id: 2, label: "Mouse", labelPlural: "Mouses", slugs: ["mouses", "mouse", "ratones"] },
  { id: 3, label: "Monitor", labelPlural: "Monitores", slugs: ["monitores", "monitor"] },
  { id: 4, label: "Audífono", labelPlural: "Audífonos", slugs: ["audifonos", "audifono", "audífonos", "audífono", "diademas", "diadema", "auriculares"] },
  { id: 5, label: "Cámara", labelPlural: "Cámaras", slugs: ["camaras", "camara", "cámaras", "cámara"] },
  { id: 6, label: "Micrófono", labelPlural: "Micrófonos", slugs: ["microfonos", "microfono", "micrófonos", "micrófono"] },
  { id: 7, label: "Placa base", labelPlural: "Placas base", slugs: ["placas-base", "placa-base"] },
  { id: 8, label: "Procesador", labelPlural: "Procesadores", slugs: ["procesadores", "procesador"] },
  { id: 9, label: "Otro", labelPlural: "Otros", slugs: ["otros", "otro"] },
  { id: 10, label: "Convertidor", labelPlural: "Convertidores", slugs: ["convertidores", "convertidor", "adaptadores"] },
  { id: 11, label: "Accesorio", labelPlural: "Accesorios", slugs: ["accesorios", "accesorio", "bases"] },
  { id: 12, label: "Energía", labelPlural: "Energía", slugs: ["energia", "energía", "reguladores", "regulador"] },
  { id: 13, label: "Audio", labelPlural: "Audio", slugs: ["audio", "tarjetas-de-sonido", "mezcladores"] },
] as const;

/** Agrupación del menú Productos */
export const PRODUCT_TYPE_GROUPS = [
  { id: "perifericos", name: "Periféricos", typeIds: [1, 2, 3, 4, 5, 6] },
  { id: "componentes", name: "Componentes", typeIds: [7, 8] },
  { id: "conectividad", name: "Conectividad y más", typeIds: [10, 11, 12, 13, 9] },
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
  return found ? found.id : 9;
}

/** Dado el id numérico, devuelve el label (ej. "Teclado") */
export function getTipoLabel(tipoId: number): string {
  const found = PRODUCT_TYPES.find((t) => t.id === tipoId);
  return found ? found.label : "Otros";
}
