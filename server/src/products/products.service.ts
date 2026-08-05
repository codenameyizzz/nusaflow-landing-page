import { Injectable, NotFoundException } from "@nestjs/common";
import type { Prisma } from "@prisma/client";
import { unlink } from "node:fs/promises";
import { join } from "node:path";
import { PrismaService } from "../prisma/prisma.service";
import type { CreateProductDto } from "./dto/create-product.dto";
import type { UpdateProductDto } from "./dto/update-product.dto";
import { productUploadDir } from "./product-upload";

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  findPublished() {
    return this.prisma.product.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: "desc" },
      include: { images: { orderBy: { createdAt: "asc" } } },
    });
  }

  findAllForAdmin() {
    return this.prisma.product.findMany({
      orderBy: { updatedAt: "desc" },
      include: { images: { orderBy: { createdAt: "asc" } } },
    });
  }

  async create(dto: CreateProductDto, files: Express.Multer.File[] = []) {
    const slug = await this.createUniqueSlug(dto.title);

    return this.prisma.product.create({
      data: {
        ...dto,
        slug,
        isPublished: dto.isPublished ?? false,
        images: {
          create: files.map(toProductImageInput),
        },
      },
      include: { images: { orderBy: { createdAt: "asc" } } },
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
      include: { images: { orderBy: { createdAt: "asc" } } },
    });
  }

  async remove(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { images: true },
    });

    if (!product) {
      throw new NotFoundException("Product not found");
    }

    await this.prisma.product.delete({ where: { id } });
    await Promise.all(product.images.map((image) => removeStoredFile(image.filename)));

    return { success: true };
  }

  async addImages(productId: string, files: Express.Multer.File[]) {
    await this.ensureExists(productId);

    if (!files.length) {
      return this.prisma.product.findUniqueOrThrow({
        where: { id: productId },
        include: { images: { orderBy: { createdAt: "asc" } } },
      });
    }

    await this.prisma.productImage.createMany({
      data: files.map((file) => ({
        ...toProductImageInput(file),
        productId,
      })),
    });

    return this.prisma.product.findUniqueOrThrow({
      where: { id: productId },
      include: { images: { orderBy: { createdAt: "asc" } } },
    });
  }

  async removeImage(productId: string, imageId: string) {
    const image = await this.prisma.productImage.findFirst({
      where: { id: imageId, productId },
    });

    if (!image) {
      throw new NotFoundException("Product image not found");
    }

    await this.prisma.productImage.delete({
      where: { id: image.id },
    });
    await removeStoredFile(image.filename);

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

function toProductImageInput(file: Express.Multer.File) {
  return {
    filename: file.filename,
    url: `/uploads/products/${file.filename}`,
  };
}

async function removeStoredFile(filename: string) {
  try {
    await unlink(join(productUploadDir, filename));
  } catch {
    // The database row is the source of truth; missing files should not block CMS actions.
  }
}
