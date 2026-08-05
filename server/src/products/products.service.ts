import { Injectable, NotFoundException } from "@nestjs/common";
import type { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import type { CreateProductDto } from "./dto/create-product.dto";
import type { UpdateProductDto } from "./dto/update-product.dto";

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  findPublished() {
    return this.prisma.product.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: "desc" },
    });
  }

  findAllForAdmin() {
    return this.prisma.product.findMany({
      orderBy: { updatedAt: "desc" },
    });
  }

  async create(dto: CreateProductDto) {
    const slug = await this.createUniqueSlug(dto.title);

    return this.prisma.product.create({
      data: {
        ...dto,
        slug,
        isPublished: dto.isPublished ?? false,
      },
    });
  }

  async update(id: string, dto: UpdateProductDto) {
    await this.ensureExists(id);

    const data: Prisma.ProductUpdateInput = {
      ...dto,
    };

    if (dto.title) {
      data.slug = await this.createUniqueSlug(dto.title, id);
    }

    return this.prisma.product.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    await this.ensureExists(id);

    await this.prisma.product.delete({
      where: { id },
    });

    return { success: true };
  }

  private async ensureExists(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!product) {
      throw new NotFoundException("Product not found");
    }
  }

  private async createUniqueSlug(title: string, ignoreId?: string) {
    const baseSlug = slugify(title);
    let slug = baseSlug;
    let index = 2;

    while (
      await this.prisma.product.findFirst({
        where: {
          slug,
          id: ignoreId ? { not: ignoreId } : undefined,
        },
        select: { id: true },
      })
    ) {
      slug = `${baseSlug}-${index}`;
      index += 1;
    }

    return slug;
  }
}

function slugify(value: string) {
  return (
    value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "product"
  );
}
