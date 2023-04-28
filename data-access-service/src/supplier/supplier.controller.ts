import { Controller, Logger } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { CreateSupplierDto, SupplierFindAllParams } from './dto';

@Controller()
export class SupplierController {
  private readonly logger: Logger;
  constructor(private readonly supplierService: SupplierService) {
    this.logger = new Logger(SupplierController.name);
  }

  @RabbitRPC({
    exchange: 'my-exchange',
    routingKey: 'create-supplier',
    queue: 'create-supplier-queue',
  })
  async createSupplier(msg: CreateSupplierDto) {
    this.logger.log('create-supplier');
    return this.supplierService.create(msg);
  }

  @RabbitRPC({
    exchange: 'my-exchange',
    routingKey: 'findall-supplier',
    queue: 'findall-supplier-queue',
  })
  async findAllSuppliers() {
    this.logger.log('findall-supplier');
    return this.supplierService.findAll();
  }
}
