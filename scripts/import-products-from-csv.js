/**
 * Importa productos desde un CSV a Supabase.
 * Las imágenes no van en el CSV; se agregan después en Supabase (Table Editor → products → columna imagenes).
 *
 * Formato del CSV (separado por TAB), 6 columnas:
 *   nombre | descripcion | tipo | precio | descuento | popular
 *
 * Uso: node --env-file=.env scripts/import-products-from-csv.js [ruta-al-archivo.csv]
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Faltan SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en .env');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const defaultPath = path.join(__dirname, '../templates/productos.csv');

function parseCsv(content) {
  const lines = content.split(/\r?\n/).filter((line) => line.trim());
  if (lines.length < 2) return [];
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split('\t');
    if (cols.length < 6) continue;
    const [nombre, descripcion, tipo, precio, descuento, popularStr] = cols;
    const tipoNum = parseInt(tipo, 10) || 1;
    const precioNum = parseFloat(precio) || 0;
    const descuentoNum = parseFloat(descuento) || 0;
    const popular = /^(true|1|si|sí|yes)$/i.test((popularStr || '').trim());
    rows.push({
      nombre: (nombre || '').trim(),
      descripción: (descripcion || '').trim(),
      tipo: tipoNum,
      precio: precioNum,
      descuento: descuentoNum,
      imagenes: [], // Las URLs se agregan después en Supabase
      popular
    });
  }
  return rows;
}

async function main() {
  const csvPath = process.argv[2] || defaultPath;
  const resolved = path.isAbsolute(csvPath) ? csvPath : path.join(process.cwd(), csvPath);

  if (!fs.existsSync(resolved)) {
    console.error('❌ No se encuentra el archivo:', resolved);
    console.error('   Uso: node --env-file=.env scripts/import-products-from-csv.js [ruta.csv]');
    process.exit(1);
  }

  const content = fs.readFileSync(resolved, 'utf8').replace(/^\uFEFF/, '');
  const products = parseCsv(content);

  if (!products.length) {
    console.log('⚠️ No hay filas de productos en el CSV (primera línea = cabecera).');
    return;
  }

  console.log('🚀 Importando', products.length, 'producto(s) desde', path.basename(resolved), '...\n');

  const { data, error } = await supabase.from('products').insert(products).select();

  if (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }

  console.log('✅ Importados', data.length, 'productos.');
  data.forEach((p, i) => console.log('  ', i + 1, p.nombre));
}

main().catch((e) => {
  console.error('💥', e);
  process.exit(1);
});
