/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { INestApplication, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap(): Promise<void> {
  const port: string | 3000 = process.env.PORT || 3000 as const;
  const app: INestApplication = await NestFactory.create(AppModule);
  const globalPrefix: 'api' = 'api' as const;

  app.setGlobalPrefix(globalPrefix);

  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
};

bootstrap().catch(Logger.error);
