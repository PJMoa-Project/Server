import { applyDecorators, Controller, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { JwtAuth } from '@app/utils/guards';
import { ApiDoc } from '@app/config/decorators';

import { AddProjectApplicationDto } from './dto';

export const ParticipationController = () =>
  applyDecorators(
    Controller({ path: 'projects', version: '1' }),
    ApiTags('Projects Participation'),
  );

export const ApplyProjectsParticipation = () =>
  applyDecorators(
    Post('/application'),
    JwtAuth(),
    ApiDoc({
      summary: '프로젝트 참가 신청 API',
      createdRes: { description: '참가 신청 성공', schema: {} },
      bodyOptions: { type: AddProjectApplicationDto },
    }),
  );

export const ApproveApplications = () =>
  applyDecorators(
    Put('/:projectId/application/:applicationId/approval'),
    JwtAuth(),
    ApiDoc({
      summary: '프로젝트 신청 승인 API',
      okRes: {
        description: '프로젝트 신청 승인 성공',
        schema: {},
      },
    }),
  );

export const CancelApplications = () =>
  applyDecorators(
    Put('/application/:applicationId/cancel'),
    JwtAuth(),
    ApiDoc({
      summary: '프로젝트 신청 취소 API',
      okRes: {
        description: '프로젝트 신청 취소 성공',
        schema: {},
      },
    }),
  );
