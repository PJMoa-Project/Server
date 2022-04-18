import { applyDecorators, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { JwtAuth } from '@app/utils/guards';

export const ParticipationController = () =>
  applyDecorators(
    Controller({ path: 'projects', version: '1' }),
    ApiTags('Projects Participation'),
  );

export const ApplyProjectsParticipation = () =>
  applyDecorators(Post('/participation/application'), JwtAuth());
