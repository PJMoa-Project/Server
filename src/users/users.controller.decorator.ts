import {
  applyDecorators,
  Controller,
  Get,
  Patch,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiTags,
  ApiConsumes,
  ApiOperation,
  ApiOkResponse,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { JwtAuth, Throttler } from '@app/utils/guards';
import { multerOptions } from '@app/config/multer';

import { GetUserIntroduceResponseDto, GetUserProjectsResponseDto } from './dto';

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
    ApiOperation({ summary: '유저 프로필 설정 API' }),
    ApiOkResponse({ schema: {} }),
  );

export const GetUserProjects = () =>
  applyDecorators(
    Get('/projects'),
    JwtAuth(),
    ApiOperation({ summary: '내 프로젝트 조회 API' }),
    ApiOkResponse({ type: GetUserProjectsResponseDto }),
  );

export const GetUserIntroduce = () =>
  applyDecorators(
    Get('/:userId/introduce'),
    Throttler(),
    ApiOperation({ summary: '유저 소개 조회 API' }),
    ApiOkResponse({ type: GetUserIntroduceResponseDto }),
  );
