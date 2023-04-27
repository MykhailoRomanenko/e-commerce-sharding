import { Injectable, Logger } from '@nestjs/common';
import { CreateCategoryDto } from './dto/dto';
import { TransportService } from '../transport/transport.service';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  private readonly logger: Logger;
  constructor(private readonly transportService: TransportService) {
    this.logger = new Logger(CategoryService.name);
  }

  async create(createCategoryDto: CreateCategoryDto) {
    this.logger.log('Sending create-category');
    const res = await this.transportService.request<
      { success: boolean },
      CreateCategoryDto
    >('create-category', createCategoryDto);
    return res;
  }

  async findAll() {
    this.logger.log('Sending findall-category');
    const res = await this.transportService.request<Category[], object>(
      'findall-category',
      {},
    );
    return res;
  }
}
