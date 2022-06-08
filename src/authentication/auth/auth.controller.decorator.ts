import { Controller, applyDecorators, Get, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { JwtAuth, LocalAuth } from '@app/utils/guards';

import {
  CreateUserRequestDto,
  CreateUserResponseDto,
  LoginUserRequestDto,
  LoginUserResponseDto,
} from './dto';

export const AuthController = () =>
  applyDecorators(Controller({ path: 'auth', version: '1' }), ApiTags('auth'));

export const CreateUser = () =>
  applyDecorators(
    Post('/register'),
    ApiOperation({ summary: '유저 회원가입 API' }),
    ApiCreatedResponse({
      description: '유저 생성 성공',
      type: CreateUserResponseDto,
    }),
    ApiBody({ type: CreateUserRequestDto }),
  );

export const Login = () =>
  applyDecorators(
    LocalAuth(),
    Post('/login'),
    ApiOperation({ summary: '유저 로그인 API' }),
    ApiCreatedResponse({
      description: '로그인 성공',
      type: LoginUserResponseDto,
    }),
    ApiBody({ type: LoginUserRequestDto }),
  );

export const GetProfile = () => applyDecorators(JwtAuth(), Get('/profile'));
