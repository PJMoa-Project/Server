import { applyDecorators, Controller, Get } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { KakaoAuth } from '@app/utils/guards';
import { CreateUserWithOauthResponseDto } from './dto';

export const OauthController = () =>
  applyDecorators(
    Controller({ path: 'oauth', version: '1' }),
    ApiTags('oauth'),
  );

export const KakaoLogin = () =>
  applyDecorators(
    Get('/kakao'),
    KakaoAuth(),
    ApiOperation({ summary: '카카오 로그인' }),
  );

export const KakaoCallback = () =>
  applyDecorators(
    Get('/kakao/callback'),
    KakaoAuth(),
    ApiOperation({ summary: '카카오 콜백' }),
    ApiCreatedResponse({ type: CreateUserWithOauthResponseDto }),
  );
