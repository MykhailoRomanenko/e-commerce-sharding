import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfig, loadConfig } from './config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductModule } from './product/product.module';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [loadConfig],
    }),
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<AppConfig, true>) => {
        const rmqUrl = configService.get<string[]>('rmqUrl');
        const exch = configService.get<string>('exchange');

        console.log('Attempting to connect to RabbitMQ at', rmqUrl);
        return {
          exchanges: [
            {
              name: exch,
              type: 'direct',
            },
          ],
          uri: rmqUrl,
          enableControllerDiscovery: true,
          connectionInitOptions: { wait: false },
        };
      },
    }),
    ProductModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
