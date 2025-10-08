import raw from "../../public/data/products.json";
import { Product } from "../types/product";

// Normaliza los productos importados desde el JSON
export const loadProducts = (): Product[] => {
  const data = raw as any[];
  return data.map((p) => ({
    ...p,
    popular: p.popular ?? false,
  })) as Product[];
};

export const getById = (id: number): Product | undefined => {
  return loadProducts().find((p) => p.id === id);
};

export const getByType = (tipo: number, excludePopular = true): Product[] => {
  const list = loadProducts().filter((p) => p.tipo === tipo);
  return excludePopular ? list.filter((p) => !p.popular) : list;
};

export const getLatestByType = (): Product[] => {
  const products = loadProducts();
  const grouped: Record<number, Product[]> = {};
  products.forEach((p) => {
    if (!grouped[p.tipo]) grouped[p.tipo] = [];
    grouped[p.tipo].push(p);
  });

  return Object.values(grouped).map((arr) => arr.sort((a, b) => b.id - a.id)[0]);
};

export const groupForSlider = (items: Product[], itemsPerSlide: number) => {
  const grouped: Product[][] = [];
  for (let i = 0; i < items.length; i += itemsPerSlide) {
    grouped.push(items.slice(i, i + itemsPerSlide));
  }
  return grouped;
};

export const searchProducts = (query: string): Product[] => {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return loadProducts().filter(
    (p) =>
      p.nombre.toLowerCase().includes(q) ||
      p.descripcion.toLowerCase().includes(q) ||
      p.imagenes.join(" ").toLowerCase().includes(q)
  );
};
