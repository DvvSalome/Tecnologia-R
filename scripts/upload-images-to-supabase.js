/**
 * Sube las imágenes de productos (public/images/teclados, mouses, diademas)
 * a Supabase Storage y actualiza la tabla products con las URLs públicas.
 *
 * Requisitos:
 * - En Supabase: Storage → New bucket → nombre "product-images" → Public.
 * - .env con SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY.
 *
 * Uso: node --env-file=.env scripts/upload-images-to-supabase.js
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '../public/images');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET = 'product-images';

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Faltan SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en .env');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

function getAllImagePaths(dir, base = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const out = [];
  for (const e of entries) {
    const rel = path.join(base, e.name);
    if (e.isDirectory()) {
      out.push(...getAllImagePaths(path.join(dir, e.name), rel));
    } else if (/\.(png|jpg|jpeg|gif|webp|svg)$/i.test(e.name)) {
      out.push(rel.replace(/\\/g, '/'));
    }
  }
  return out;
}

async function ensureBucket() {
  const { data: buckets } = await supabase.storage.listBuckets();
  if (buckets?.some((b) => b.name === BUCKET)) return;
  const { error } = await supabase.storage.createBucket(BUCKET, { public: true });
  if (error) {
    console.warn('⚠️ No se pudo crear el bucket (puede que ya exista):', error.message);
  } else {
    console.log('✔ Bucket "' + BUCKET + '" creado');
  }
}

async function uploadFolder(folderName) {
  const dir = path.join(publicDir, folderName);
  if (!fs.existsSync(dir)) return {};
  const files = getAllImagePaths(dir);
  const pathToUrl = {};
  for (const rel of files) {
    const localPath = path.join(dir, path.basename(rel));
    const buf = fs.readFileSync(localPath);
    const storagePath = `${folderName}/${path.basename(rel)}`;
    const { error } = await supabase.storage.from(BUCKET).upload(storagePath, buf, {
      contentType: path.extname(rel).toLowerCase() === '.svg' ? 'image/svg+xml' : undefined,
      upsert: true
    });
    if (error) {
      console.warn('⚠️ Error subiendo', storagePath, error.message);
      continue;
    }
    const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${storagePath}`;
    pathToUrl[`/images/${storagePath}`] = publicUrl;
  }
  return pathToUrl;
}

async function main() {
  console.log('🚀 Subiendo imágenes a Supabase Storage...\n');

  await ensureBucket();

  const [teclados, mouses, diademas] = await Promise.all([
    uploadFolder('teclados'),
    uploadFolder('mouses'),
    uploadFolder('diademas')
  ]);
  const pathToUrl = { ...teclados, ...mouses, ...diademas };

  const pathToUrlByOldPath = { ...pathToUrl };

  console.log('✔ Imágenes subidas. Actualizando productos...\n');

  const { data: products, error: fetchError } = await supabase.from('products').select('id, imagenes');
  if (fetchError) {
    console.error('❌ Error leyendo productos:', fetchError.message);
    return;
  }
  if (!products?.length) {
    console.log('No hay productos en la tabla.');
    return;
  }

  for (const row of products) {
    const imagenes = row.imagenes ?? [];
    const newImagenes = imagenes.map((img) => {
      if (typeof img !== 'string') return img;
      if (img.startsWith('http')) return img;
      const normalized = img.startsWith('/') ? img : `/${img}`;
      return pathToUrlByOldPath[normalized] ?? pathToUrlByOldPath[img] ?? img;
    });

    const { error: updateError } = await supabase
      .from('products')
      .update({ imagenes: newImagenes })
      .eq('id', row.id);
    if (updateError) {
      console.warn('⚠️ Error actualizando producto', row.id, updateError.message);
    }
  }

  console.log('✅ Listo. Productos actualizados con URLs de Supabase Storage.');
}

main().catch((e) => {
  console.error('💥', e);
  process.exit(1);
});
