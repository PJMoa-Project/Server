import { Controller, applyDecorators } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

export const AuthController = () =>
  applyDecorators(Controller({ path: 'auth', version: '1' }), ApiTags('auth'));
