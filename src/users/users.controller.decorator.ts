import { applyDecorators, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

export const UsersController = () =>
  applyDecorators(
    Controller({ path: 'users', version: '1' }),
    ApiTags('users'),
  );
