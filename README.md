# NusaFlow Landing Page

Landing page React + Vite untuk belajar memakai shadcn/ui dengan style reference `design.md`: light, monochrome, compact, dan berbasis komponen UI.

## Menjalankan Project

Install dependency:

```bash
npm install
```

Jalankan development server:

```bash
npm run dev
```

Build production:

```bash
npm run build
```

Preview hasil build:

```bash
npm run preview
```

## Menjalankan Backend Auth

Backend ada di folder `server/` dan memakai NestJS + Prisma + PostgreSQL.

Install dependency backend:

```bash
cd server
npm install
```

Buat environment file:

```bash
copy .env.example .env
```

Isi minimal:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/nusaflow?schema=public"
JWT_SECRET="replace-with-a-long-random-secret"
CLIENT_ORIGIN="http://127.0.0.1:5173"
```

Generate Prisma client:

```bash
npm run prisma:generate
```

Jalankan migration:

```bash
npm run prisma:migrate
```

Jalankan backend:

```bash
npm run dev
```

Saat frontend dijalankan dengan `npm run dev`, Vite mem-proxy request `/api` ke `http://127.0.0.1:4000`. Login dan register page sudah memakai endpoint backend ini melalui `src/lib/auth-api.ts`.

Dari root project, script shortcut juga tersedia:

```bash
npm run server:dev
npm run server:build
npm run server:prisma:generate
npm run server:prisma:migrate
```

Endpoint auth:

```text
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
GET  /api/health
```

Auth menggunakan JWT di httpOnly cookie, bukan localStorage.

Endpoint admin:

```text
GET    /api/admin/overview
GET    /api/admin/products
POST   /api/admin/products
PATCH  /api/admin/products/:id
DELETE /api/admin/products/:id
POST   /api/admin/products/:id/images
DELETE /api/admin/products/:productId/images/:imageId
GET    /api/products
```

Endpoint admin diproteksi JWT cookie dan role `ADMIN`.

## Role User Dan Admin

Role yang dipakai:

```text
ADMIN  Akses CMS admin di /admin
USER   Akses dashboard user di /app
```

Register dari website selalu membuat akun `USER`. Untuk menjadikan akun sebagai admin saat development, jalankan PostgreSQL/Prisma migration dulu:

```bash
cd server
npm run prisma:migrate
```

Lalu promote salah satu email lewat `psql`:

```bash
docker exec -it nusaflow-postgres psql -U postgres -d nusaflow
```

```sql
UPDATE "User" SET "role" = 'ADMIN' WHERE "email" = 'email-kamu@example.com';
SELECT id, email, name, role FROM "User";
```

Setelah login ulang, akun `ADMIN` akan diarahkan ke `/admin`, sedangkan akun `USER` diarahkan ke `/app`.

## CMS Produk

Admin bisa mengelola produk dari halaman:

```text
/admin
```

Fitur yang tersedia:

- Create produk
- Edit produk
- Upload gambar produk saat create/edit
- Hapus gambar produk
- Publish/unpublish produk
- Delete produk
- Melihat daftar produk CMS

Produk dengan status `published` akan tampil otomatis sebagai card bergambar di halaman:

```text
/product
/app
```

Setelah update schema, jalankan migration:

```bash
cd server
npm run prisma:migrate
```

Jika Prisma Client terkunci karena backend dev server sedang berjalan, hentikan backend dengan `Ctrl+C`, lalu jalankan:

```bash
npm run prisma:generate
npm run dev
```

File upload development disimpan di:

```text
server/uploads/products
```

Folder ini masuk `.gitignore` karena berisi data runtime, bukan source code.

## ShadCN Di Project Ini

shadcn/ui sudah dipasang lewat CLI lokal:

```bash
npm run ui -- info
```

Script yang tersedia:

```bash
npm run ui -- info
npm run ui:add -- button
npm run ui:add -- dialog
```

Catatan penting: shadcn/ui bukan library runtime seperti Bootstrap atau Material UI. CLI shadcn digunakan untuk menyalin komponen ke project, lalu komponennya menjadi milik codebase kita dan bisa diedit langsung.

