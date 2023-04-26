import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './modules/product/product.module';
import { CategoryModule } from './modules/category/category.module';
import { SupplierModule } from './modules/supplier/supplier.module';

@Module({
  imports: [ProductModule, CategoryModule, SupplierModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
