# Tecnologia R - Documentacion del Proyecto

Documentacion completa del proyecto: estructura, configuracion, IDs, rutas y todo lo importante.

---

## Estructura de carpetas

```
Tecnologia-R/
├── docs/                         # Documentacion del proyecto
│   ├── README.md                 # Este archivo (guia general)
│   ├── PRODUCTOS-SUPABASE.md     # Como gestionar productos en Supabase
│   └── EXCEL-Y-IMPORTACION.md    # Como crear Excel e importar productos
│
├── public/                       # Archivos estaticos (accesibles por URL directa)
│   ├── images/
│   │   ├── footer/               # Iconos de redes sociales (facebook, instagram, etc.)
│   │   ├── general/              # Imagenes generales (email.png, reloj.png, telefono.png)
│   │   ├── header/               # Logo de la empresa ("Logo Tecnologia R.png")
│   │   ├── inicio/               # Banners del carousel + iconos SVG de categorias
│   │   ├── marcas/               # Logos de marcas (1.png a 7.png)
│   │   └── nosotros/             # Fotos de la tienda
│   └── lotties/                  # Animaciones Lottie (vacio.json = estado vacio)
│
├── scripts/                      # Scripts de Node.js para administracion
│   ├── migrate-to-supabase.js    # Migrar products.json viejo → Supabase
│   ├── import-products-from-csv.js  # Importar productos desde CSV/Excel
│   └── upload-images-to-supabase.js # Subir imagenes locales a Supabase Storage
│
├── src/                          # Codigo fuente de la aplicacion React
│   ├── components/               # Componentes reutilizables
│   │   ├── buttons/              # Botones (InicioProductButton, SocialButton)
│   │   ├── cards/                # Tarjetas de producto y modal
│   │   ├── collages/             # Collage de imagenes
│   │   ├── formularios/          # Formulario de contacto
│   │   ├── maps/                 # Mapa con Leaflet
│   │   ├── redes/                # Videos de Instagram y YouTube
│   │   └── search/               # Barra de busqueda
│   │
│   ├── constants/                # Constantes y configuracion
│   │   └── productTypes.ts       # IMPORTANTE: IDs de categorias de producto
│   │
│   ├── contexts/                 # Contextos de React (estado global)
│   │   └── ProductsContext.tsx    # Proveedor de productos (carga desde Supabase)
│   │
│   ├── css/                      # Estilos CSS adicionales
│   │   ├── card.css              # Estilos de tarjetas
│   │   └── productosSlider.css   # Estilos del slider
│   │
│   ├── layout/                   # Componentes de estructura/layout
│   │   ├── contacto/             # Secciones de la pagina Contacto
│   │   ├── inicio/               # Secciones de la pagina Inicio
│   │   ├── nosotros/             # Secciones de la pagina Nosotros
│   │   ├── Header.tsx            # Barra superior (logo + tema oscuro/claro)
│   │   ├── Navbar.tsx            # Menu de navegacion + sidebar de categorias
│   │   └── Footer.tsx            # Pie de pagina
│   │
│   ├── lib/                      # Librerias/clientes externos
│   │   └── supabase.ts           # Cliente de Supabase (conexion al backend)
│   │
│   ├── pages/                    # Paginas principales
│   │   ├── Inicio.tsx            # Pagina de inicio
│   │   ├── Productos.tsx         # Listado de productos por categoria
│   │   ├── ProductoDetalle.tsx   # Detalle de un producto individual
│   │   ├── SearchResults.tsx     # Resultados de busqueda
│   │   ├── Contacto.tsx          # Pagina de contacto
│   │   └── Nosotros.tsx          # Pagina "Sobre nosotros"
│   │
│   ├── routes/                   # Configuracion de rutas
│   │   └── Routing.tsx           # Todas las rutas de React Router
│   │
│   ├── types/                    # Tipos de TypeScript
│   │   └── product.ts            # Interface Product (estructura del producto)
│   │
│   ├── utils/                    # Funciones utilitarias
│   │   ├── imageUrl.ts           # Resolver URL de imagenes (Supabase o local)
│   │   └── products.ts           # Funciones para filtrar, buscar y agrupar productos
│   │
│   ├── App.tsx                   # Componente raiz (Header + Routing + Footer)
│   └── main.tsx                  # Punto de entrada de la app
│
├── templates/                    # Plantillas para importacion
│   └── productos-plantilla.csv   # Plantilla CSV de ejemplo para importar productos
│
├── .env                          # Variables de entorno (NO subir al repo)
├── .env.example                  # Ejemplo de variables de entorno
├── package.json                  # Dependencias y scripts npm
├── vite.config.ts                # Configuracion de Vite
├── tailwind.config.js            # Configuracion de Tailwind CSS
└── tsconfig.json                 # Configuracion de TypeScript
```

---

## IDs de categorias de producto

Definidos en **`src/constants/productTypes.ts`**. Este es el archivo central que conecta los numeros con los nombres en toda la app.

