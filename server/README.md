# NusaFlow Backend

Backend auth untuk NusaFlow memakai NestJS, Prisma, PostgreSQL, JWT httpOnly cookie, dan argon2.

## Setup

```bash
cd server
npm install
copy .env.example .env
npm run prisma:generate
npm run prisma:migrate
npm run dev
```

API berjalan di:

```text
http://localhost:4000
```

Frontend Vite akan mem-proxy request `/api` ke backend ini saat development.

## Auth Endpoints

```text
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
GET  /api/admin/overview
GET  /api/admin/products
POST /api/admin/products
PATCH /api/admin/products/:id
DELETE /api/admin/products/:id
GET  /api/products
GET  /api/health
```

JWT disimpan di httpOnly cookie, bukan localStorage.

## Roles

Role tersedia:

```text
ADMIN
USER
```

Register selalu membuat akun `USER`. Untuk development, promote akun menjadi admin lewat database:

```sql
UPDATE "User" SET "role" = 'ADMIN' WHERE "email" = 'email-kamu@example.com';
```

Route `/api/admin/*` diproteksi dengan `JwtAuthGuard` dan `RolesGuard`.

## Product CMS

Model `Product` dikelola admin dari `/api/admin/products`. Produk yang `isPublished = true` bisa dibaca frontend lewat `/api/products` dan ditampilkan di halaman `/product`.

Setelah schema berubah, jalankan:

```bash
npm run prisma:migrate
npm run prisma:generate
```

## Struktur

```text
src/
  admin/
  auth/
    decorators/
    dto/
    guards/
    strategies/
    types/
  common/
    filters/
  config/
  products/
  prisma/
  users/
```

## Security Baseline

- Password di-hash dengan `argon2`.
- JWT dikirim via httpOnly cookie.
- Validation global aktif dengan whitelist DTO.
- Helmet aktif.
- CORS hanya untuk `CLIENT_ORIGIN`.
- Rate limit dasar aktif lewat `@nestjs/throttler`.
