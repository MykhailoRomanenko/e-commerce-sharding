export class CreateProductDto {
  name: string;

  category_id: string;

  description: string;
}

export class ProductFindAllParams {
  categoryId?: string;
}
