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
src/App.tsx              Routing ringan, landing page, halaman produk, pricing, customers, contact, login, register
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

Project ini tidak lagi hanya single page. Routing dibuat ringan berdasarkan `window.location.pathname`, tanpa React Router, supaya tetap mudah dipelajari.

Halaman:

```text
/           Landing page
/product    Product overview
/pricing    Pricing page
/customers  Customer/use case page
/contact    Contact page
/login      Login page
/register   Register page
```

Jika nanti project berkembang menjadi aplikasi besar, routing bisa dipindah ke React Router atau Next.js App Router. Untuk demo landing page ini, path routing sederhana sudah cukup.

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

## Local Ignore

File `.gitignore` dipakai lokal saja dan tidak perlu ikut di-push. Agar Git lokal juga mengabaikan `.gitignore`, project ini memakai `.git/info/exclude`.

Isi ignore lokal yang disarankan:

```text
node_modules
dist
.env
.env.local
*.local
NusaFlow-Logo.png
public/nusaflow-hero.png
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
```

Yang sebaiknya di-push:

- `src/`
- `public/nusaflow-logo.png`
- `components.json`
- `package.json`
- `package-lock.json`
- `vite.config.ts`
- `tsconfig*.json`
- `index.html`
- `README.md`
