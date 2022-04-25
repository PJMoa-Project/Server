import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

interface ISwaggerBuilderConfig {
  title: string;
  description: string;
  version: string;
}

export default (
  app: INestApplication,
  { title, description, version }: ISwaggerBuilderConfig,
): void => {
  const ENV = process.env.NODE_ENV;

  if (ENV !== 'prod') {
    const document = SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle(title)
        .setDescription(description)
        .setVersion(version)
        .addBearerAuth()
        .build(),
    );
    SwaggerModule.setup('api', app, document);
  }
};
