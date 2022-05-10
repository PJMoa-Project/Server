import { Module } from '@nestjs/common';

import { ProjectsMembersModule } from './members/projects-members.module';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { ProjectsRepository } from './repository';

@Module({
  imports: [ProjectsMembersModule],
  controllers: [ProjectsController],
  providers: [ProjectsService, ProjectsRepository],
  exports: [ProjectsService],
})
export class ProjectsModule {}