Struktur penting:

```text
components.json          Konfigurasi shadcn
src/components/ui        Komponen shadcn/ui lokal
src/lib/utils.ts         Helper cn() untuk className
src/index.css            Theme token dan Tailwind v4 tokens
src/App.tsx              Router provider
src/routes.tsx           Route definitions dengan React Router
src/data/site.ts         Data konten terpusat
src/layouts              Layout reusable
src/pages                Halaman route
src/components/marketing Komponen section/layout marketing
public/nusaflow-logo.png Logo yang dipakai navbar dan footer
```

Komponen shadcn yang dipakai:

- `Button`
- `Card`
- `Badge`
- `Accordion`
- `Dialog`
- `Sheet`
- `DropdownMenu`
- `Tabs`
- `Input`
- `Label`
- `Checkbox`
- `Switch`
- `Avatar`
- `Progress`
- `Separator`

## Halaman Yang Tersedia

Project ini tidak lagi hanya single page. Routing memakai `react-router-dom` agar struktur lebih rapi dan siap dikembangkan.

Halaman:

```text
/           Landing page
/product    Product overview
/pricing    Pricing page
/customers  Customer/use case page
/contact    Contact page
/app        User dashboard
/admin      Admin CMS dashboard
/login      Login page
/register   Register page
```

Route definitions ada di:

```text
src/routes.tsx
```

Catatan deployment: karena ini SPA dengan Browser Router, hosting production perlu fallback semua route ke `index.html`. Di Vite dev server ini sudah otomatis.

Layout umum marketing ada di:

```text
src/layouts/marketing-layout.tsx
```

## Struktur Best Practice

Project sudah dipisah berdasarkan tanggung jawab:

```text
src/
  App.tsx
  routes.tsx
  data/
    site.ts
  layouts/
    marketing-layout.tsx
    page-frame.tsx
  pages/
    home.tsx
    product.tsx
    pricing.tsx
    customers.tsx
    contact.tsx
    auth.tsx
  components/
    marketing/
    ui/
  lib/
    utils.ts
```

Backend:

```text
server/
  prisma/
    schema.prisma
  src/
    auth/
      decorators/
      dto/
      guards/
      strategies/
      types/
    common/
      filters/
    config/
    health/
    prisma/
    products/
    users/
```

Prinsip yang dipakai:

- `src/components/ui`: hanya komponen shadcn dasar.
- `src/components/marketing`: komponen reusable milik website.
- `src/pages`: satu file per halaman route.
- `src/layouts`: shell/layout yang dipakai banyak halaman.
- `src/data/site.ts`: konten/data statis agar tidak tersebar di banyak komponen.
- `src/routes.tsx`: konfigurasi routing terpusat.
- `server/src/auth`: register, login, logout, me, JWT cookie guard.
- `server/src/products`: CRUD produk untuk CMS admin dan endpoint published untuk frontend.
- `server/src/users`: akses data user dan presenter agar password hash tidak pernah keluar.
- `server/src/prisma`: Prisma client lifecycle untuk NestJS.

## Audit Dependency

Verifikasi high severity:

```bash
npm audit --audit-level=high
```

Project memakai `react-router-dom@6.30.4` secara pinned. Versi ini dipilih untuk menghindari advisory high dari React Router v7/RSC mode. Saat ini npm masih melaporkan advisory moderate dari package React Router tanpa fix tersedia; project ini tidak memakai SSR hydration dan semua link/navigasi dibuat statis internal.

## Cara Menambah Komponen ShadCN

Gunakan script ini:

```bash
npm run ui:add -- nama-komponen
```

Contoh:

```bash
npm run ui:add -- table
npm run ui:add -- command
npm run ui:add -- textarea
```

Setelah komponen ditambahkan, cek file baru di:

```text
src/components/ui
```

Jika komponen baru belum mengikuti `design.md`, sesuaikan class-nya agar memakai token yang sudah disediakan di `src/index.css`.

## Penerapan Design.md

Style yang dipakai: **clinical blueprint on frosted paper**.

