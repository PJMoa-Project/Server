import {
  applyDecorators,
  Controller,
  Get,
  Patch,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { JwtAuth } from '@app/utils/guards';
import { multerOptions } from '@app/config/multer';
import { ApiDoc } from '@app/config/decorators';

import { GetUserProjectsResponseDto } from './dto';

export const UsersController = () =>
  applyDecorators(
    Controller({ path: 'users', version: '1' }),
    ApiTags('users'),
  );

export const SetUserProfile = () =>
  applyDecorators(
    Patch('/profile'),
    JwtAuth(),
    UseInterceptors(FileInterceptor('imageFile', multerOptions)),
    ApiConsumes('multipart/form-data'),
    ApiDoc({
      summary: '유저 프로필 설정 API',
      okRes: {
        schema: {},
      },
    }),
  );

export const GetUserProjects = () =>
  applyDecorators(
    Get('/projects'),
    JwtAuth(),
    ApiDoc({
      summary: '내 프로젝트 조회 API',
      okRes: {
        type: GetUserProjectsResponseDto,
      },
    }),
  );
