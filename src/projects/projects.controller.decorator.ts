import {
  applyDecorators,
  Controller,
  Delete,
  Get,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { JwtAuth, Throttler } from '@app/utils/guards';

import {
  CreateProjectsBodyRequestDto,
  CreateProjectsResponseDto,
  GetProjectsDetailResponseDto,
  GetProjectsResponseDto,
  UpdateProjectsBodyRequestDto,
} from './dto';

export const ProjectsController = () =>
  applyDecorators(
    Controller({ path: 'projects', version: '1' }),
    ApiTags('projects'),
  );

export const CreateProject = () =>
  applyDecorators(
    Post(),
    JwtAuth(),
    ApiOperation({ summary: '프로젝트 등록' }),
    ApiCreatedResponse({
      description: '프로젝트 등록 성공',
      type: CreateProjectsResponseDto,
    }),
    ApiBody({ type: CreateProjectsBodyRequestDto }),
  );

export const UpdateProject = () =>
  applyDecorators(
    Put('/:projectId'),
    JwtAuth(),
    ApiOperation({ summary: '프로젝트 수정' }),
    ApiBody({ type: UpdateProjectsBodyRequestDto }),
    ApiCreatedResponse({ description: '프로젝트 수정 성공', schema: {} }),
  );

export const GetProjectDetail = () =>
  applyDecorators(
    Get('/:projectId/detail'),
    JwtAuth(),
    ApiOperation({ summary: '프로젝트 상세 조회' }),
    ApiOkResponse({
      description: '프로젝트 상세 조회 성공',
      type: GetProjectsDetailResponseDto,
    }),
  );

export const GetProjects = () =>
  applyDecorators(
    Get(),
    Throttler(),
    ApiOperation({ summary: '프로젝트 조회' }),
    ApiOkResponse({
      description: '프로젝트 조회 성공',
      type: GetProjectsResponseDto,
    }),
  );

export const DeleteProjects = () =>
  applyDecorators(
    Delete('/:projectId'),
    JwtAuth(),
    ApiOperation({ summary: '프로젝트 삭제' }),
    ApiOkResponse({ description: '프로젝트 삭제 성공,', schema: {} }),
  );
