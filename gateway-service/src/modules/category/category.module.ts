import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { ConfigModule } from '@nestjs/config';
import { TransportModule } from '../transport/transport.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [ConfigModule, TransportModule, CacheModule.register()],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
