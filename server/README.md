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
GET  /api/health
```

JWT disimpan di httpOnly cookie, bukan localStorage.

## Struktur

```text
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
