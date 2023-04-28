import { Controller, Logger } from '@nestjs/common';
import { ProductService } from './product.service';
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import {
  CreateProductDto,
  ProductFindAllParams,
  UpdateSuppliersDto,
} from './dto/dto';

@Controller()
export class ProductController {
  private readonly logger: Logger;
  constructor(private readonly productService: ProductService) {
    this.logger = new Logger(ProductController.name);
  }

  @RabbitRPC({
    exchange: 'my-exchange',
    routingKey: 'create-product',
    queue: 'create-product-queue',
  })
  async createProduct(msg: CreateProductDto) {
    this.logger.log('create-product');
    return this.productService.create(msg);
  }

  @RabbitRPC({
    exchange: 'my-exchange',
    routingKey: 'findall-product',
    queue: 'findall-product-queue',
  })
  async findAllProducts(msg: ProductFindAllParams) {
    this.logger.log('findall-product');
    return this.productService.findAll(msg);
  }

  @RabbitRPC({
    exchange: 'my-exchange',
    routingKey: 'update-product',
    queue: 'update-product-queue',
  })
  async updateProducts(msg: UpdateSuppliersDto) {
    return this.productService.update(msg);
  }
}
