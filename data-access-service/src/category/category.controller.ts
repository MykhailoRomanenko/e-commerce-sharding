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
    queue: 'create-category-queue',
  })
  async createCategory(msg: CreateCategoryDto) {
    this.logger.log('create-category');
    return this.categoryService.create(msg);
  }

  @RabbitRPC({
    exchange: 'my-exchange',
    routingKey: 'findall-category',
    queue: 'findall-category-queue',
  })
  async findAllCategories() {
    this.logger.log('findall-category');
    return this.categoryService.findAll();
  }
}
