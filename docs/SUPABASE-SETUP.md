# Supabase — Tecnología R

## Estado actual

La org **inngenios** ya tiene **2 proyectos free** activos (límite alcanzado), así que no se pudo crear un proyecto nuevo `tecnologia-r` desde aquí.

Mientras tanto la web usa el **catálogo local**:

- `public/data/products.json` — 25 productos del Excel
- `public/images/products/*.png` — imágenes con fondo transparente

Cuando haya cupo (pausa/borra un proyecto free o sube de plan):

1. Crea un proyecto llamado `tecnologia-r`.
2. En SQL Editor, ejecuta el contenido de:
   `supabase/migrations/20260929084047_products_and_storage.sql`
3. Copia URL + keys a `.env`:

```env
SUPABASE_URL=https://XXXX.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...   # solo scripts, nunca en el front
VITE_SUPABASE_URL=https://XXXX.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...      # anon / publishable
```

4. Sube catálogo + imágenes:

```bash
npm run catalog:push
```

## Pipeline Excel → web (local)

```bash
# 1) Excel → descarga + rembg → data/
npm run catalog:images

# 2) data/ → public/data/products.json + public/images/products/
npm run catalog:build

# o ambos:
npm run catalog:sync
```

Excel esperado: `data-excel.xlsx` o `~/Downloads/Categoria de productos.xlsx`.
