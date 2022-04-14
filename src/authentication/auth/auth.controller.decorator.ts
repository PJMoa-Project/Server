import { Controller, applyDecorators, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { JwtAuth, LocalAuth } from '@app/utils/guards';
import { ApiDoc } from '@app/config/decorators';

import { CreateUserRequestDto, CreateUserResponseDto } from './dto';

export const AuthController = () =>
  applyDecorators(Controller({ path: 'auth', version: '1' }), ApiTags('auth'));

export const CreateUser = () =>
  applyDecorators(
    Post('/register'),
    ApiDoc({
      summary: '유저 회원가입',
      createdRes: {
        description: '유저 생성 성공',
        type: CreateUserResponseDto,
      },
      bodyOptions: { type: CreateUserRequestDto },
    }),
  );

export const Login = () => applyDecorators(LocalAuth(), Post('/login'));

export const GetProfile = () => applyDecorators(JwtAuth(), Get('/profile'));
