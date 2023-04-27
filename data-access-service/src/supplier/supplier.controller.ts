import { Controller } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { CreateSupplierDto, SupplierFindAllParams } from './dto';

@Controller()
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @RabbitRPC({
    exchange: 'my-exchange',
    routingKey: 'create-supplier',
    queue: 'data-access-queue',
  })
  async createSupplier(msg: CreateSupplierDto) {
    return { success: true };
  }

  @RabbitRPC({
    exchange: 'my-exchange',
    routingKey: 'findall-supplier',
    queue: 'data-access-queue',
  })
  async findAllSuppliers(msg: SupplierFindAllParams) {
    return []; // TODO mongo
  }
}
