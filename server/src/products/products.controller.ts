import { Controller, Get, Param } from "@nestjs/common";
import { ProductsService } from "./products.service";

@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findPublished() {
    return this.productsService.findPublished();
  }

  @Get(":slug")
  findBySlug(@Param("slug") slug: string) {
    return this.productsService.findPublishedBySlug(slug);
  }
}
