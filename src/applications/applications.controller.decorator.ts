import { applyDecorators, Controller, Get, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { JwtAuth } from '@app/utils/guards';
import { ApiDoc } from '@app/config/decorators';

import {
  AddProjectApplicationDto,
  GetApplicationsResponseDto,
  GetProjectsApplicationsResponseDto,
} from './dto';

export const ParticipationController = () =>
  applyDecorators(
    Controller({ path: 'projects', version: '1' }),
    ApiTags('Projects Participation'),
  );

export const GetApplications = () =>
  applyDecorators(
    Get('/applications'),
    JwtAuth(),
    ApiDoc({
      summary: '프로젝트 참가 신청기록 조회 API',
      okRes: {
        description: '프로젝트 참가 신청기록 조회 성공',
        type: GetApplicationsResponseDto,
      },
    }),
  );

export const ApplyProjectsParticipation = () =>
  applyDecorators(
    Post('/applications'),
    JwtAuth(),
    ApiDoc({
      summary: '프로젝트 참가 신청 API',
      createdRes: { description: '참가 신청 성공', schema: {} },
      bodyOptions: { type: AddProjectApplicationDto },
    }),
  );

export const ApproveApplications = () =>
  applyDecorators(
    Put('/:projectId/applications/:applicationId/approval'),
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
    Put('/applications/:applicationId/cancel'),
    JwtAuth(),
    ApiDoc({
      summary: '프로젝트 신청 취소 API',
      okRes: {
        description: '프로젝트 신청 취소 성공',
        schema: {},
      },
    }),
  );

export const RejectApplications = () =>
  applyDecorators(
    Put('/:projectId/applications/:applicationId/reject'),
    JwtAuth(),
    ApiDoc({
      summary: '프로젝트 신청 거절 API',
      okRes: {
        description: '프로젝트 신청 거절 성공',
        schema: {},
      },
    }),
  );

export const GetProjectApplications = () =>
  applyDecorators(
    Get('/:projectId/applications'),
    JwtAuth(),
    ApiDoc({
      summary: '내 프로젝트 신청 내역 조회',
      okRes: {
        type: GetProjectsApplicationsResponseDto,
      },
    }),
  );
