import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './modules/product/product.module';
import { CategoryModule } from './modules/category/category.module';
import { SupplierModule } from './modules/supplier/supplier.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfig, loadConfig } from './config';
import { TransportModule } from './modules/transport/transport.module';
import { CacheModule } from '@nestjs/cache-manager';
import { create } from 'cache-manager-redis-store';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [loadConfig],
    }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService<AppConfig, true>) => {
        const redisUrl = configService.get<string>('redisUrl');

        return {
          isGlobal: true,
          store: create({
            url: redisUrl,
          }),

          no_ready_check: true,
        };
      },
    }),
    ProductModule,
    CategoryModule,
    SupplierModule,
    TransportModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
