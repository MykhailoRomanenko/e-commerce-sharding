import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfig } from '../../config';
import { TransportService } from './transport.service';

@Module({
  imports: [
    ConfigModule,
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<AppConfig, true>) => {
        const rmqUrl = configService.get<string>('rmqUrl');
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
          connectionInitOptions: { wait: false },
        };
      },
    }),
  ],
  providers: [TransportService],
  exports: [TransportService],
})
export class TransportModule {}
