/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { ConsoleLogger, INestApplication, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { initSwagger } from '@jobber-workspace/swagger-utils';

import { AppModule } from './app/app.module';

(async (): Promise<void> => {
  const globalPrefix: string = 'api';
  const swaggerPrefix: string = 'swagger';
  const port: string | 3000 = process.env.PORT || 3000;
  const app: INestApplication<AppModule> = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      colors: true,
      showHidden: true
    }),
  });

  app.setGlobalPrefix(globalPrefix);

  initSwagger({
    app,
    prefix: swaggerPrefix,
    title: 'Jobber Auth OPEN API',
    description: 'The Jobber Auth API description',
    version: '1.0.0',
    tag: 'auth'
  });

  await app.listen(port).finally((): void => {
    Logger.log(`🚀 Application on: http://localhost:${port}/${globalPrefix}`);
    Logger.log(`⚠ Swagger on: http://localhost:${port}/${swaggerPrefix}`);
  });

})().catch(Logger.error);
