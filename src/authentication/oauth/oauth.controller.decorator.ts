import { applyDecorators, Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { KakaoAuth } from '@app/utils/guards';
import { ApiDoc } from '@app/config/decorators';

export const OauthController = () =>
  applyDecorators(
    Controller({ path: 'oauth', version: '1' }),
    ApiTags('oauth'),
  );

export const KakaoLogin = () =>
  applyDecorators(
    Get('/kakao'),
    KakaoAuth(),
    ApiDoc({
      summary: '카카오 로그인',
    }),
  );

export const KakaoCallback = () =>
  applyDecorators(
    Get('/kakao/callback'),
    KakaoAuth(),
    ApiDoc({
      summary: '카카오 콜백',
    }),
  );
