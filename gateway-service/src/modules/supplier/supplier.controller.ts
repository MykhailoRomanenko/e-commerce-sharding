import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { CreateSupplierDto, SupplierFindAllParams } from './dto/dto';

@Controller('supplier')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Post()
  create(@Body() createSupplierDto: CreateSupplierDto) {
    return this.supplierService.create(createSupplierDto);
  }

  @Get()
  findAll(@Query() params: SupplierFindAllParams) {
    return this.supplierService.findAll(params);
  }
}
