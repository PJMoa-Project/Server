import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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

  await app.listen(3000);
}
bootstrap();
