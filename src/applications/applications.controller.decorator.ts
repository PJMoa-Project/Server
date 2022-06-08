import { applyDecorators, Controller, Get, Post, Put } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { JwtAuth } from '@app/utils/guards';

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
    ApiOperation({ summary: '프로젝트 참가 신청기록 조회 API' }),
    ApiOkResponse({
      description: '프로젝트 참가 신청기록 조회 성공',
      type: GetApplicationsResponseDto,
    }),
  );

export const ApplyProjectsParticipation = () =>
  applyDecorators(
    Post('/applications'),
    JwtAuth(),
    ApiOperation({ summary: '프로젝트 참가 신청 API' }),
    ApiCreatedResponse({ description: '참가 신청 성공', schema: {} }),
    ApiBody({ type: AddProjectApplicationDto }),
  );

export const ApproveApplications = () =>
  applyDecorators(
    Put('/:projectId/applications/:applicationId/approval'),
    JwtAuth(),
    ApiOperation({ summary: '프로젝트 신청 승인 API' }),
    ApiOkResponse({ description: '프로젝트 신청 승인 성공', schema: {} }),
  );

export const CancelApplications = () =>
  applyDecorators(
    Put('/applications/:applicationId/cancel'),
    JwtAuth(),
    ApiOperation({ summary: '프로젝트 신청 취소 API' }),
    ApiOkResponse({ description: '프로젝트 신청 취소 성공', schema: {} }),
  );

export const RejectApplications = () =>
  applyDecorators(
    Put('/:projectId/applications/:applicationId/reject'),
    JwtAuth(),
    ApiOperation({ summary: '프로젝트 신청 거절 API' }),
    ApiOkResponse({ description: '프로젝트 신청 거절 성공', schema: {} }),
  );

export const GetProjectApplications = () =>
  applyDecorators(
    Get('/:projectId/applications'),
    JwtAuth(),
    ApiOperation({ summary: '내 프로젝트 신청 내역 조회' }),
    ApiOkResponse({ type: GetProjectsApplicationsResponseDto, schema: {} }),
  );
