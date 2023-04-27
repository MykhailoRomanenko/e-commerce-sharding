import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '../../config';

@Injectable()
export class TransportService {
  private readonly exchange: string;

  constructor(
    private readonly amqp: AmqpConnection,
    configService: ConfigService<AppConfig, true>,
  ) {
    this.exchange = configService.get<string>('exchange');
  }

  //   async publish() {}

  async request<R, P = Record<string, never>>(key: string, payload: P) {
    return await this.amqp.request<R>({
      exchange: this.exchange,
      routingKey: key,
      payload,
    });
  }
}
