import { applyDecorators, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

export const ParticipationController = () =>
  applyDecorators(
    Controller({ path: 'projects', version: '1' }),
    ApiTags('Projects Participation'),
  );
