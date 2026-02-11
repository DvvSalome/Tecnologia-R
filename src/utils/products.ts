import { Product } from "../types/product";

/** Obtiene todos los productos desde Supabase (usar desde ProductsContext) */
export async function fetchProducts(): Promise<Product[]> {
  const { supabase } = await import("../lib/supabase");
  const { data, error } = await supabase.from("products").select("*").order("id", { ascending: true });
  if (error) throw error;
  return (data ?? []).map((p: Record<string, unknown>) => ({
    ...p,
    id: Number(p.id),
    descripcion: (p.descripción ?? p.descripcion) ?? "",
    popular: p.popular ?? false,
  })) as Product[];
}

export function getById(products: Product[], id: number | string): Product | undefined {
  const idNum = typeof id === "string" ? parseInt(id, 10) : id;
  return products.find((p) => p.id === idNum);
}

export function getByType(
  products: Product[],
  tipo: number,
  excludePopular = true
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
