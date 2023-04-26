import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const configService: ConfigService<AppConfig, true> = app.get(ConfigService);
  const port = configService.get<string>('port');

  await app.listen(port);
  const logger = new Logger();
  logger.log(`Listening on port ${port}`);
}
bootstrap();
