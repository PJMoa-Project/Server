import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import swaggerBuilder from '@app/config/swagger-builder';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  swaggerBuilder(app, {
    title: '프젝모아 API 문서',
    description: '',
    version: '0.0.1',
  });

  // TODO: cors - local 서버가 아닌 실사용 서버 주소 추가
  app.enableCors({
    origin: [/^https?:\/\/((localhost)|(127\.0\.0\.1)):3\d{3}$/],
    methods: ['GET', 'PATCH', 'PUT', 'POST', 'DELETE'],
    allowedHeaders: [
      'Content-Type',
      'Origin',
      'Authorization',
      'X-Auth-Token',
      'X-Secret-Key',
    ],
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
