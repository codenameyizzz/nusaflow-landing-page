# NusaFlow Landing Page & CMS Platform

NusaFlow adalah platform web modern berbasis React dan NestJS yang menyediakan halaman pemasaran interaktif serta sistem manajemen konten (CMS) produk terintegrasi. Platform ini menggunakan arsitektur modular yang skalabel dengan sistem autentikasi berbasis role dan cookie aman.

## Tech Stack

### Backend Framework (Utama: NestJS)
Backend NusaFlow dibangun secara khusus menggunakan **NestJS**, framework Progressive Node.js berbasis TypeScript yang memprioritaskan arsitektur modular dan enterprise-grade:

- **Framework**: NestJS (TypeScript)
- **Database & ORM**: PostgreSQL dengan Prisma ORM
- **Autentikasi & Keamanan**:
  - NestJS Passport & JWT Strategy
  - Secure HttpOnly & SameSite Cookies
  - Password hashing berbasis Argon2
  - NestJS Throttler untuk proteksi rate limiting
  - Helmet untuk keamanan HTTP header
- **Validasi Data**: Class Validator & Class Transformer DTO
- **Media Upload**: Express Multer dengan file filter dan limit terkonfigurasi

### Frontend Framework & Design System
- **Core**: React 19, TypeScript, Vite
- **Routing**: React Router DOM (Single Page Application dengan struktur route terpisah)
- **UI & Styling**: Tailwind CSS v4, shadcn/ui (Radix UI primitives), Lucide React
- **Design System**: Monochrome clinical blueprint dengan token CSS kustom

## Fitur Utama

- **Autentikasi Terproteksi**: Login, Register, Logout, dan Check Session menggunakan JWT HttpOnly Cookie.
- **Sistem Role (RBAC)**: Pembagian akses antara `ADMIN` (CMS management) dan `USER` (dashboard aplikasi).
- **CMS Manajemen Produk**: Admin dapat menambah, mengubah, mengunggah gambar, mempublikasikan, dan menghapus produk.
- **Manajemen Pengguna**: Admin dapat mengelola akun pengguna, mengubah role (promote/demote), dan menghapus pengguna dengan guard proteksi admin terakhir.
- **Katalog Produk**: Integrasi real-time antara publikasi CMS dan visualisasi katalog produk di frontend.

## Panduan Memulai

### Prasyarat
- Node.js (v18+)
- PostgreSQL database (lokal atau via Docker)

### 1. Setup Backend (NestJS)

Masuk ke direktori backend:

```bash
cd server
```

Install dependency:

```bash
npm install
```

Salin file konfigurasi lingkungan:

```bash
copy .env.example .env
```

Atur konfigurasi pada file `.env`:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/nusaflow?schema=public"
JWT_SECRET="ganti-dengan-secret-jwt-yang-aman"
CLIENT_ORIGIN="http://127.0.0.1:5173"
```

Jalankan Prisma Migration dan Seed Data:

```bash
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

Jalankan NestJS dev server:

```bash
npm run dev
```

Server backend akan berjalan di `http://127.0.0.1:4000`.

### 2. Setup Frontend (React + Vite)

Dari root proyek:

Install dependency:

```bash
npm install
```

Jalankan development server:

```bash
npm run dev
```

Aplikasi frontend dapat diakses melalui `http://127.0.0.1:5173`.

### Shortcut Script Root

- `npm run server:dev`: Jalankan backend dev server
- `npm run server:build`: Build produksi backend
- `npm run server:prisma:generate`: Generate Prisma Client
- `npm run server:prisma:migrate`: Jalankan migrasi skema database

### Akun Kredensial Awal (Seed Data)

- **Admin**: `admin@nusaflow.test` / `Admin12345`
- **User**: `ops@nusaflow.test` / `User12345`

## Ringkasan API Endpoint (NestJS)

| Method | Endpoint | Deskripsi | Akses |
| --- | --- | --- | --- |
| `POST` | `/api/auth/register` | Pendaftaran akun baru | Publik |
| `POST` | `/api/auth/login` | Autentikasi user & set JWT Cookie | Publik |
| `POST` | `/api/auth/logout` | Clear JWT Cookie | Terautentikasi |
| `GET` | `/api/auth/me` | Ambil profil user saat ini | Terautentikasi |
| `GET` | `/api/products` | Ambil daftar produk published | Publik |
| `GET` | `/api/products/:slug` | Detail produk published | Publik |
| `GET` | `/api/admin/overview` | Ringkasan statistik CMS | Admin |
| `GET` | `/api/admin/users` | Manajemen daftar user | Admin |
| `PATCH` | `/api/admin/users/:id/role` | Ubah role user (ADMIN/USER) | Admin |
| `DELETE` | `/api/admin/users/:id` | Hapus akun user | Admin |
| `GET` | `/api/admin/products` | Manajemen daftar produk CMS | Admin |
| `POST` | `/api/admin/products` | Buat produk baru | Admin |
| `PATCH` | `/api/admin/products/:id` | Update data produk | Admin |
| `DELETE` | `/api/admin/products/:id` | Hapus produk | Admin |
| `POST` | `/api/admin/products/:id/images` | Unggah gambar produk | Admin |
| `DELETE` | `/api/admin/products/:productId/images/:imageId` | Hapus gambar produk | Admin |

## Rencana Pengembangan Selanjutnya

1. **Penyimpanan Media Awan (Cloud Storage)**
   Menggantikan penyimpanan gambar lokal dengan integrasi layanan cloud seperti AWS S3 atau Cloudinary untuk skala produksi.

2. **Autentikasi Lanjutan & OAuth2**
   Menambahkan dukungan Refresh Token, pemulihan kata sandi (forgot password via email), serta integrasi OAuth2 (Google / GitHub Single Sign-On).

3. **Log Aktivitas & Audit Trail CMS**
   Mengimplementasikan pencatatan otomatis aktivitas admin (audit log) pada backend NestJS untuk melacak perubahan pada produk dan akun pengguna.

4. **Pengujian Terautomasi (Automated Testing)**
   Menambahkan pengujian unit (Unit Test) dan pengujian E2E (End-to-End Test) pada backend NestJS menggunakan `@nestjs/testing` / Jest, serta Playwright/Vitest pada frontend.

5. **Kontenerisasi & Pipeline CI/CD**
   Menyediakan konfigurasi `docker-compose.yml` multi-stage build untuk produksi dan otomatisasi pipeline pengujian serta deployment melalui GitHub Actions.

