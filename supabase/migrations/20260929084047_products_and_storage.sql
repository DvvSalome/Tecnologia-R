-- Tecnología R: catálogo de productos + storage público
-- Aplicar en un proyecto Supabase nuevo (SQL Editor o `supabase db push`).

create table if not exists public.products (
  id bigint generated always as identity primary key,
  nombre text not null,
  "descripción" text not null default '',
  tipo bigint not null default 9,
  precio double precision not null default 0,
  descuento double precision not null default 0,
  imagenes jsonb not null default '[]'::jsonb,
  popular boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists products_tipo_idx on public.products (tipo);
create index if not exists products_popular_idx on public.products (popular);

alter table public.products enable row level security;

drop policy if exists "products_public_read" on public.products;
create policy "products_public_read"
  on public.products
  for select
  to anon, authenticated
  using (true);

-- Escritura solo con service_role (bypass RLS). Sin policies de insert/update/delete para anon.

grant select on table public.products to anon, authenticated;
grant all on table public.products to service_role;

-- Bucket público para imágenes de producto
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'product-images',
  'product-images',
  true,
  10485760,
  array['image/png', 'image/jpeg', 'image/webp', 'image/avif', 'image/gif']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "product_images_public_read" on storage.objects;
create policy "product_images_public_read"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'product-images');

drop policy if exists "product_images_service_insert" on storage.objects;
create policy "product_images_service_insert"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'product-images');

drop policy if exists "product_images_service_update" on storage.objects;
create policy "product_images_service_update"
  on storage.objects
  for update
  to authenticated
  using (bucket_id = 'product-images')
  with check (bucket_id = 'product-images');