| ID | Categoria    | Plural       | Slugs para URL                                       |
|----|-------------|-------------|------------------------------------------------------|
| 1  | Teclado     | Teclados    | `teclados`, `teclado`                                |
| 2  | Mouse       | Mouses      | `mouses`, `mouse`, `ratones`                         |
| 3  | Monitor     | Monitores   | `monitores`, `monitor`                               |
| 4  | Audifono    | Audifonos   | `audifonos`, `audifono`, `audifonos`, `audifono`     |
| 5  | Camara      | Camaras     | `camaras`, `camara`, `camaras`, `camara`             |
| 6  | Microfono   | Microfonos  | `microfonos`, `microfono`, `microfonos`, `microfono` |
| 7  | Placa base  | Placas base | `placas-base`, `placa-base`                          |
| 8  | Procesador  | Procesadores| `procesadores`, `procesador`                         |
| 9  | Otros       | Otros       | (sin slug, es la categoria por defecto)              |

**Donde se usa este ID:**
- En la **columna `tipo`** de la tabla `products` en Supabase
- En la **columna C** del Excel/CSV al importar productos
- En las **URLs** de la web: `/productos/1` = Teclados, `/productos/2` = Mouses, etc.
- En el **Navbar** para el sidebar de categorias
- En las **tarjetas** de producto para mostrar el nombre de la categoria

**Para agregar una nueva categoria:** edita `src/constants/productTypes.ts` y agrega un nuevo objeto al array `PRODUCT_TYPES` con el siguiente `id` disponible.

---

## Agrupacion de categorias en el menu

El **Navbar** (`src/layout/Navbar.tsx`) agrupa las categorias asi:

| Grupo        | Categorias incluidas (IDs) |
|-------------|---------------------------|
| Perifericos | 1 (Teclados), 2 (Mouses), 3 (Monitores), 4 (Audifonos), 5 (Camaras), 6 (Microfonos) |
| Componentes | 7 (Placas base), 8 (Procesadores) |

Si agregas una categoria con ID 10 o mayor, debes agregarla tambien al array `productSections` en el Navbar para que aparezca en el menu.

---

## Estructura de un producto (base de datos)

Tabla **`products`** en Supabase:

| Columna      | Tipo   | Descripcion                                                |
|-------------|--------|------------------------------------------------------------|
| `id`        | int8   | ID unico del producto (auto-generado por Supabase)        |
| `nombre`    | text   | Nombre del producto                                        |
| `descripcion` | text | Descripcion del producto (la columna en BD tiene tilde: `descripción`) |
| `tipo`      | int8   | ID de la categoria (ver tabla de IDs arriba)               |
| `precio`    | float8 | Precio normal                                              |
| `descuento` | float8 | Precio con descuento (0 si no tiene)                       |
| `imagenes`  | json   | Array JSON de URLs de imagenes (ej. `["https://..."]`)     |
| `popular`   | bool   | `true` = aparece como "Lo mas vendido"                     |

**Nota importante:** la columna en la base de datos se llama `descripción` (con tilde), pero en el codigo TypeScript se usa como `descripcion` (sin tilde). La funcion `fetchProducts()` en `src/utils/products.ts` hace el mapeo automaticamente.

---

## Rutas de la aplicacion

Definidas en **`src/routes/Routing.tsx`**:

| URL                   | Pagina            | Descripcion                               |
|-----------------------|-------------------|--------------------------------------------|
| `/`                   | Inicio            | Pagina principal con banner, productos y videos |
| `/productos/:tipo`    | Productos         | Listado de productos (`:tipo` = ID o slug) |
| `/producto/:id`       | ProductoDetalle   | Detalle de un producto individual          |
| `/search?q=...`       | SearchResults     | Resultados de busqueda                     |
| `/contacto`           | Contacto          | Formulario de contacto + mapa              |
| `/nosotros`           | Nosotros          | Informacion de la empresa                  |

**Ejemplos de URLs de productos:**
- `/productos/1` → Teclados (por ID)
- `/productos/teclados` → Teclados (por slug)
- `/productos/mouses` → Mouses (por slug)
- `/producto/15` → Detalle del producto con ID 15

---

## Configuracion de Supabase

### Archivos clave

| Archivo                    | Proposito                                          |
|----------------------------|-----------------------------------------------------|
| `src/lib/supabase.ts`      | Cliente de Supabase para el frontend (anon key)     |
| `.env`                      | Variables de entorno con las credenciales            |
| `.env.example`              | Ejemplo de como debe verse el `.env`                |

### Variables de entorno

```env
# Para los scripts de Node (usan service_role, tiene permisos completos)
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key

# Para el frontend (solo lectura, segura para el navegador)
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu_anon_key
```

**Diferencia clave:**
- `SUPABASE_SERVICE_ROLE_KEY` → Solo en scripts (NUNCA en el frontend). Tiene permisos completos.
- `VITE_SUPABASE_ANON_KEY` → Es la clave publica. Se usa en el frontend. Solo tiene permisos de lectura.

### Storage (imagenes)

