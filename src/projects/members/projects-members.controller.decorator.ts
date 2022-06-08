import { applyDecorators, Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { JwtAuth } from '@app/utils/guards';

import { GetProjectsMembersResponseDto } from './dto';

export const ProjectsMembersController = () =>
  applyDecorators(
    Controller({ path: 'projects', version: '1' }),
    ApiTags('projects-members'),
  );

export const GetProjectMembers = () =>
  applyDecorators(
    Get('/:projectId/members'),
    JwtAuth(),
    ApiOperation({ summary: '프로젝트 멤버 조회 API' }),
    ApiOkResponse({ type: GetProjectsMembersResponseDto }),
  );
