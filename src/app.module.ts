import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtModule } from '@app/jwt';

import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { AuthenticationModule } from './authentication/authentication.module';
import { TokenModule } from './authentication/token/token.module';

const ENV = process.env;
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
      entities: [User],
      synchronize: ENV.NODE_ENV !== 'prod',
      logging: true,
    }),
    JwtModule,
    AuthenticationModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
