import { Module } from '@nestjs/common';

import { OauthController } from './oauth.controller';
import { KakaoStrategy } from './strategy';
import { OauthService } from './oauth.service';
import { OauthRepository } from './repository';

@Module({
  controllers: [OauthController],
  providers: [KakaoStrategy, OauthService, OauthRepository],
})
export class OauthModule {}
