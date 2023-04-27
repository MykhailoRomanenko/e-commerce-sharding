import { Injectable, Logger } from '@nestjs/common';
import { CreateProductDto, ProductFindAllParams } from './dto/dto';
import { TransportService } from '../transport/transport.service';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  private readonly logger: Logger;
  constructor(private readonly transportService: TransportService) {
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
    const res = await this.transportService.request<
      Product[],
      ProductFindAllParams
    >('findall-product', params);
    return res;
  }
}
