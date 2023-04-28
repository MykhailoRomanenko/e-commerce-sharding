export class CreateProductDto {
  name: string;

  category_id: string;

  description: string;
}

export class ProductFindAllParams {
  category_id?: string;
}
