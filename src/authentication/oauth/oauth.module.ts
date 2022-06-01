import { Module } from '@nestjs/common';

import { OauthController } from './oauth.controller';
import { KakaoStrategy } from './strategy';

@Module({
  controllers: [OauthController],
  providers: [KakaoStrategy],
})
export class OauthModule {}
