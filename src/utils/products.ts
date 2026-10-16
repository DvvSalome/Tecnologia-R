import { Product } from "../types/product";

function mapRow(p: Record<string, unknown>): Product {
  return {
    ...p,
    id: Number(p.id),
    nombre: String(p.nombre ?? ""),
    descripcion: String((p.descripción ?? p.descripcion) ?? ""),
    tipo: Number(p.tipo),
    precio: Number(p.precio ?? 0),
    descuento: Number(p.descuento ?? 0),
    imagenes: Array.isArray(p.imagenes) ? (p.imagenes as string[]) : [],
    popular: Boolean(p.popular ?? false),
  } as Product;
}

async function fetchLocalProducts(): Promise<Product[]> {
  const res = await fetch("/data/products.json", { cache: "no-store" });
  if (!res.ok) throw new Error(`No se pudo cargar catálogo local (${res.status})`);
  const data = await res.json();
  return (Array.isArray(data) ? data : []).map((p) => mapRow(p));
}

/**
 * Obtiene productos: intenta Supabase; si falla o viene vacío, usa public/data/products.json
 */
export async function fetchProducts(): Promise<Product[]> {
  const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;
  const supabaseConfigured =
    Boolean(url && key) &&
    !String(url).includes("tu-proyecto") &&
    !String(key).includes("tu_anon");

  if (supabaseConfigured) {
    try {
      const { supabase } = await import("../lib/supabase");
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("id", { ascending: true });
      if (error) throw error;
      if (data && data.length > 0) {
        return data.map((p: Record<string, unknown>) => mapRow(p));
      }
    } catch (err) {
      console.warn("Supabase no disponible, usando catálogo local:", err);
    }
  }

  return fetchLocalProducts();
}

export function getById(products: Product[], id: number | string): Product | undefined {
  const idNum = typeof id === "string" ? parseInt(id, 10) : id;
  return products.find((p) => p.id === idNum);
}

export function getByType(
  products: Product[],
  tipo: number,
  excludePopular = false
): Product[] {
  const list = products.filter((p) => p.tipo === tipo);
  return excludePopular ? list.filter((p) => !p.popular) : list;
}

export function getLatestByType(products: Product[]): Product[] {
  const grouped: Record<number, Product[]> = {};
  products.forEach((p) => {
    if (!grouped[p.tipo]) grouped[p.tipo] = [];
    grouped[p.tipo].push(p);
  });
  return Object.values(grouped).map((arr) =>
    arr.sort((a, b) => b.id - a.id)[0]
  );
}

export function groupForSlider(items: Product[], itemsPerSlide: number): Product[][] {
  const grouped: Product[][] = [];
  for (let i = 0; i < items.length; i += itemsPerSlide) {
    grouped.push(items.slice(i, i + itemsPerSlide));
  }
  return grouped;
}

export function searchProducts(products: Product[], query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products.filter(
    (p) =>
      p.nombre.toLowerCase().includes(q) ||
      p.descripcion.toLowerCase().includes(q) ||
      (p.imagenes ?? []).join(" ").toLowerCase().includes(q)
  );
}
