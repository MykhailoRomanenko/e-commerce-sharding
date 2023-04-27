import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSupplierDto {
  @IsString()
  name: string;
}

export class SupplierFindAllParams {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  productId?: string;
}
