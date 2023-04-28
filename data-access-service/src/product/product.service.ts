import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './entities/product.entity';
import { FilterQuery, Model, MongooseError } from 'mongoose';
import {
  CreateProductDto,
  ProductFindAllParams,
  UpdateSuppliersDto,
} from './dto/dto';
import { Nack } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  findAll(params: ProductFindAllParams) {
    const findParams: FilterQuery<Product> = {};
    if (params.category_id) {
      findParams.category_id = params.category_id;
    }
    return this.productModel.find(findParams).exec();
  }

  create(dto: CreateProductDto) {
    return this.productModel.insertMany([{ ...dto, suppliers: [] }]);
  }

  async update(dto: UpdateSuppliersDto) {
    console.log(dto);
    return await this.productModel.updateMany(
      { _id: dto._id },
      { $set: { suppliers: dto.suppliers || [] } },
    );
  }
}
