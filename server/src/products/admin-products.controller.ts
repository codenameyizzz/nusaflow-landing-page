import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { UserRole } from "@prisma/client";
import { Roles } from "../auth/decorators/roles.decorator";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { CreateProductDto } from "./dto/create-product.dto";
import { CreateProductFormDto } from "./dto/create-product-form.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { productImageUploadOptions } from "./product-upload";
import { ProductsService } from "./products.service";

@Controller("admin/products")
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class AdminProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll() {
    return this.productsService.findAllForAdmin();
  }

  @Post()
  @UseInterceptors(FilesInterceptor("images", 6, productImageUploadOptions))
  create(@Body() dto: CreateProductFormDto, @UploadedFiles() files: Express.Multer.File[] = []) {
    return this.productsService.create(toCreateProductDto(dto), files);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdateProductDto) {
    return this.productsService.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.productsService.remove(id);
  }

  @Post(":id/images")
  @UseInterceptors(FilesInterceptor("images", 6, productImageUploadOptions))
  addImages(@Param("id") id: string, @UploadedFiles() files: Express.Multer.File[] = []) {
    return this.productsService.addImages(id, files);
  }

  @Delete(":productId/images/:imageId")
  removeImage(@Param("productId") productId: string, @Param("imageId") imageId: string) {
    return this.productsService.removeImage(productId, imageId);
  }
}

function toCreateProductDto(dto: CreateProductFormDto): CreateProductDto {
  return {
    title: dto.title,
    category: dto.category,
    description: dto.description,
    priceLabel: dto.priceLabel,
    isPublished: dto.isPublished === "true",
  };
}
