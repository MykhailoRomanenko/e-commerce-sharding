import { Controller } from '@nestjs/common';
import { CategoryService } from './category.service';
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';

@Controller()
export class CategoryController {
  private readonly category;
  constructor(private readonly categoryService: CategoryService) {}

  @RabbitRPC({
    exchange: 'my-exchange',
    routingKey: 'create-category',
    queue: 'data-access-queue',
  })
  async createCategory(msg: any) {
    console.log('Received msg:', msg);
    return { success: true };
  }
}