Prinsip utama:

- Theme light.
- Hampir seluruh UI monochrome.
- Tidak memakai gradient, brand color dekoratif, atau hero photography.
- Visual utama dibangun dari komponen UI: card, stat block, tab, progress, form, dan table-like list.
- Red hanya digunakan untuk destructive action.

## Color Palette

Token utama ada di `src/index.css`.

| Token | Value | Penggunaan |
|---|---:|---|
| `--color-canvas` | `#f5f5f5` | Background halaman, secondary surface, input fill |
| `--color-paper` | `#ffffff` | Card, popover, modal |
| `--color-surface-alt` | `#fafafa` | Sidebar dan section alternatif |
| `--color-ink` | `#0a0a0a` | Heading, primary text, primary button |
| `--color-ink-soft` | `#171717` | Filled badge/button hover |
| `--color-mid-gray` | `#737373` | Muted text, helper text, placeholder |
| `--color-hairline` | `#e5e5e5` | Border, card edge, input focus |
| `--color-ember` | `#e7000b` | Destructive action saja |

Jangan menambahkan aksen warna lain kecuali benar-benar diperlukan untuk error/destructive state.

## Typography

Font utama:

```css
--font-geist: "Geist", Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
```

Project memakai fallback `Inter/system-ui` jika Geist belum tersedia. Semua interface text menggunakan font ini.

Type scale dari `design.md`:

| Role | Size | Line Height | Letter Spacing |
|---|---:|---:|---:|
| Caption | 12px | 1.33 | 0.6px |
| Body | 14px | 1.43 | normal |
| Body Large | 16px | 1.5 | normal |
| Subheading | 18px | 1.56 | normal |
| Heading Small | 24px | 1.33 | -0.6px |
| Heading | 30px | 1.2 | -0.75px |
| Heading Large | 36px | 1.11 | -0.9px |
| Display | 48px | 1.1 | -2.4px |

## Radius Dan Shape

Panduan radius:

- Card/container: `24px`
- Button/input/badge/switch-like controls: `18px`
- Nested surface: `10px`
- Small controls: `6px`

Komponen dasar sudah diubah agar mengikuti radius ini:

- `src/components/ui/button.tsx`
- `src/components/ui/card.tsx`
- `src/components/ui/badge.tsx`
- `src/components/ui/input.tsx`
- `src/components/ui/tabs.tsx`
- `src/components/ui/dialog.tsx`
- `src/components/ui/sheet.tsx`

## Elevation

Card memakai shadow halus dari `design.md`:

```css
--shadow-subtle:
  oklab(0.145 -0.00000143796 0.00000340492 / 0.05) 0px 0px 0px 1px,
  rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
  rgba(0, 0, 0, 0.1) 0px 1px 2px -1px;
```

Gunakan `shadow-subtle` untuk card/panel. Hindari colored shadow.

## Logo

Logo navbar dan footer memakai:

```text
public/nusaflow-logo.png
```

File asli upload `NusaFlow-Logo.png` di-root project di-ignore agar tidak ikut push sebagai duplikat.

## Git Ignore

File `.gitignore` ikut di-push agar aturan ignore konsisten di semua environment.

Isi ignore yang dipakai:

```text
node_modules/
server/node_modules/
dist/
server/dist/
build/
coverage/
.env
.env.*
!.env.example
server/.env
server/.env.*
!server/.env.example
*.local
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
*.log
.vite/
.cache/
*.tsbuildinfo
.DS_Store
Thumbs.db
.idea/
.vscode/*
!.vscode/extensions.json
!.vscode/settings.json
/NusaFlow-Logo.png
public/nusaflow-hero.png
```

Yang sebaiknya di-push:

- `src/`
- `public/nusaflow-logo.png`
- `server/src/`
- `server/prisma/schema.prisma`
- `server/prisma/migrations/`
- `server/package.json`
- `server/package-lock.json`
- `server/.env.example`
- `components.json`
- `package.json`
- `package-lock.json`
- `vite.config.ts`
- `tsconfig*.json`
- `index.html`
- `README.md`
