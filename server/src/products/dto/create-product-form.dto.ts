import { IsIn, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateProductFormDto {
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  title!: string;

  @IsString()
  @MinLength(2)
  @MaxLength(40)
  category!: string;

  @IsString()
  @MinLength(12)
  @MaxLength(240)
  description!: string;

  @IsString()
  @MinLength(2)
  @MaxLength(40)
  priceLabel!: string;

  @IsIn(["true", "false"])
  @IsOptional()
  isPublished?: string;
}
