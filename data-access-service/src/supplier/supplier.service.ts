import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Supplier } from './entities/supplier.entity';
import { Model } from 'mongoose';
import { CreateSupplierDto } from './dto';

@Injectable()
export class SupplierService {
  constructor(
    @InjectModel(Supplier.name) private readonly supplierModel: Model<Supplier>,
  ) {}

  create(dto: CreateSupplierDto) {
    return this.supplierModel.insertMany([dto]);
  }

  findAll() {
    return this.supplierModel.find().exec();
  }
}
