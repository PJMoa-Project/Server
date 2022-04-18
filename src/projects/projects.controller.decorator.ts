import { applyDecorators, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { JwtAuth } from '@app/utils/guards';
import { ApiDoc } from '@app/config/decorators';

import { CreateProjectsBodyRequestDto, CreateProjectsResponseDto } from './dto';

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
