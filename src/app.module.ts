import {
  Module,
  ClassSerializerInterceptor,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';

import { JwtModule } from '@app/jwt';
import {
  Users,
  Projects,
  ProjectsTechStacks,
  ProjectsMembers,
  ProjectsApplication,
  ProjectsLike,
} from '@app/entity';
import { AllExceptionsFilter } from '@app/utils/filters';

import { UsersModule } from './users/users.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { ProjectsModule } from './projects/projects.module';
import { ApplicationsModule } from './applications/applications.module';
import { ProjectsTechStacksModule } from './tech-stacks/projects-tech-stacks.module';

const ENV = process.env;
const entities = [
  Users,
  Projects,
  ProjectsTechStacks,
  ProjectsMembers,
  ProjectsApplication,
  ProjectsLike,
];

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
      timezone: '+09:00',
    }),
    ThrottlerModule.forRoot({
      ttl: 5,
      limit: 5,
    }),
    JwtModule,
    AuthenticationModule,
    UsersModule,
    ProjectsModule,
    ProjectsTechStacksModule,
    ApplicationsModule,
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
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
