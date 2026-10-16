#!/usr/bin/env node
/**
 * Copia imágenes sin fondo a public/images/products y genera public/data/products.json
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const MANIFEST = path.join(ROOT, "data", "images-manifest.json");
const OUT_JSON = path.join(ROOT, "public", "data", "products.json");
const OUT_IMG = path.join(ROOT, "public", "images", "products");

if (!fs.existsSync(MANIFEST)) {
  console.error("Falta data/images-manifest.json. Corre: npm run catalog:images");
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(MANIFEST, "utf8"));
fs.mkdirSync(OUT_IMG, { recursive: true });
fs.mkdirSync(path.dirname(OUT_JSON), { recursive: true });

const products = [];
let id = 1;

for (const item of manifest) {
  const imagenes = [];
  (item.localImages || []).forEach((rel, idx) => {
    const src = path.join(ROOT, rel);
    if (!fs.existsSync(src)) {
      console.warn("⚠️  no existe", rel);
      return;
    }
    const destName = `${item.slug}-${idx}.png`;
    const dest = path.join(OUT_IMG, destName);
    fs.copyFileSync(src, dest);
    imagenes.push(`/images/products/${destName}`);
  });

  products.push({
    id: id++,
    nombre: item.nombre,
    descripcion: item.descripcion || "",
    tipo: Number(item.tipo) || 9,
    precio: Number(item.precio) || 0,
    descuento: Number(item.descuento) || 0,
    imagenes,
    popular: Boolean(item.popular),
  });
}

fs.writeFileSync(OUT_JSON, JSON.stringify(products, null, 2) + "\n", "utf8");
console.log(`✅ ${products.length} productos → ${path.relative(ROOT, OUT_JSON)}`);
console.log(`✅ imágenes en ${path.relative(ROOT, OUT_IMG)}`);
