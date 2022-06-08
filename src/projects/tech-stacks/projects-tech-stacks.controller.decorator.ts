import { applyDecorators, Controller, Delete, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { JwtAuth } from '@app/utils/guards';

import { CreateTechStacksRequestDto } from './dto';

export const ProjectsTechStacksController = () =>
  applyDecorators(
    Controller({ path: 'projects', version: '1' }),
    ApiTags('projects-techStacks'),
  );

export const DeleteTechStack = () =>
  applyDecorators(
    Delete('/tech-stacks/:techStackId'),
    JwtAuth(),
    ApiOperation({ summary: '프로젝트 기술스택 삭제' }),
    ApiOkResponse({
      description: '프로젝트 기술스택 삭제 성공',
      schema: {},
    }),
  );

export const AddTechStack = () =>
  applyDecorators(
    Post('/tech-stacks'),
    JwtAuth(),
    ApiOperation({ summary: '프로젝트 기술스택 추가' }),
    ApiBody({ type: CreateTechStacksRequestDto }),
    ApiCreatedResponse({
      schema: {},
    }),
  );
