import { Injectable, Logger } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { TransportService } from '../transport/transport.service';

@Injectable()
export class CategoryService {
  private readonly logger: Logger;
  constructor(private readonly transportService: TransportService) {
    this.logger = new Logger(CategoryService.name);
  }

  async create(createCategoryDto: CreateCategoryDto) {
    this.logger.log('Sending create-category');
    const res = await this.transportService.request<CreateCategoryDto, any>(
      'create-category',
      createCategoryDto,
    );
    this.logger.log(res);
    return 'This action adds a new category';
  }

  findAll() {
    return `This action returns all category`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
