import { Controller } from '@nestjs/common';
import { ProductService } from './product.service';
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {
    
  }

  

}
