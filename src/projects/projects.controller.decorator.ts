import { applyDecorators, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { JwtAuth } from '@app/utils/guards';

export const ProjectsController = () =>
  applyDecorators(
    Controller({ path: 'projects', version: '1' }),
    ApiTags('projects'),
  );

export const CreateProject = () => applyDecorators(Post(), JwtAuth());
