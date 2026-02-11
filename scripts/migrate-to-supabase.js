import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Credenciales desde variables de entorno (no subir .env al repo)
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Faltan credenciales. Crea un archivo .env con:');
  console.error('   SUPABASE_URL=tu_url');
  console.error('   SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key');
  console.error('   Luego ejecuta: node --env-file=.env scripts/migrate-to-supabase.js');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const productsPath = path.join(__dirname, '../public/data/products.json');

async function migrate() {
  console.log('🚀 Iniciando migración...');
  
  try {
    // Leer JSON
    const rawData = fs.readFileSync(productsPath, 'utf8');
    const products = JSON.parse(rawData);
    
    console.log(`📦 Encontrados ${products.length} productos`);
    
    // Preparar datos para Supabase (la columna en la tabla se llama "descripción" con tilde)
    const productsToInsert = products.map(product => ({
      nombre: product.nombre,
      descripción: product.descripcion,
      tipo: product.tipo,
      precio: product.precio,
      descuento: product.descuento || 0,
      imagenes: product.imagenes,
      popular: product.popular || false
    }));
    
    // Insertar en Supabase
    const { data, error } = await supabase
      .from('products')
      .insert(productsToInsert)
      .select();
    
    if (error) {
      console.error('❌ Error:', error.message);
      return;
    }
    
    console.log(`✅ ¡Éxito! ${data.length} productos migrados`);
    console.log('Primer producto:', data[0].nombre);
    
  } catch (err) {
    console.error('💥 Error:', err.message);
  }
}

migrate();