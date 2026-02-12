# Cómo subir y gestionar productos en Supabase

> Ver también: [README.md](./README.md) (documentación general) | [EXCEL-Y-IMPORTACION.md](./EXCEL-Y-IMPORTACION.md) (importar desde Excel)

Todo lo que ves en la tienda (productos e imágenes) se gestiona desde **Supabase**. No hace falta tocar código para añadir o editar productos.

---

## 1. Añadir un producto nuevo

### Opción A: Desde el dashboard de Supabase (recomendado)

1. Entra en [Supabase](https://supabase.com) → tu proyecto.
2. Ve a **Table Editor** → tabla **products**.
3. Pulsa **Insert row** (o “Add row”).
4. Rellena las columnas:

   | Columna     | Tipo   | Ejemplo                                      |
   |------------|--------|-----------------------------------------------|
   | **nombre** | text   | `Teclado gamer XYZ`                           |
   | **descripción** | text | Descripción larga del producto (puedes usar saltos de línea) |
   | **tipo**   | int8   | `1` = Teclados, `2` = Mouses, `3` = Monitores, `4` = Audífonos, `5` = Cámaras, `6` = Micrófonos, `7` = Placas base, `8` = Procesadores, `9` = Otros |
   | **precio** | float8 | `29.99`                                       |
   | **descuento** | float8 | `0` o el precio con descuento (ej. `24.99`) |
   | **imagenes** | json  | Ver más abajo                                 |
   | **popular** | bool  | `true` si es “lo más vendido”, si no `false`  |

5. En **imagenes** tienes que poner un **array JSON de URLs**. Ejemplo:

   - Si las imágenes ya están en Supabase Storage:
     ```json
     ["https://tu-proyecto.supabase.co/storage/v1/object/public/product-images/teclados/mi-teclado.png"]
     ```
   - Varias imágenes:
     ```json
     ["https://.../imagen1.png", "https://.../imagen2.png"]
     ```

6. Guarda la fila.

---

## 2. Subir imágenes a Supabase Storage

Las imágenes de productos deben estar en el bucket **product-images** para que la web las muestre.

### Desde el dashboard

1. En Supabase: **Storage** → bucket **product-images**.
2. Puedes crear carpetas (ej. `teclados`, `mouses`) para ordenar.
3. **Upload file** (o arrastrar) y sube tu imagen.
4. Al subir, haz clic en el archivo y copia la **URL pública** (o usa “Get URL” / “Copy URL”).
5. Esa URL es la que pones en la columna **imagenes** del producto (dentro del array JSON).

### Formato de la URL

La URL pública suele ser:

```
https://nxsuivqkojhsqcsgayno.supabase.co/storage/v1/object/public/product-images/teclados/nombre-imagen.png
```

Sustituye `teclados` y `nombre-imagen.png` por la carpeta y el nombre de tu archivo.

---

## 3. Editar o borrar un producto

- **Editar:** Table Editor → tabla **products** → haz clic en la fila → cambia los campos → guarda.
- **Borrar:** En esa misma fila usa la opción de eliminar (icono de papelera o menú de la fila).

Los cambios se ven en la web al recargar (los datos se leen desde Supabase).

---

## 4. Resumen rápido

| Quiero…              | Dónde hacerlo                          |
|----------------------|----------------------------------------|
| Añadir producto      | Table Editor → **products** → Insert row |
| Subir foto de producto | Storage → **product-images** → Upload  |
| Poner la foto en el producto | En la fila del producto, columna **imagenes** (array JSON con la URL pública) |
| Marcar “lo más vendido” | Columna **popular** = `true`           |
| Editar / borrar      | Table Editor → **products** → clic en la fila |

Si un producto no tiene imágenes o la URL falla, la web mostrará una imagen de respaldo (email.png).
