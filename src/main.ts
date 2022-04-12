import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import swaggerBuilder from '@app/config/swagger-builder';
import cors from '@app/config/cors';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  swaggerBuilder(app, {
    title: '프젝모아 API 문서',
    description: '',
    version: '0.0.1',
  });

  cors(app);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
