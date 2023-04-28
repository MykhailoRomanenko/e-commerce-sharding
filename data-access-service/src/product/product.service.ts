import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './entities/product.entity';
import { FilterQuery, Model } from 'mongoose';
import { CreateProductDto, ProductFindAllParams } from './dto/dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  findAll(params: ProductFindAllParams) {
    console.log('Parans', params);
    const findParams: FilterQuery<Product> = {};
    if (params.category_id) {
      findParams.category_id = params.category_id;
    }
    return this.productModel.find(findParams).exec();
  }

  create(dto: CreateProductDto) {
    return this.productModel.insertMany([dto]);
  }
}
