import { ConfigService } from '@nestjs/config';

export interface AppConfig {
  rmqUrl: string[];
  port: string;
  exchange: string;
  redisUrl: string;
}

export type AppConfigService = ConfigService<AppConfig, true>;

export function loadConfig(): AppConfig {
  const port = process.env.APP_PORT || '3000';
  console.log('RMQ_URL=', process.env.RMQ_URL);
  return {
    rmqUrl: process.env.RMQ_URL?.split('|'),
    port,
    exchange: 'my-exchange',
    redisUrl: process.env.REDIS_URL,
  };
}
