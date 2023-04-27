import { CreateSupplierDto, SupplierFindAllParams } from './dto/dto';
import { TransportService } from '../transport/transport.service';
import { Supplier } from './entities/supplier.entity';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class SupplierService {
  private readonly logger: Logger;

  constructor(private readonly transportService: TransportService) {
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
    const res = await this.transportService.request<
      Supplier[],
      SupplierFindAllParams
    >('findall-supplier', params);
    return res;
  }
}
