import { PrismaClient, UserRole } from "@prisma/client";
import * as argon2 from "argon2";

const prisma = new PrismaClient();

const seedUsers = [
  {
    email: "admin@nusaflow.test",
    name: "NusaFlow Admin",
    role: UserRole.ADMIN,
    password: "Admin12345",
  },
  {
    email: "ops@nusaflow.test",
    name: "Ops Manager",
    role: UserRole.USER,
    password: "User12345",
  },
  {
    email: "finance@nusaflow.test",
    name: "Finance Lead",
    role: UserRole.USER,
    password: "User12345",
  },
  {
    email: "warehouse@nusaflow.test",
    name: "Warehouse Staff",
    role: UserRole.USER,
    password: "User12345",
  },
];

const seedProducts = [
  {
    title: "Workflow Control",
    slug: "workflow-control",
    category: "Automation",
    description:
      "Kelola approval, follow-up, dan handoff pekerjaan harian dalam satu workflow yang bisa dipantau admin.",
    priceLabel: "Rp799rb/mo",
    isPublished: true,
  },
  {
    title: "Invoice Monitor",
    slug: "invoice-monitor",
    category: "Finance",
    description:
      "Pantau invoice jatuh tempo, pembayaran masuk, dan cash-in harian tanpa membuka spreadsheet terpisah.",
    priceLabel: "Rp499rb/mo",
    isPublished: true,
  },
  {
    title: "Inventory Signal",
    slug: "inventory-signal",
    category: "Operations",
    description:
      "Lihat stok kritis, retur terbuka, dan pengiriman yang perlu ditindaklanjuti oleh tim operasional.",
    priceLabel: "Rp399rb/mo",
    isPublished: true,
  },
  {
    title: "Customer Inbox",
    slug: "customer-inbox",
    category: "Support",
    description:
      "Satukan pesan pelanggan, status order, dan reminder follow-up dalam workspace yang ringkas.",
    priceLabel: "Draft",
    isPublished: false,
  },
];

async function main() {
  for (const user of seedUsers) {
    const passwordHash = await argon2.hash(user.password);

    await prisma.user.upsert({
      where: { email: user.email },
      update: {
        name: user.name,
        role: user.role,
      },
      create: {
        email: user.email,
        name: user.name,
        role: user.role,
        passwordHash,
      },
    });
  }

  for (const product of seedProducts) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        title: product.title,
        category: product.category,
        description: product.description,
        priceLabel: product.priceLabel,
        isPublished: product.isPublished,
      },
      create: product,
    });
  }

  const [usersCount, productsCount] = await Promise.all([
    prisma.user.count(),
    prisma.product.count(),
  ]);

  console.log(`Seed complete: ${usersCount} users, ${productsCount} products.`);
  console.log("Admin login: admin@nusaflow.test / Admin12345");
  console.log("User login: ops@nusaflow.test / User12345");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
