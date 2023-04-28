import { ConfigService } from '@nestjs/config';

export interface AppConfig {
  rmqUrl: string[];
  port: string;
  exchange: string;
  mongoUrl: string;
}

export type AppConfigService = ConfigService<AppConfig, true>;

export function loadConfig(): AppConfig {
  const port = process.env.APP_PORT || '3000';

  return {
    rmqUrl: process.env.RMQ_URL?.split('|'),
    port,
    exchange: 'my-exchange',
    mongoUrl: process.env.MONGO_URL,
  };
}
