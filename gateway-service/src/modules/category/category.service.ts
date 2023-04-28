import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateCategoryDto } from './dto/dto';
import { TransportService } from '../transport/transport.service';
import { Category } from './entities/category.entity';
import { Cache } from 'cache-manager';

@Injectable()
export class CategoryService {
  private readonly logger: Logger;

  constructor(
    @Inject('CACHE_MANAGER') private cacheService: Cache,
    private readonly transportService: TransportService,
  ) {
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

    const cacheKey = 'findall:category';
    const fromCache = await this.cacheService.get(cacheKey);
    if (fromCache) {
      this.logger.log(`Retrieved ${cacheKey} from cache`);
      return fromCache;
    } else {
      this.logger.log(`${cacheKey} not found in cache`);
    }

    const res = await this.transportService.request<Category[], object>(
      'findall-category',
      {},
    );

    this.cacheService
      .set(cacheKey, res, 60000)
      .catch((err) => this.logger.error(err));

    return res;
  }
}
