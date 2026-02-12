# Cómo organizar el Excel e importar productos

> Ver también: [README.md](./README.md) (documentación general) | [PRODUCTOS-SUPABASE.md](./PRODUCTOS-SUPABASE.md) (gestionar productos en Supabase)

Tú creas el Excel desde cero. Solo subes los datos de los productos; **las URLs de las imágenes las agregas después en Supabase**.

---

## 1. Cómo organizar el Excel (crearlo tú misma)

### Paso 1 – Abre Excel (o Google Sheets)

Crea un libro nuevo.

### Paso 2 – Primera fila: cabecera (títulos de columna)

En la **primera fila** escribe exactamente estos nombres, **una palabra por celda**, en este orden:

| A        | B            | C     | D      | E          | F        |
|----------|--------------|-------|--------|------------|----------|
| nombre   | descripcion  | tipo  | precio | descuento  | popular  |

No uses la columna **imagenes**. Esa parte la haces después en Supabase.

### Paso 3 – De la fila 2 en adelante: un producto por fila

Cada **fila** es un producto. Rellena así:

| Columna      | Qué poner |
|-------------|-----------|
| **A – nombre** | Nombre del producto (ej. Teclado gamer Havit KB877L). |
| **B – descripcion** | Descripción del producto. Puedes usar puntos, comas y saltos de línea. **No uses la tecla Tab** dentro de esta celda. |
| **C – tipo** | Un número según la categoría (ver tabla abajo). |
| **D – precio** | Precio normal, con decimales (ej. 29.99). |
| **E – descuento** | Precio con descuento. Si no hay descuento, escribe **0**. |
| **F – popular** | Escribe **true** si es “lo más vendido”, o **false** si no. |

### Códigos para la columna **tipo** (columna C)

| Número | Categoría   |
|--------|-------------|
| 1      | Teclados    |
| 2      | Mouses      |
| 3      | Monitores   |
| 4      | Audífonos   |
| 5      | Cámaras     |
| 6      | Micrófonos  |
| 7      | Placas base |
| 8      | Procesadores|
| 9      | Otros       |

**Para cambiar o añadir categorías:** edita el archivo **`src/constants/productTypes.ts`** en el proyecto. Ahí están definidos el número, el nombre (label) y los slugs de la URL; el Excel y el menú de la web usan esa misma configuración.

### Ejemplo de cómo se ve

| nombre              | descripcion                    | tipo | precio | descuento | popular |
|---------------------|--------------------------------|------|--------|-----------|---------|
| Teclado gamer XYZ   | Teclado mecánico. USB. RGB.   | 1    | 29.99  | 0         | false   |
| Mouse inalámbrico   | Ergonómico. 3 botones.        | 2    | 19.50  | 15.00     | false   |

---

## 2. Guardar para poder importar

1. **Archivo → Guardar como**.
2. Elige la carpeta donde quieras (por ejemplo la del proyecto, dentro de `templates/`).
3. En **Tipo** selecciona uno de estos:
   - **Texto (separado por tabulaciones) (.txt)**  
   - o **CSV UTF-8 (delimitado por tabulaciones)** si lo tienes.
4. Nombre del archivo, por ejemplo: `productos.csv` o `productos.txt`.
5. Guardar.

Importante: que el archivo quede **separado por tabulaciones (TAB)** y en **UTF-8** si la opción lo permite, para que las tildes y la ñ se vean bien.

---

## 3. Importar el archivo a Supabase

1. Abre la terminal en la raíz del proyecto.
2. Ejecuta (cambia el nombre del archivo si es otro):

```bash
npm run import:products -- ruta/a/tu-archivo.csv
```

Ejemplo si guardaste el archivo en `templates/productos.csv`:

```bash
npm run import:products -- templates/productos.csv
```

Si todo va bien, verás algo como: **Importados X productos.** Esos productos ya estarán en la tabla **products** de Supabase, **sin imágenes** todavía.

---

## 4. Agregar las URLs de las imágenes en Supabase (después)

Las imágenes no van en el Excel. Las agregas **después** en Supabase.

### 4.1 – Subir las fotos a Storage

1. En Supabase: **Storage** → bucket **product-images**.
2. (Opcional) Crea carpetas: `teclados`, `mouses`, etc.
3. **Upload** y sube las imágenes de cada producto.
4. Haz clic en cada archivo y **copia la URL pública** (suele verse como “Get URL” o “Copy URL”).

### 4.2 – Poner la URL en cada producto

1. En Supabase: **Table Editor** → tabla **products**.
2. Localiza el producto al que quieres añadir imagen.
3. Haz clic en la celda de la columna **imagenes**.
4. Pega la URL. Si quieres **varias imágenes**, escribe un array JSON en esa celda, por ejemplo:  
   `["https://.../foto1.png", "https://.../foto2.png"]`  
   Una sola imagen: `["https://.../foto.png"]`
5. Guarda la fila.

Repite para cada producto. Cuando guardes, la web mostrará las imágenes al recargar.

---

## 5. Resumen del flujo

1. **Excel:** lo creas tú con 6 columnas (nombre, descripcion, tipo, precio, descuento, popular). Una fila por producto. Sin columna de imágenes.
2. **Guardar:** como CSV o texto separado por **tabulaciones**, UTF-8.
3. **Importar:** `npm run import:products -- ruta/a/tu-archivo.csv`.
4. **Imágenes:** en Supabase → Storage subes las fotos y copias las URLs → en Table Editor → **products** pegas cada URL (o varias) en la columna **imagenes** del producto que toque.

Así organizas el Excel tú misma y las URLs solo las agregas en Supabase después de subir los productos.
