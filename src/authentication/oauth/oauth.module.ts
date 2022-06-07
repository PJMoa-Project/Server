import { Module } from '@nestjs/common';

import { OauthController } from './oauth.controller';
import { KakaoStrategy } from './strategy';
import { OauthService } from './oauth.service';
import { OauthRepository } from './repository';
import { TokenModule } from '../token/token.module';
import { UsersModule } from '../../users/users.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TokenModule, UsersModule, AuthModule],
  controllers: [OauthController],
  providers: [KakaoStrategy, OauthService, OauthRepository],
})
export class OauthModule {}
