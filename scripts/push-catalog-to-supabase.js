#!/usr/bin/env node
/**
 * Sube imágenes de public/images/products al bucket product-images
 * e inserta filas en public.products con URLs públicas.
 *
 * Requiere .env con SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY reales.
 * Primero aplica: supabase/migrations/20260929084047_products_and_storage.sql
 */
import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (
  !SUPABASE_URL ||
  !SERVICE_KEY ||
  SUPABASE_URL.includes("tu-proyecto") ||
  SERVICE_KEY.includes("tu_service")
) {
  console.error(
    "❌ Configura SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY reales en .env\n" +
      "   La org free ya tiene 2 proyectos. Pausa uno, crea 'tecnologia-r',\n" +
      "   aplica la migración SQL y vuelve a correr: npm run catalog:push"
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);
const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const products = JSON.parse(
  fs.readFileSync(path.join(ROOT, "public/data/products.json"), "utf8")
);
const BUCKET = "product-images";

function publicUrl(objectPath) {
  return `${SUPABASE_URL.replace(/\/$/, "")}/storage/v1/object/public/${BUCKET}/${objectPath}`;
}

async function uploadLocalProductImage(webPath) {
  // webPath: /images/products/foo.png
  const real = path.join(ROOT, "public", webPath.replace(/^\//, ""));
  if (!fs.existsSync(real)) throw new Error(`missing ${real}`);
  const objectPath = `products/${path.basename(real)}`;
  const buf = fs.readFileSync(real);
  const { error } = await supabase.storage.from(BUCKET).upload(objectPath, buf, {
    contentType: "image/png",
    upsert: true,
  });
  if (error) throw error;
  return publicUrl(objectPath);
}

async function main() {
  console.log(`📦 ${products.length} productos → ${SUPABASE_URL}`);

  const { error: delErr } = await supabase.from("products").delete().gte("id", 0);
  if (delErr) console.warn("⚠️  delete:", delErr.message);

  const rows = [];
  for (const p of products) {
    const remoteImgs = [];
    for (const img of p.imagenes || []) {
      try {
        remoteImgs.push(await uploadLocalProductImage(img));
        process.stdout.write(".");
      } catch (e) {
        console.warn(`\n⚠️  upload ${img}:`, e.message || e);
      }
    }
    rows.push({
      nombre: p.nombre,
      descripción: p.descripcion,
      tipo: p.tipo,
      precio: p.precio,
      descuento: p.descuento || 0,
      imagenes: remoteImgs,
      popular: Boolean(p.popular),
    });
  }
  console.log("\n⬆️  insertando filas...");

  const { data, error } = await supabase.from("products").insert(rows).select("id, nombre");
  if (error) {
    console.error("❌ insert:", error.message);
    process.exit(1);
  }
  console.log(`✅ ${data.length} productos en Supabase`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
