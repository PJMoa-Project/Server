import {
  applyDecorators,
  Controller,
  Delete,
  Get,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { JwtAuth } from '@app/utils/guards';
import { ApiDoc } from '@app/config/decorators';

import {
  CreateProjectsBodyRequestDto,
  CreateProjectsResponseDto,
  GetProjectsDetailResponseDto,
  GetProjectsResponseDto,
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
    ApiDoc({
      summary: '프로젝트 등록',
      createdRes: {
        description: '프로젝트 등록 성공',
        type: CreateProjectsResponseDto,
      },
      bodyOptions: { type: CreateProjectsBodyRequestDto },
    }),
  );

export const UpdateProject = () =>
  applyDecorators(
    Put('/:projectId'),
    JwtAuth(),
    ApiDoc({
      summary: '프로젝트 수정',
      okRes: {
        description: '프로젝트 수정 성공',
        schema: {},
      },
    }),
  );

export const GetProjectDetail = () =>
  applyDecorators(
    Get('/:projectId/detail'),
    JwtAuth(),
    ApiDoc({
      summary: '프로젝트 상세 조회',
      okRes: {
        description: '프로젝트 상세 조회 성공',
        type: GetProjectsDetailResponseDto,
      },
    }),
  );

export const GetProjects = () =>
  applyDecorators(
    Get(),
    ApiDoc({
      summary: '프로젝트 조회',
      okRes: {
        description: '프로젝트 조회 성공',
        type: GetProjectsResponseDto,
      },
    }),
  );

export const DeleteProjects = () =>
  applyDecorators(
    Delete('/:projectId'),
    JwtAuth(),
    ApiDoc({
      summary: '프로젝트 삭제',
      okRes: {
        schema: {},
      },
    }),
  );
