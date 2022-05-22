import { applyDecorators, Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ApiDoc } from '@app/config/decorators';
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
    ApiDoc({
      summary: '프로젝트 멤버 조회 API',
      okRes: {
        type: GetProjectsMembersResponseDto,
      },
    }),
  );
