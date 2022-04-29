import {
  applyDecorators,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { JwtAuth } from '@app/utils/guards';

export const UsersController = () =>
  applyDecorators(
    Controller({ path: 'users', version: '1' }),
    ApiTags('users'),
  );

export const CreateUserProfile = () =>
  applyDecorators(
    Post('/profile'),
    JwtAuth(),
    UseInterceptors(FileInterceptor('file')),
  );
