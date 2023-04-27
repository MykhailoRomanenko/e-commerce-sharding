import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  category_id: string;

  @IsString()
  @IsOptional()
  description: string;
}

export class ProductFindAllParams {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  categoryId?: string;
}
