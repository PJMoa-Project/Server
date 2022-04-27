import { applyDecorators, Controller, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ApiDoc } from '@app/config/decorators';
import { JwtAuth } from '@app/utils/guards';

export const ProjectsTechStacksController = () =>
  applyDecorators(
    Controller({ path: 'projects', version: '1' }),
    ApiTags('projects'),
  );

export const DeleteTechStack = () =>
  applyDecorators(
    Delete('/tech-stacks/:techStackId'),
    JwtAuth(),
    ApiDoc({
      summary: '프로젝트 기술스택 삭제',
      okRes: {
        description: '프로젝트 기술스택 삭제 성공',
        schema: {},
      },
    }),
  );
