import { applyDecorators, Controller, Post } from '@nestjs/common';
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
