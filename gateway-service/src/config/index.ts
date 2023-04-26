export interface AppConfig {
  rmqUrl: string;
  port: string;
}

export function loadConfig(): AppConfig {
  const port = process.env.APP_PORT;

  if (!port) {
    throw new Error('APP_PORT not provided!');
  }
  return {
    rmqUrl: process.env.RMQ_URL,
    port,
  };
}
