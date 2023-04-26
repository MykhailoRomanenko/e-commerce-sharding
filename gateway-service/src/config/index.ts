export interface AppConfig {
  rmqUrl: string;
  port: string;
}

export function loadConfig(): AppConfig {
  const port = process.env.APP_PORT || '3000';

  return {
    rmqUrl: process.env.RMQ_URL,
    port,
  };
}
