import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  CreateProductDto,
  ProductFindAllParams,
  UpdateSuppliersDto,
} from './dto/dto';
import { TransportService } from '../transport/transport.service';
import { Product } from './entities/product.entity';
import { Cache } from 'cache-manager';

@Injectable()
export class ProductService {
  private readonly logger: Logger;
  constructor(
    @Inject('CACHE_MANAGER') private cacheService: Cache,
    private readonly transportService: TransportService,
  ) {
    this.logger = new Logger(ProductService.name);
  }

  async create(createProductDto: CreateProductDto) {
    this.logger.log('Sending create-product');
    const res = await this.transportService.request<
      { success: boolean },
      CreateProductDto
    >('create-product', createProductDto);
    return res;
  }

  async findAll(params: ProductFindAllParams) {
    this.logger.log('Sending findall-product');
    const cacheKey = `products${
      params.category_id ? `:${params.category_id}` : ''
    }`;
    const fromCache = await this.cacheService.get(cacheKey);

    if (fromCache) {
      this.logger.log(`Retrieved ${cacheKey} from cache`);
      return fromCache;
    } else {
      this.logger.log(`${cacheKey} not found in cache`);
    }

    const res = await this.transportService.request<
      Product[],
      ProductFindAllParams
    >('findall-product', params);

    this.cacheService
      .set(cacheKey, res, 5000)
      .catch((err) => this.logger.error(err));

    return res;
  }

  async update(dto: UpdateSuppliersDto & { _id: string }) {
    console.log(dto);
    const res = await this.transportService.request<
      { success: boolean },
      UpdateSuppliersDto
    >('update-product', dto);
    return res;
  }
}
