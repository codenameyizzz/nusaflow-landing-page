import { IsBoolean, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class UpdateProductDto {
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  @IsOptional()
  title?: string;

  @IsString()
  @MinLength(2)
  @MaxLength(40)
  @IsOptional()
  category?: string;

  @IsString()
  @MinLength(12)
  @MaxLength(240)
  @IsOptional()
  description?: string;

  @IsString()
  @MinLength(2)
  @MaxLength(40)
  @IsOptional()
  priceLabel?: string;

  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;
}
