import { Controller, applyDecorators, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { JwtAuth, LocalAuth } from '@app/utils/guards';

export const AuthController = () =>
  applyDecorators(Controller({ path: 'auth', version: '1' }), ApiTags('auth'));

export const CreateUser = () => applyDecorators(Post('/register'));

export const Login = () => applyDecorators(LocalAuth(), Post('/login'));

export const GetProfile = () => applyDecorators(JwtAuth(), Get('/profile'));
