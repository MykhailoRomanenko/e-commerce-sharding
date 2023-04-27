import { Controller, Logger } from '@nestjs/common';
import { CategoryService } from './category.service';
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { CreateCategoryDto } from './dto/dto';

@Controller()
export class CategoryController {
  private readonly logger: Logger;
  constructor(private readonly categoryService: CategoryService) {
    this.logger = new Logger(CategoryController.name);
  }

  @RabbitRPC({
    exchange: 'my-exchange',
    routingKey: 'create-category',
    queue: 'data-access-queue',
  })
  async createCategory(msg: CreateCategoryDto) {
    return { success: true };
  }

  @RabbitRPC({
    exchange: 'my-exchange',
    routingKey: 'findall-category',
    queue: 'data-access-queue',
  })
  async findAllCategories() {
    return []; // TODO mongo
  }
}
