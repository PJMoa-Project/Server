import { NestFactory } from '@nestjs/core';

import swaggerBuilder from '@app/config/swagger-builder';
import cors from '@app/config/cors';

import { AppModule } from './app.module';

async function bootstrap() {
  console.log(`Running in :${process.env.NODE_ENV}`);
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'],
  });

  cors(app);

  app.enableCors({
    origin: [/^https?:\/\/((localhost)|(127\.0\.0\.1)):3\d{3}$/],
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
  });

  app.enableVersioning();

  swaggerBuilder(app, {
    title: '프젝모아 API 문서',
    description: '',
    version: '0.0.1',
  });

  await app.listen(3000);
}
bootstrap();
