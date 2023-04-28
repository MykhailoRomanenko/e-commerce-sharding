import { Module } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { SupplierController } from './supplier.controller';
import { TransportModule } from '../transport/transport.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [TransportModule,  CacheModule.register()],
  controllers: [SupplierController],
  providers: [SupplierService],
})
export class SupplierModule {}
