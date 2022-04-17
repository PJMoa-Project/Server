import {
  Module,
  ClassSerializerInterceptor,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';

import { JwtModule } from '@app/jwt';
import { User, Projects } from '@app/entity';

import { UserModule } from './user/user.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { ProjectsModule } from './projects/projects.module';

const ENV = process.env;
const entities = [User, Projects];

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`environment/.${ENV.NODE_ENV}.env`],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: ENV.DB_HOST,
      port: +ENV.DB_PORT,
      username: ENV.DB_USERNAME,
      password: ENV.DB_PASSWORD,
      database: ENV.DB_NAME,
      entities,
      synchronize: ENV.NODE_ENV !== 'prod',
      logging: true,
    }),
    JwtModule,
    AuthenticationModule,
    UserModule,
    ProjectsModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
