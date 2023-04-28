import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TransportModule } from '../transport/transport.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [TransportModule, CacheModule.register()],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
