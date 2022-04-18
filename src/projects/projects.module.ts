import { Module } from '@nestjs/common';

import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { ProjectsRepository, ProjectsTechStacksRepository } from './repository';
import { ProjectsMembersModule } from './members/projects-members.module';

@Module({
  imports: [ProjectsMembersModule],
  controllers: [ProjectsController],
  providers: [
    ProjectsService,
    ProjectsRepository,
    ProjectsTechStacksRepository,
  ],
  exports: [ProjectsService],
})
export class ProjectsModule {}
