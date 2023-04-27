import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { ConfigModule } from '@nestjs/config';
import { TransportModule } from '../transport/transport.module';

@Module({
  imports: [ConfigModule, TransportModule],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
