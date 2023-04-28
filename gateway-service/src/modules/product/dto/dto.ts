import { IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  @Matches(objectIdRegex)
  category_id: string;

  @IsString()
  @IsOptional()
  description: string;
}

export class ProductFindAllParams {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @Matches(objectIdRegex)
  category_id?: string;
}
