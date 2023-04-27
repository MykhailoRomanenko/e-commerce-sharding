import { Controller } from '@nestjs/common';
import { ProductService } from './product.service';
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { CreateProductDto, ProductFindAllParams } from './dto/dto';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @RabbitRPC({
    exchange: 'my-exchange',
    routingKey: 'create-product',
    queue: 'data-access-queue',
  })
  async createProduct(msg: CreateProductDto) {
    return { success: true };
  }

  @RabbitRPC({
    exchange: 'my-exchange',
    routingKey: 'findall-product',
    queue: 'data-access-queue',
  })
  async findAllProducts(msg: ProductFindAllParams) {
    return []; // TODO mongo
  }
}