- **Bucket:** `product-images` (debe ser publico)
- **Carpetas sugeridas:** `teclados/`, `mouses/`, `monitores/`, `audifonos/`, etc.
- **Formato de URL:** `https://[proyecto].supabase.co/storage/v1/object/public/product-images/[carpeta]/[archivo]`

---

## Scripts de administracion

Todos los scripts estan en la carpeta `scripts/` y se ejecutan desde la terminal.

| Comando                          | Script                           | Que hace                                          |
|----------------------------------|----------------------------------|---------------------------------------------------|
| `npm run import:products -- ruta.csv` | `import-products-from-csv.js`   | Importa productos desde un CSV a Supabase         |
| `npm run upload:images`          | `upload-images-to-supabase.js`   | Sube imagenes locales a Supabase Storage          |
| `npm run migrate:supabase`       | `migrate-to-supabase.js`         | Migra el viejo `products.json` a Supabase         |

**Todos requieren** el archivo `.env` con `SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY`.

---

## Flujo de datos (como llegan los productos a la web)

```
Supabase (tabla products)
       ↓
 src/utils/products.ts → fetchProducts()
       ↓
 src/contexts/ProductsContext.tsx → ProductsProvider
       ↓
 Cualquier componente usa → useProducts()
       ↓
 Se muestran en tarjetas, modales, busqueda, etc.
```

1. Al cargar la app, `ProductsProvider` llama a `fetchProducts()`
2. `fetchProducts()` consulta la tabla `products` en Supabase
3. Los datos se guardan en el Context y quedan disponibles para toda la app
4. Los componentes usan `useProducts()` para acceder a: `products`, `loading`, `error`

---

## Manejo de imagenes

Las imagenes pueden venir de dos fuentes:

1. **Supabase Storage** (preferido): URLs completas tipo `https://...supabase.co/storage/...`
2. **Locales** (legacy): Rutas tipo `/images/teclados/foto.png`

La funcion `getProductImageUrl()` en `src/utils/imageUrl.ts` resuelve automaticamente:
- Si es URL absoluta (http/https) → la devuelve tal cual
- Si es ruta relativa → la combina con `window.location.origin`
- Si no hay imagen → devuelve una imagen de respaldo (`/images/general/email.png`)

---

## Busqueda

La busqueda esta implementada en:

| Archivo                                | Funcion                    |
|----------------------------------------|----------------------------|
| `src/components/search/SearchBar.tsx`  | Componente visual (input + dropdown) |
| `src/utils/products.ts`               | `searchProducts()` logica de filtrado |
| `src/pages/SearchResults.tsx`          | Pagina completa de resultados |

- **Busca en:** nombre, descripcion, y URLs de imagenes del producto
- **Debounce:** 300ms (no busca con cada tecla, espera a que dejes de escribir)
- **Preview:** maximo 6 resultados en el dropdown
- **Enter:** navega a `/search?q=...` con todos los resultados

---

## Tecnologias principales

| Tecnologia        | Version  | Uso                                       |
|-------------------|----------|-------------------------------------------|
| React             | 18.3.1   | Framework frontend                        |
| TypeScript        | 5.6.2    | Tipado estatico                           |
| Vite              | 6.3.5    | Bundler y dev server                      |
| Tailwind CSS      | 3.4.17   | Estilos utilitarios                       |
| Supabase JS       | 2.47.0   | Conexion con la base de datos             |
| React Router DOM  | 7.1.1    | Navegacion entre paginas                  |
| Leaflet           | 1.9.4    | Mapa interactivo en pagina de contacto    |
| AOS               | 2.3.4    | Animaciones al hacer scroll               |
| React Lottie      | 1.2.10   | Animaciones Lottie (estado vacio)         |
| React Icons       | 5.4.0    | Iconos (sol/luna para tema)               |

---

## Comandos utiles para desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev

# Compilar para produccion
npm run build

# Vista previa de la version de produccion
npm run preview

# Verificar errores de ESLint
npm run lint

# Importar productos desde CSV
npm run import:products -- templates/productos-plantilla.csv

# Subir imagenes a Supabase Storage
npm run upload:images
```

---

## Archivos clave (referencia rapida)

| Que necesitas                          | Donde esta                              |
|----------------------------------------|-----------------------------------------|
| Agregar/cambiar categorias de producto | `src/constants/productTypes.ts`         |
| Cambiar como se cargan los productos   | `src/utils/products.ts`                 |
| Cambiar la conexion a Supabase         | `src/lib/supabase.ts`                   |
| Estructura de un producto (tipado)     | `src/types/product.ts`                  |
| Estado global de productos             | `src/contexts/ProductsContext.tsx`       |
| Rutas de la app                        | `src/routes/Routing.tsx`                |
| Menu de navegacion                     | `src/layout/Navbar.tsx`                 |
| Tarjeta de producto                    | `src/components/cards/ProductInicioCard.tsx` |
| Modal de producto                      | `src/components/cards/ProductInicioCardModal.tsx` |
| Barra de busqueda                      | `src/components/search/SearchBar.tsx`   |
| Variables de entorno                   | `.env` (ver `.env.example`)             |
| Plantilla para importar productos      | `templates/productos-plantilla.csv`     |
