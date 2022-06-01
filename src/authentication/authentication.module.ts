import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { TokenModule } from './token/token.module';
import { OauthModule } from './oauth/oauth.module';

@Module({
  imports: [AuthModule, TokenModule, OauthModule],
})
export class AuthenticationModule {}
