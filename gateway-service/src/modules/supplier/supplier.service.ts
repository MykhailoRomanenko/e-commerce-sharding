import { CreateSupplierDto, SupplierFindAllParams } from './dto/dto';
import { TransportService } from '../transport/transport.service';
import { Supplier } from './entities/supplier.entity';
import { Injectable, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class SupplierService {
  private readonly logger: Logger;

  constructor(
    @Inject('CACHE_MANAGER') private cacheService: Cache,
    private readonly transportService: TransportService
    ) {
    this.logger = new Logger(TransportService.name);
  }

  async create(createProductDto: CreateSupplierDto) {
    this.logger.log('Sending create-supplier');
    const res = await this.transportService.request<
      { success: boolean },
      CreateSupplierDto
    >('create-supplier', createProductDto);
    return res;
  }

  async findAll(params: SupplierFindAllParams) {
    this.logger.log('Sending findall-supplier');
    const cacheKey = `suppliers${params.productId ? `:${params.productId}` : ''}`;
    const fromCache = await this.cacheService.get(cacheKey);
    
    if (fromCache) {
      this.logger.log(`Retrieved ${cacheKey} from cache`);
      return fromCache;
    } else {
      this.logger.log(`${cacheKey} not found in cache`);
    }
    const res = await this.transportService.request<
      Supplier[],
      SupplierFindAllParams
    >('findall-supplier', params);

    this.cacheService
    .set(cacheKey, res, 60000)
    .catch((err) => this.logger.error(err));
    
    return res;
  }
}
