import { Module } from '@nestjs/common';

import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { ProjectsRepository, ProjectsTechStacksRepository } from './repository';

@Module({
  controllers: [ProjectsController],
  providers: [
    ProjectsService,
    ProjectsRepository,
    ProjectsTechStacksRepository,
  ],
})
export class ProjectsModule {}
