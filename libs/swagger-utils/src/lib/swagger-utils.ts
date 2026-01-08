import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

export type SwaggerConfig = {
  app: INestApplication,
  prefix: string,
  title: string,
  description: string,
  version: string,
  tag: string,
};

export function initSwagger(swaggerConfig: SwaggerConfig): void {
  const config: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
    .setTitle(swaggerConfig.title)
    .setDescription(swaggerConfig.description)
    .setVersion(swaggerConfig.version)
    .addTag(swaggerConfig.tag)
    .build();

  const documentFactory: () => OpenAPIObject = (): OpenAPIObject => SwaggerModule.createDocument(swaggerConfig.app, config);

  return SwaggerModule.setup(swaggerConfig.prefix, swaggerConfig.app, documentFactory);
}
