import {
  applyDecorators,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { JwtAuth } from '@app/utils/guards';
import { multerOptions } from '@app/config/multer';

export const UsersController = () =>
  applyDecorators(
    Controller({ path: 'users', version: '1' }),
    ApiTags('users'),
  );

export const CreateUserProfile = () =>
  applyDecorators(
    Post('/profile'),
    JwtAuth(),
    UseInterceptors(FileInterceptor('imageFile', multerOptions)),
  );
